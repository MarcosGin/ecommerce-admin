import { Component, OnInit } from '@angular/core';

import { Products } from '../../../interfaces/products';
import { Category } from '../../../interfaces/category';
import { Mark } from '../../../interfaces/mark';

import { ProductsService } from '../../../services/products.service';
import { CategorysService } from '../../../services/categorys.service';
import { MarksService } from '../../../services/marks.service';

@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../products.component.css']
})
export class ProductListComponent implements OnInit {

  public productsList: Products [] = [];
  public categorysList: Category [] = [];
  public marksList: Mark [] = [];

  constructor( private _productsService: ProductsService,
               private _categorysService: CategorysService,
               private _marksService: MarksService) { }

  ngOnInit() {
    this.productsList = this._productsService.getProducts();
    this.categorysList = this._categorysService.getCategorys();
    this.marksList = this._marksService.getMarks();
  }

  getProductsMarks( id: number ) {
    return this._productsService.getProductsForMark(id);
  }

  getProductsCategorys( id: number ) {
    return this._productsService.getProductsForCategory(id);
  }

}
