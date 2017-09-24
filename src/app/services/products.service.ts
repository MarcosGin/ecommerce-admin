import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ListProduct } from './home.service';

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

  constructor ( private http: Http) {}

  getProducts() {
    const apiUrl = environment.apiUrl + environment.endpoints.productList;
    return this.http.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getProduct (id: number) {
    const apiUrl = environment.apiUrl + environment.endpoints.product + '/' + id;
    return this.http.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getLastProductsList() {
    return this.lastProductsList;
  }

  updateProduct( id: number, data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.productUpdate + '/' + id;
    return this.http.put(apiUrl,  JSON.stringify(data))
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getProductsForMark( id: number ) {
    const cont = 0;
    return cont;
  }
  getProductsForCategory( id: number ) {
    const cont = 0;
    return cont;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
