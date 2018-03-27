import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId)
    .do((messages: Message[]) => {
      messages.forEach((mensagem) => {
        if (!mensagem.isRead && mensagem.recipientId === currentUserId) {
          this.userService.markAsRead(currentUserId, mensagem.id);
        }
      });
    })
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.newMessage.senderPhotoUrl = this.authService.currentUser.photoUrl;
    this.newMessage.senderKnownAs = this.authService.currentUser.knownAs;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
