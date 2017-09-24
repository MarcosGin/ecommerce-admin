import { Component, OnInit } from '@angular/core';

import { Products } from '../../../../interfaces/products';
import { Category } from '../../../../interfaces/category';
import { Mark } from '../../../../interfaces/mark';

import { ProductsService } from '../../../../services/products.service';
import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../products.component.css']
})
export class ProductListComponent implements OnInit {

  public productsList: Products [] = [];
  public categoriesList: Category [] = [];
  public marksList: Mark [] = [];
  searchValue: string = '';
  message = {
    status: false,
    type: 'danger',
    content: ''
  };
  constructor( private _productsService: ProductsService,
               private _categorysService: CategorysService,
               private _marksService: MarksService) { }

  ngOnInit() {
    this._productsService.getProducts()
      .subscribe( data => {
        if ( data.status === true) {
          this.productsList = data.response;
        }
          this._marksService.getMarks().subscribe(data2 => {
            this.marksList = data2.response;
            this._categorysService.getCategories().subscribe(data3 => {
              this.categoriesList = data3.response;
            });
          });
      });
  }

  search() {
    if (this.searchValue) {
      this._productsService.searchProduct(this.searchValue)
        .subscribe(data => {
          if (data.status === true) {
            this.productsList = data.response;
            this.message.status = false;
          } else {
            this.getProducts();
            this.message.status = true;
            this.message.type = 'danger';
            this.message.content = data.response;
          }
        });
    } else {
      this.message.status = false;
      this.getProducts();
    }
  }

  getProducts() {
    this._productsService.getProducts()
      .subscribe( data => {
        if (data.status === true) {
          this.productsList = data.response;
        }
      });
  }

}
