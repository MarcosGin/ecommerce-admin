import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import {CommonService} from './common.service';

@Injectable()
export class CategorysService {
  constructor( private _commonService: CommonService) {}

  getCategories() {
    const apiUrl = environment.apiUrl + environment.endpoints.productCategoryList;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
}
