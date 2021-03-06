import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';
import { ProductsService } from '../../../../services/products.service';
import { NotificationsService } from 'angular2-notifications';


import { Products } from '../../../../interfaces/products';
import { Category } from '../../../../interfaces/category';
import { Mark } from '../../../../interfaces/mark';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styles: []
})
export class ProductAddComponent implements OnInit {

  public optionsEditor: Object = {
    placeholderText: 'Insert the description here...',
    height: 200
  };
  public form: FormGroup;
  public product: Products;
  public categories: Category [];
  public marks: Mark [];
  public loading = false;
  public message = {
    type: 'success',
    content: ''
  };

  constructor( private _categorysService: CategorysService,
               private _marksService: MarksService,
               private _productsService: ProductsService,
               private _notifications: NotificationsService,
               private formBuilder: FormBuilder,
               private location: Location) {
    this.product = new Products();
  }

  ngOnInit() {
    this._categorysService.getCategories()
      .subscribe(data => {
        this.categories = data.response;
      },err => { console.log(err); },
        () => {
        this._marksService.getMarks()
          .subscribe(data => {
            this.marks = data.response;
          });
        });
    this.buildForm();
    this.form.setValue({
      'title': '',
      'price': '',
      'description': '',
      'category': '1',
      'mark': '1',
      'stock': 1,
    });
  }

  save() {
    this._productsService.addProduct(this.form.value)
      .subscribe(data => {
        this._notifications.success('Add product', data.response.message);
        this.location.back();
    });
  }

  goBack() {
    this.location.back();
  }

  buildForm(): void {
    this.form = this.formBuilder.group( {
      'title': [this.product.title, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]],
      'price': [this.product.price, [Validators.required]],
      'description': [this.product.description, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(240)
      ]],
      'category': [this.product.category, [Validators.required]],
      'mark': [this.product.mark, [Validators.required]],
      'stock': [this.product.stock, [Validators.required]]
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

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'title': '',
    'price': '',
    'description': '',
    'category': '',
    'mark': '',
    'stock': ''
  };

  validationMessages = {
    'title': {
      'required': 'This field is required',
      'minlength': 'Must be at least 10 characters long.',
      'maxlength': 'Cannot be more than 100 characters long.'
    },
    'price': {
      'required': 'This field is required'
    },
    'description': {
      'required': 'This field is required',
      'minlength': 'Must be at least 20 characters long.',
      'maxlength': 'Cannot be more than 240 characters long.'
    },
    'category': {
      'required': 'This field is required'
    },
    'mark': {
      'required': 'This field is required'
    },
    'stock': {
      'required': 'This field is required'
    }
  };

}
