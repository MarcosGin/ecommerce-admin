import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user: Users;

  constructor( private _authService: AuthService,
               private _usersService: UsersService ) {
    this.user = this._usersService.getUser(this._authService.getUser());
  }

  ngOnInit() {
  }

}
