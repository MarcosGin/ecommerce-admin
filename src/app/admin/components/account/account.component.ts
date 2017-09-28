import { Component, OnInit } from '@angular/core';
import { Users } from '../../../services/users.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user: Users;

  constructor( private _accountService: AccountService) {
    this.user = new Users();
   this._accountService.getProfile()
     .subscribe( data => {
     this.user = data;
   });
  }

  ngOnInit() {
  }

}
