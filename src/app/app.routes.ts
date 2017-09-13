import { RouterModule, Routes } from '@angular/router';

import { USERS_ROUTES } from './components/users/users.routes';
import { PRODUCTS_ROUTES } from './components/products/products.routes';

import {HomeComponent} from './components/home/home.component';
import {UsersComponent} from './components/users/users.component';
import {ProductsComponent} from './components/products/products.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: USERS_ROUTES,
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: PRODUCTS_ROUTES
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
