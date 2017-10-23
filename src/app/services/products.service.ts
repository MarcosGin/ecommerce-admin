import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { CommonService } from './common.service';

@Injectable()
export class ProductsService {

  constructor ( private _commonService: CommonService) {}

  getProducts( order: string = '', limit: number = 0) {
    let apiUrl =  environment.apiUrl + environment.endpoints.productList;
    if ( order.length ) {
      if (limit > 0) {
        apiUrl = apiUrl + '/' + order + '/' + limit;
      } else {
        apiUrl = apiUrl + '/' + order;
      }
    }
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
  getImages (id: number) {
    const apiUrl = environment.apiUrl + environment.endpoints.productImage + '/' + id;
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
  addImages( id: number, data: any) {
    const headers = {
      removeContent : true
    };
    const apiUrl = environment.apiUrl + environment.endpoints.productImageAdd + '/' + id;
    return this._commonService.post(apiUrl, data, headers)
      .map((res: Response) => {
        return res.json();
      });
  }
  addImage( id: number, data: any) {
    const headers = {
      removeContent : true
    };
    const apiUrl = environment.apiUrl + environment.endpoints.productImageCoverAdd + '/' + id;
    return this._commonService.post(apiUrl, data, headers)
      .map((res: Response) => {
        return res.json();
      });
  }
  deleteImage( id: number, name: string ) {
    const apiUrl = environment.apiUrl + environment.endpoints.productImageDelete + '/' + id + '/' + name;
    return this._commonService.delete(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
}
