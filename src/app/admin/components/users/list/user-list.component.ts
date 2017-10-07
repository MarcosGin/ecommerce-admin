import { Component, OnInit } from '@angular/core';
import { UsersService, Users } from '../../../../services/users.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../users.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: Users[] = [];
  searchValue: string = '';
  message = {
    status: false,
    content: ''
  };
  // https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif
  loading = true;
  constructor( private _usersService: UsersService,
               private _notifications: NotificationsService) { }

  ngOnInit() {
      this.getUsers();
  }

  search() {
    this.message.status = false;
    if (this.searchValue) {
       this.listUsers = [];
      this.loading = true;
      this._usersService.searchUser(this.searchValue)
        .subscribe(data => {
          if (data.status === true) {
            this.listUsers = data.response;
          } else {
            this.getUsers();
            this.message.status = true;
            this.message.content = data.response;
          }
          this.loading = false;
        });
    } else {
        this.getUsers();
    }
  }

  delete( id: number) {
    this._usersService.deleteUser( id)
      .subscribe( data => {
        if (data.status === true ) {
          this._notifications.success('Delete user', data.response);
        } else {
          this._notifications.error('Delete user', data.response);
        }
        this.getUsers();
      });
  }

  getUsers() {
    this.listUsers = [];
    this.loading = true;
    this._usersService.getUsers()
      .subscribe(data => {
        this.listUsers = data.response;
        this.loading = false;
      });
  }

}
