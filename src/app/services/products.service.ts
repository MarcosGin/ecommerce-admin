import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { ListProduct } from './home.service';
import { CommonService } from './common.service';

@Injectable()
export class ProductsService {
  private lastProductsList: ListProduct [] = [
    {
      id: 1,
      title: 'Celular Motorola 4G liberado 16GB',
      category: 'celular',
      created_at: 'six hour ago'
    },
    {
      id: 2,
      title: 'Smart Tv SAMSUNG 48 UN48JU6700',
      category: 'televisor',
      created_at: 'six hour ago'
    },
    {
      id: 3,
      title: 'Notebook Lenovo Y700-15ISK 80NV003SAR',
      category: 'celular',
      created_at: 'six hour ago'
    },
  ];

  constructor ( private _commonService: CommonService) {}

  getProducts() {
    const apiUrl = environment.apiUrl + environment.endpoints.productList;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
  getProduct (id: number) {
    const apiUrl = environment.apiUrl + environment.endpoints.product + '/' + id;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
  addProduct (data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.productAdd;
    return this._commonService.post(apiUrl, JSON.stringify(data))
      .map((res: Response) => {
        return res.json();
      });
  }
  updateProduct( id: number, data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.productUpdate + '/' + id;
    return this._commonService.put(apiUrl,  JSON.stringify(data))
      .map((res: Response) => {
        return res.json();
      });
  }
  deleteProduct( id: number ) {
    const apiUrl = environment.apiUrl + environment.endpoints.productDelete + '/' + id;
    return this._commonService.delete(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
  searchProduct( value: string ) {
    const apiUrl = environment.apiUrl + environment.endpoints.productSearch + '/' + value;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
  getLastProductsList() {
    return this.lastProductsList;
  }
}
