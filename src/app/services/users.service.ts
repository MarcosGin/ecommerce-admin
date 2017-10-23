import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import {CommonService} from './common.service';

@Injectable()
export class UsersService {

  constructor ( private _commonService: CommonService ) {}

  getUsers () {
    const apiUrl = environment.apiUrl + environment.endpoints.userList;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json();
      });
  }
  getUser ( id: number ) {
    const apiUrl = environment.apiUrl + environment.endpoints.user + '/' + id;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json().response;
      });
  }
  searchUser( value: string ) {
    const apiUrl = environment.apiUrl + environment.endpoints.userSearch + '/' + value;
    return this._commonService.get(apiUrl)
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json();
      });
  }
  updateUser ( id: number, data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.userUpdate + '/' + id;
    return this._commonService.put(apiUrl, JSON.stringify(data))
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json();
      });
  }
  deleteUser ( id: number ) {
    const apiUrl = environment.apiUrl + environment.endpoints.userDelete + '/' + id;
    return this._commonService.delete(apiUrl)
      .map((res: Response) => {
        this._commonService.updateJwt(res.json().jwt);
        return res.json();
      });
  }
}
export class Users {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  document: number;
  email: string;
  phone: number;
  country: string;
  city: string;
  address: string;
  postalcode: number;
}
