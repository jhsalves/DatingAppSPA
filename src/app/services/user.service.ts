import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { BaseService } from './base';
import { User } from '../models/User';
import { Photo } from '../models/Photo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService extends BaseService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp, private authService: AuthService) {
        super();
     }

    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl + 'users')
        .map(response => <User[]>response.json())
        .catch(this.handleError);
    }

    getUser(id): Observable<User> {
        return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
    }
}
