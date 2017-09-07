import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  private users: Users[] = [
    {
      id: 1,
      firstName: 'Marcos',
      lastName: 'Gin',
      username: 'Khyzo',
      document: 42270070,
      email: 'marcosgin291@gmail.com.ar',
      phone: 42131424,
      country: 'ar',
      city: 'Avellaneda',
      address: 'Beazley 91',
      postalCode: 1872
    },
    {
      id: 2,
      firstName: 'Johanna',
      lastName: 'Ramirez',
      username: 'johan12',
      document: 41235456,
      email: 'soyjohan@yahoo.com.ar',
      phone: 1542213472,
      country: 'pe',
      city: 'Lima',
      address: 'Avenida Jose Carlos 1832',
      postalCode: 1241
    },
    {
      id: 3,
      firstName: 'Matías',
      lastName: 'Mendoza',
      username: 'maty241',
      document: 51603242,
      email: 'matimendoza@gmail.com',
      phone: null,
      country: 'ar',
      city: 'Capital Federal',
      address: 'Lavalle 32',
      postalCode: 11241
    }
  ];

  constructor () {}

  getUsers () {
    return this.users;
  }

  getUser ( id: number ) {
    return this.users[id - 1];
  }

}
export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  document: number;
  email: string;
  phone: number;
  country: string;
  city: string;
  address: string;
  postalCode: number;
}
