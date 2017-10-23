import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CommonService } from './common.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class StatisticsService {

  constructor( private _commonService: CommonService ) { }

  getStatistics() {
    const apiUrl = environment.apiUrl + environment.endpoints.statistics;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      });
  }

}

export class StatisticsHome {
  products: number;
  users: number;
  buys: number;
  mistakes: number;
}
