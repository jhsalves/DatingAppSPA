import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Photo } from '../../models/Photo';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadUser();
    this.authService.currentPhotoUrl.subscribe(pUrl => this.photoUrl = pUrl);
  }

  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
    .subscribe(x => {
      this.editForm.reset(this.user);
      this.alertify.success('Profile Updated successfully');
    });
  }

  displayMainPhoto(photo: Photo) {
    this.user.photoUrl = photo.url;
  }

}
