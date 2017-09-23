import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Country } from '../../../../interfaces/country';

import { UsersService, Users } from '../../../../services/users.service';
import { CountryService } from '../../../../services/country.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../users.component.css']
})
export class UserEditComponent implements OnInit {

  public form: FormGroup;
  public countrys: Country[] = [];
  public user: Users;
  public userName: string;
  public id: number;
  public loading = false;
  public message = {
    type: 'success',
    content: ''
  };

  constructor( private _usersService: UsersService,
               private _countrysService: CountryService,
               private router: ActivatedRoute,
               private location: Location,
               private formBuilder: FormBuilder ) {
    this.user = new Users();
  }

  ngOnInit() {
    this._countrysService.getCountrys()
      .subscribe(res => {
        this.countrys = res.response;
        this.router.params.subscribe( params => {
          this.id = params['id'];
          this.buildForm();
          this._usersService.getUser(this.id)
            .subscribe(data => {
              this.userName = data.firstname + ' ' + data.lastname;
              this.form.setValue({
                'firstname': data.firstname,
                'lastname': data.lastname,
                'username': data.username,
                'document': data.document,
                'email': data.email,
                'phone': data.phone,
                'country': data.country,
                'city': data.city,
                'address': data.address,
                'postalcode': data.postalcode
              });
            });
        });
      });
  }

  goBack() {
    this.location.back();
  }

  save () {
    this.loading = true;
    this._usersService.updateUser(this.id, this.form.value)
      .subscribe(data => {
        this.userName = data.response.data.firstname + ' ' + data.response.data.lastname;
        this.form.setValue({
          'firstname': data.response.data.firstname,
          'lastname': data.response.data.lastname,
          'username': data.response.data.username,
          'document': data.response.data.document,
          'email': data.response.data.email,
          'phone': data.response.data.phone,
          'country': data.response.data.country,
          'city': data.response.data.city,
          'address': data.response.data.address,
          'postalcode': data.response.data.postalcode
        });
        this.message.content = data.response.message;
        this.loading = false;
      });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      'firstname': [this.user.firstname, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]
      ],
      'lastname': [this.user.lastname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      'username': [this.user.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]],
      'document': [this.user.document, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      'email': [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      'phone': [this.user.phone, [Validators.required]],
      'country': [this.user.country, [Validators.required]],
      'city': [this.user.city, [Validators.required]],
      'address': [this.user.address, [Validators.required]],
      'postalcode': [this.user.postalcode, [Validators.required]]
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

   formErrors = {
    'firstname': '',
    'lastname': '',
    'username': '',
    'document': '',
    'email': '',
    'phone': '',
    'country': '',
    'city': '',
    'address': '',
    'postalcode': ''
  };

  validationMessages = {
    'firstname': {
      'required':  'This field is required',
      'minlength': 'Must be at least 4 characters long.',
      'maxlength': 'Cannot be more than 24 characters long.'
    },
    'lastname': {
      'required':  'This field is required',
      'minlength': 'Must be at least 4 characters long.',
      'maxlength': 'Cannot be more than 24 characters long.'
    },
    'username': {
      'required':  'This field is required',
      'minlength': 'Must be at least 8 characters long.',
      'maxlength': 'Cannot be more than 8 characters long.'
    },
    'email': {'required': 'This field is required', 'pattern': 'The email is invalid'},
    'phone': {'required': 'This field is required'},
    'country': {'required': 'This field is required'},
    'city': {'required': 'This field is required'},
    'address': {'required': 'This field is required'},
    'postalcode': {'required': 'This field is required'}
  };
}
