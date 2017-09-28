import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';


@Injectable()
export class AccountService {

  constructor ( private http: Http,
                private _authService: AuthService) {

  }

  getProfile() {
    const apiUrl = environment.apiUrl + environment.endpoints.accountProfile;
    const headers = new Headers();
    headers.append('authorization', this._authService.token);
    const options = new RequestOptions({headers: headers});
    return this.http.get(apiUrl, options)
      .map((res: Response) => {
        return res.json().response;
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
