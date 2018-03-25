import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { BaseService } from './base';
import { User } from '../models/User';
import { Photo } from '../models/Photo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../models/pagination';

@Injectable()
export class UserService extends BaseService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp, private authService: AuthService) {
        super();
     }

    getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParam?: string): Observable<PaginatedResult<User[]>> {
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if (likesParam === 'Likers') {
            queryString += 'Likers=true&';
        }

        if (likesParam === 'Likees') {
            queryString += 'Likees=true&';
        }

        if (userParams != null) {
            queryString += 'minAge=' + userParams.MinAge;
            queryString += '&maxAge=' + userParams.MaxAge;
            queryString += '&gender=' + userParams.gender;
            queryString += '&orderBy=' + userParams.orderBy;
        }
        console.log(queryString);

        return this.authHttp
        .get(this.baseUrl + 'users' + queryString)
        .map((response: Response) => {
            paginatedResult.result = response.json();
            if (response.headers.get('Pagination')) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }).catch(this.handleError);
    }

    updateUser(id: number, user: User) {
        return this.authHttp
         .put(this.baseUrl + 'users/' + id, user)
         .catch(this.handleError);
    }

    setMainPhoto(userId: number, id: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {} )
        .catch(this.handleError);
    }

    deletePhoto(userId: number, id: number) {
        return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).catch(this.handleError);
    }

    sendLike(id: number, recipientId: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {}).catch(this.handleError);
    }

    getUser(id): Observable<User> {
        return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
    }
}
