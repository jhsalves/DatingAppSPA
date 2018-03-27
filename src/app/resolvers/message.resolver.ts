// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { User } from '../models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import 'rxjs/operator/catch';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';

    constructor(private userService: UserService,
         private router: Router,
         private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer)
            .catch(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/messages']);
                return Observable.of(null);
            });
    }
}
