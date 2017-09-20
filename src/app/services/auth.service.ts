import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public token: string;

  constructor ( private http: Http ) {
    const currentUser = JSON.parse(localStorage.getItem('jwt'));
    this.token = currentUser && currentUser.jwt;
  }

  login( username: string, password: string ) {
    const apiUrl = environment.apiUrl + 'auth/login';
    return this.http.post(apiUrl, JSON.stringify({email: username, password: password}))
      .map( res => {
        if (res.json().result === true) {
          this.token = res.json().jwt;
          localStorage.setItem('jwt', JSON.stringify({jwt: res.json().jwt }));
        }
        return res.json();
      });
  }

  logout() {
    const apiUrl = environment.apiUrl + 'auth/logout';
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this.http.get(apiUrl, options)
      .map(res => {
        return res.json();
      });


    // localStorage.removeItem('jwt');

  }

}
