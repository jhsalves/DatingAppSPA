import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
    currentUser: User;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();
    private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    changeMemberPhoto(photoUrl: string) {
        let photo = photoUrl;
        if ( photo == null) {
            photo = photoUrl;
        }
       this.photoUrl.next(photoUrl);
    }

    constructor(private http: Http) { }

    login(user: User) {

        return this.http.post(this.baseUrl + 'login', user, this.getHttpOptions()).map((response: Response) => {
            const loggedUser = response.json();
            if (loggedUser) {
                this.setToken(loggedUser.tokenString, loggedUser.user);
                this.changeMemberPhoto(this.currentUser.photoUrl);
            }
        }).catch(this.handleError);
    }

    register(user: User) {
        return this.http.post(this.baseUrl + 'register', user, this.getHttpOptions()).map(() => {})
        .catch(this.handleError);
    }

    setToken(tokenString: string, user: any) {
        localStorage.setItem('token', tokenString);
        localStorage.setItem('user', JSON.stringify(user));
        this.decodedToken = this.jwtHelper.decodeToken(tokenString);
        this.currentUser = user;
        this.userToken = tokenString;
    }

    getToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
        return false;
    }

    getHttpOptions() {
        const headers = new Headers({'Content-type' : 'application/json'});
        const token = this.getToken();
        if (token) {
            headers.append('Authorization', 'Bearer' + token);
        }
        return new RequestOptions({headers: headers});
    }

    loggedIn() {
        return tokenNotExpired('token');
    }

    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(
            modelStateErrors || 'Server error'
        );
    }
}
