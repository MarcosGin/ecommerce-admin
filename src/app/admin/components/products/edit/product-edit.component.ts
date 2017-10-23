import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../../services/products.service';
import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';
import { NotificationsService } from 'angular2-notifications';


import { Products } from '../../../../interfaces/products';
import { Category } from '../../../../interfaces/category';
import { Mark } from '../../../../interfaces/mark';

@Component({
  selector: 'app-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['../products.component.css']
})
export class ProductEditComponent implements OnInit {

  public optionsEditor: Object = {
    placeholderText: 'Insert the description here...',
    height: 200
  };
  public form: FormGroup;
  public product: Products;
  public categories: Category [];
  public marks: Mark [];
  public id: number;
  public loading = false;
  public data = {
    title: '',
    img: ''
  };

  constructor( private _productsService: ProductsService,
               private _categoriesService: CategorysService,
               private _marksService: MarksService,
               private _notifications: NotificationsService,
               private router: ActivatedRoute,
               private location: Location,
               private formBuilder: FormBuilder ) {
    this.product = new Products();
  }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this.buildForm();
      this._productsService.getProduct(this.id)
        .subscribe( data => {
          if ( data.status === true) {
            this.data.title = data.response.title;
            this.data.img = data.response.image.url ? data.response.image.url : 'http://www.sitechecker.eu/img/not-available.png';
            this.form.setValue({
              'title': data.response.title,
              'price': data.response.price,
              'description': data.response.description,
              'category': data.response.category.id,
              'mark': data.response.mark.id,
              'stock': data.response.stock
            });
          }
          this._categoriesService.getCategories()
            .subscribe(data2 => {
              this.categories = data2.response;
              this._marksService.getMarks()
                .subscribe(data3 => {
                  this.marks = data3.response;
                });
            });
        });
    });
  }

  save() {
    this.loading = true;
    this._productsService.updateProduct(this.id, this.form.value)
      .subscribe(data => {
        this.form.setValue({
          'title': data.response.data.title,
          'price': data.response.data.price,
          'description': data.response.data.description,
          'category': data.response.data.category.id,
          'mark': data.response.data.mark.id,
          'stock': data.response.data.stock,
        });
        this._notifications.success('Edit product', data.response.message);
        this.loading = false;
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
          Validators.maxLength(5000)
        ]],
        'price': [this.product.price, [Validators.required]],
        'description': [this.product.description, [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(10000)
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

      if (control && !control.valid) {
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
      'maxlength': 'Cannot be more than 5000 characters long.'
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
