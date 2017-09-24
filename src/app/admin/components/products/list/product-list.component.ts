import { Component, OnInit } from '@angular/core';

import { Products } from '../../../../interfaces/products';
import { Category } from '../../../../interfaces/category';
import { Mark } from '../../../../interfaces/mark';

import { ProductsService } from '../../../../services/products.service';
import { CategorysService } from '../../../../services/categorys.service';
import { MarksService } from '../../../../services/marks.service';

@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../products.component.css']
})
export class ProductListComponent implements OnInit {

  public productsList: Products [] = [];
  public categoriesList: Category [] = [];
  public marksList: Mark [] = [];

  constructor( private _productsService: ProductsService,
               private _categorysService: CategorysService,
               private _marksService: MarksService) { }

  ngOnInit() {
    this._productsService.getProducts()
      .subscribe( data => {
        if ( data.status === true) {
          this.productsList = data.response;
        }
        this._marksService.getMarks()
          .subscribe( data2 => {
            if ( data2.status === true) {
              this.marksList = data2.response;
            }
            this._categorysService.getCategories()
              .subscribe(data3 => {
                this.categoriesList = data3.response;
              });

          });
      });
  }
}
