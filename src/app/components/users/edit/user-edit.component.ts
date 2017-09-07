import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService, Users } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../users.component.css']
})
export class UserEditComponent implements OnInit {

  user: Users;
  id: number;
  constructor( private _usersService: UsersService,
               private router: ActivatedRoute ) {
    this.router.params.subscribe( params => {
        this.id = params['id'];
    });
  }

  ngOnInit() {
    this.user = this._usersService.getUser(this.id);
  }

  saveChanges () {

  }
}
