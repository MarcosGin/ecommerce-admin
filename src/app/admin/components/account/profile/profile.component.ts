import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';
import { Users } from '../../../../services/users.service';
import { Country } from '../../../../interfaces/country';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: Users;
  public data: Users;
  public form: FormGroup;
  public countrys: Country [];

  constructor( private _authService: AuthService,
               private _usersService: UsersService,
               private formBuilder: FormBuilder) {
    this.user = new Users();
    this.countrys = [
      {
        id: 'ar',
        name: 'Argentina'
      },
      {
        id: 'bo',
        name: 'Bolivia'
      },
      {
        id: 'pe',
        name: 'Perú'
      }
    ];
  }
  ngOnInit() {
    this.data = this._usersService.getUser(this._authService.user_id);
    this.buildForm();
    this.form.setValue({
      'firstName': this.data.firstName,
      'lastName': this.data.lastName,
      'username': this.data.username,
      'document': this.data.document,
      'email': this.data.email,
      'phone': this.data.phone,
      'country': this.data.country,
      'city': this.data.city,
      'address': this.data.address,
      'postalCode': this.data.postalCode
    });
  }

  save () {
    console.log(this.form.value);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      'firstName': [this.user.firstName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]
      ],
      'lastName': [this.user.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      'username': [this.user.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]],
      'document': [this.user.lastName, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      'email': [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      'phone': [this.user.phone, [Validators.required]],
      'country': [this.user.country, [Validators.required]],
      'city': [this.user.city, [Validators.required]],
      'address': [this.user.address, [Validators.required]],
      'postalCode': [this.user.postalCode, [Validators.required]]
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    console.log('entro');
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
    'firstName': '',
    'lastName': '',
    'username': '',
    'document': '',
    'email': '',
    'phone': '',
    'country': '',
    'city': '',
    'address': '',
    'postalCode': ''
  };

  validationMessages = {
    'firstName': {
      'required':  'This field is required',
      'minlength': 'Must be at least 4 characters long.',
      'maxlength': 'Cannot be more than 24 characters long.'
    },
    'lastName': {
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
    'postalCode': {'required': 'This field is required'}
  };

}
