import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import {CommonService} from './common.service';


@Injectable()
export class AccountService {

  constructor ( private _commonService: CommonService) {}

  getProfile() {
    const apiUrl = environment.apiUrl + environment.endpoints.accountProfile;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json().response;
      });
  }
  updateProfile( data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.accountProfile;
    return this._commonService.put(apiUrl, JSON.stringify(data))
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json();
      });
  }
}
