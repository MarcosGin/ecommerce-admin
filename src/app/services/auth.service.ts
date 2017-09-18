import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private users = [] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin1'
    },
    {
      id: 2,
      username: 'Marcos',
      password: 'godkhyzo10'
    }
  ];

  public user_id: number;

  constructor () {
  }

  login( username: string, password: string ): boolean {
    let result = false;
    for (const user of this.users) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('jwt', JSON.stringify({token: 'notoken', user_id: user.id}));
        result = true;
      }
    }
    return result;
  }

  getUser() {
    this.user_id = JSON.parse(localStorage.getItem('jwt')).user_id;
    return this.user_id;
  }

  logout(): void {

    localStorage.removeItem('jwt');

  }

}
