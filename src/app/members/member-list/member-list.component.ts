import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../models/pagination';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = <User>JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males'}, {value: 'female', display: 'Female'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService,
     private alertify: AlertifyService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.MaxAge = 99;
    this.userParams.MinAge = 18;
    this.loadUsers();
  }

  loadUsers() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.MaxAge = 99;
    this.userParams.MinAge = 18;
    this.userParams.OrderBy = 'lastActive';
  }

  loadUsersForPagination() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsersForPagination();
  }

}
