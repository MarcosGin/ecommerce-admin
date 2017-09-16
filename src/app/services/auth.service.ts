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


  constructor () {

  }

  login( username: string, password: string ): boolean {
    let result = false;
    for (const user of this.users) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('jwt', JSON.stringify({username: username}));
        result = true;
      }
    }
    return result;
  }

  logout(): void {

    localStorage.removeItem('jwt');

  }

}
