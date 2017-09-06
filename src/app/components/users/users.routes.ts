import { Routes } from '@angular/router';

import {UserEditComponent} from './user-edit.component';
import {UserListComponent} from './user-list.component';


export const USERS_ROUTES: Routes = [
  { path: '', component: UserListComponent},
  { path: 'edit/:id', component: UserEditComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
