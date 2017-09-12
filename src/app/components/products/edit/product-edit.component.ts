import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service';
import { Products } from '../../../interfaces/products';
import { Category } from '../../../interfaces/category';
import { Mark } from '../../../interfaces/mark';

@Component({
  selector: 'app-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['../products.component.css']
})
export class ProductEditComponent implements OnInit {

  public form: FormGroup;
  public product: Products;
  public categorys: Category [];
  public marks: Mark [];
  public data: Products;
  public id: number;

  constructor( private _productsService: ProductsService,
               private router: ActivatedRoute,
               private formBuilder: FormBuilder ) {
    this.product = new Products();
    this.categorys = [
      {
        id: 1,
        name: 'Celular'
      },
      {
        id: 2,
        name: 'Notebook'
      },
      {
        id: 3,
        name: 'Televisor'
      }
    ];
    this.marks = [
      {
        id: 1,
        name: 'Motorola'
      },
      {
        id: 2,
        name: 'Samsung'
      },
      {
        id: 3,
        name: 'Huawei'
      }
    ];
  }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this.data = this._productsService.getProduct(this.id);
      this.buildForm();
      this.form.setValue({
        'title': this.data.title,
        'price': this.data.price,
        'description': this.data.description,
        'category': this.data.category,
        'mark': this.data.mark,
        'stock': this.data.stock
      });
    });
  }

  save() {
    console.log(this.form.value);
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
