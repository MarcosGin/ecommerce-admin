import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  public token: string;

  constructor ( private http: Http ) {
    const currentUser = JSON.parse(localStorage.getItem('jwt'));
    this.token = currentUser && currentUser.jwt;
  }

  login( username: string, password: string ) {
    const apiUrl = environment.apiUrl + environment.endpoints.authLogin;
    return this.http.post(apiUrl, JSON.stringify({email: username, password: password}))
      .map((res: Response) => {
        if (res.json().status === true) {
          this.token = res.json().jwt;
          localStorage.setItem('jwt', JSON.stringify({jwt: res.json().jwt }));
        }
        return res.json();
      }).catch(this.handleError);
  }

  logout() {
    const apiUrl = environment.apiUrl + environment.endpoints.authLogout;
    const headers = new Headers();
    headers.append('authorization', this.token);
    const options = new RequestOptions({headers: headers});
    return this.http.get(apiUrl, options)
      .map((res: Response) => {
        if ( res.json().status === true ) {
          localStorage.removeItem('jwt');
        }
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
