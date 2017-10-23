import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CommonService } from './common.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class MistakesService {

  constructor( private _commonService: CommonService ) { }

  getMistakes( order: string = '', limit: number = 0) {
    let apiUrl = environment.apiUrl + environment.endpoints.mistakeList;
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

}
export class Mistakes {
  id: number;
  title: string;
  description: string;
  status: number;
  created_at: string;
}
