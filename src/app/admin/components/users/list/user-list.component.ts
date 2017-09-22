import { Component, OnInit } from '@angular/core';
import { UsersService, Users } from '../../../../services/users.service';

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

  constructor( private _usersService: UsersService) { }

  ngOnInit() {
      this.getUsers();
  }

  search() {
    if (this.searchValue) {
      this._usersService.searchUser(this.searchValue)
        .subscribe(data => {
          if (data.status === true) {
            this.listUsers = data.response;
            this.message.status = false;
          } else {
            this.getUsers();
            this.message.status = true;
            this.message.content = data.response.message;
          }
        });
    } else {
        this.message.status = false;
        this.getUsers();
    }
  }

  getUsers() {
    this._usersService.getUsers()
      .subscribe(data => {
        this.listUsers = data.response;
      });
  }

}
