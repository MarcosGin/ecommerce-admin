import { Component, OnInit } from '@angular/core';

import { Products } from '../../../../interfaces/products';
import { Category } from '../../../../interfaces/category';
import { Mark } from '../../../../interfaces/mark';

import { ProductsService } from '../../../../services/products.service';
import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';
import { PaginationService } from '../../../../services/pagination.service';
import { NotificationsService } from 'angular2-notifications';


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
  pagerProducts: any = {};
  pagedProducts: any[];
  pagerMarks: any = {};
  pagedMarks: any[];
  constructor( private _productsService: ProductsService,
               private _categorysService: CategorysService,
               private _marksService: MarksService,
               private _notifications: NotificationsService,
               private _paginationService: PaginationService) { }

  ngOnInit() {
    this._productsService.getProducts()
      .subscribe( data => {
        if ( data.status === true) {this.productsList = data.response; this.setPageProducts(1); }
      },err => console.log(err),
                () => {
                  this._marksService.getMarks().subscribe(data => {
                    if (data.status === true) {this.marksList = data.response; this.setPageMarks(1); }
                  },err => console.log(err),
                    () => {
                    this._categorysService.getCategories().subscribe(data => {
                      if (data.status === true) {this.categoriesList = data.response; }
                    });
                    });
                  });
  }

  delete( id: number) {
    this._productsService.deleteProduct( id)
      .subscribe( data => {
        if (data.status === true ) {
          this._notifications.success('Delete product', data.response);
        } else {
          this._notifications.error('Delete product', data.response);
        }
        this.getProducts();
      });
  }

  search() {
    if (this.searchValue) {
      this._productsService.searchProduct(this.searchValue)
        .subscribe(data => {
          if (data.status === true) {
            this.productsList = data.response;
            this.message.status = false;
            this.setPageProducts(1);
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
          this.setPageProducts(1);
        }
      });
  }

  setPageProducts(page: number) {
    if (page < 1 || page > this.pagerProducts.totalPages) {
      return;
    }

    this.pagerProducts = this._paginationService.getPager(this.productsList.length, page);
    this.pagedProducts = this.productsList.slice(this.pagerProducts.startIndex, this.pagerProducts.endIndex + 1);
  }

  setPageMarks(page: number) {
    if (page < 1 || page > this.pagerMarks.totalPages) {
      return;
    }

    this.pagerMarks = this._paginationService.getPager(this.marksList.length, page, 5);
    this.pagedMarks = this.marksList.slice(this.pagerMarks.startIndex, this.pagerMarks.endIndex + 1);
  }

}
