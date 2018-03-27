import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Pagination, PaginatedResult } from '../models/pagination';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { debuglog } from 'util';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: 'Unread';

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( (data: PaginatedResult<Message[]>) => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessagesForPagination() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
       this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete the message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex((element) => element.id === id), 1);
        this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delted the message.');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessagesForPagination();
  }

}
