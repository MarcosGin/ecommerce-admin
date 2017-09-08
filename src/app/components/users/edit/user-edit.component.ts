import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Country } from '../../../interfaces/country';

import { UsersService, Users } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../users.component.css']
})
export class UserEditComponent implements OnInit {

  public form: FormGroup;
  public countrys: Country[];
  public user: Users;
  public data: Users;
  public id: number;

  constructor( private _usersService: UsersService,
               private router: ActivatedRoute,
               private formBuilder: FormBuilder ) {
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
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this.data = this._usersService.getUser(this.id);
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
      .subscribe(data => this.onValueChanged());
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    console.log(this.form.value);
    const form = this.form;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
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
      'required':  'required field',
      'minlength': 'must be at least 4 characters long.',
      'maxlength': 'cannot be more than 24 characters long.'
    },
    'lastName': {
      'required': 'required field',
      'minlength': 'must be at least 4 characters long.',
      'maxlength':     'cannot be more than 24 characters long.'
    },
    'username': {
      'required': 'required field',
      'minlength': 'must be at least 8 characters long.',
      'maxlength':     'cannot be more than 8 characters long.'
    },
    'email': {'required': 'required field', 'pattern': 'The email is invalid!'},
    'phone': {'required': 'required field'},
    'country': {'required': 'required field'},
    'city': {'required': 'required field'},
    'address': {'required': 'required field'},
    'postalCode': {'required': 'required field'}
  };
}
