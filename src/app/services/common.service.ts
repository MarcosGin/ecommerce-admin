import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications';


@Injectable()
export class CommonService {

  private options;
  constructor(private http: Http,
              private _auth: AuthService,
              private _notifications: NotificationsService,
              private router: Router) {
    this.setHeaders();
  }

  setHeaders( options?: any ) {
    const headers = new Headers();
    headers.append('Authorization', this._auth.token);
    headers.append('Content-Type', 'application/json');
    const remove = options && options.removeContent;
    if (remove) {
        headers.delete('Content-Type');
    }
    this.options = new RequestOptions({'headers': headers});
  }

  public get( url: string, params?: any) {
    this.setHeaders();
    return this.http.get(url, this.options)
      .catch(err => this.handleError(err));
  }

  public post( url: string, params?: any, options?: any) {
    this.setHeaders( options );
    return this.http.post(url, params, this.options)
      .catch(err => this.handleError(err));
  }

  public put( url: string, params?: any) {
    this.setHeaders();
    return this.http.put(url, params, this.options)
      .catch(err => this.handleError(err));
  }

  public patch( url: string, params?: any) {
    this.setHeaders();
    return this.http.patch(url, params, this.options)
      .catch(err => this.handleError(err));
  }

  public delete( url: string, params?: any) {
    this.setHeaders();
    return this.http.delete(url, this.options)
      .catch(err => this.handleError(err));
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error.status === 401) {
      localStorage.removeItem('jwt');
      const err = error._body;
      this._notifications.error('Logout', JSON.parse(err).response);
      this.router.navigate(['/login']);
    }
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
