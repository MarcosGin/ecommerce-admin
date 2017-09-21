import { Component, OnInit } from '@angular/core';
import { UsersService, Users } from '../../../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../users.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: Users[] = [];

  constructor( private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getUsers()
      .subscribe( data => {
        this.listUsers = data.response;
      });
  }

}
