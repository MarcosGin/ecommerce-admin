import { Component, OnInit } from '@angular/core';

import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productsList: Products [] = [];

  constructor( private _productsService: ProductsService) { }

  ngOnInit() {
    this.productsList = this._productsService.getProducts();
  }

}
