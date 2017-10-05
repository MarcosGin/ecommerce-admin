import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import {CommonService} from './common.service';

@Injectable()
export class MarksService {
  constructor( private _commonService: CommonService) {}
s
  getMarks() {
    const apiUrl = environment.apiUrl + environment.endpoints.productMarkList;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }
}
