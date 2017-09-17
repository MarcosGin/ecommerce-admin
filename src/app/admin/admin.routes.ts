import { Routes } from '@angular/router';

import { ACCOUNT_ROUTES } from './components/account/account.routes';
import { USERS_ROUTES } from './components/users/users.routes';
import { PRODUCTS_ROUTES } from './components/products/products.routes';

import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';


export const ADMIN_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  {
    path: 'users',
    component: UsersComponent,
    children: USERS_ROUTES,
  },
  {
    path: 'account',
    component: AccountComponent,
    children: ACCOUNT_ROUTES
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: PRODUCTS_ROUTES
  }
];
