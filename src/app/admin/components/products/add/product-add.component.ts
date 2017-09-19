import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';

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
  public categorys: Category [];
  public marks: Mark [];

  constructor( private _categorysService: CategorysService,
               private _marksService: MarksService,
               private formBuilder: FormBuilder,
               private location: Location) {
    this.product = new Products();
    this.categorys = this._categorysService.getCategorys();
    this.marks = this._marksService.getMarks();
  }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    console.log(this.form.value);
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
