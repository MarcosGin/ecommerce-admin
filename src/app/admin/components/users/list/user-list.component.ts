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
    this.listUsers = this._usersService.getUsers();
  }

}
