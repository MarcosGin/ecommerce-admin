import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';

@Injectable()
export class UsersService {

  constructor ( private http: Http,
                private _authService: AuthService ) {}

  getUsers () {
    const apiUrl = environment.apiUrl + environment.endpoints.userList;
    return this.http.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUser ( id: number ) {
    const apiUrl = environment.apiUrl + environment.endpoints.user + '/' + id;
    return this.http.get(apiUrl)
      .map((res: Response) => {
        return res.json().response;
      }).catch(this.handleError);
  }

  searchUser( value: string ) {
    const apiUrl = environment.apiUrl + environment.endpoints.userSearch + '/' + value;
    return this.http.get(apiUrl)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  updateUser ( id: number, data: any) {
    const apiUrl = environment.apiUrl + environment.endpoints.userUpdate + '/' + id;
    return this.http.put(apiUrl, JSON.stringify(data))
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  deleteUser ( id: number ) {
    const apiUrl = environment.apiUrl + environment.endpoints.userDelete + '/' + id;
    const headers = new Headers();
    headers.append('authorization', this._authService.token);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(apiUrl, options)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
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
