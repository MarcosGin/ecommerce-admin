import { Routes } from '@angular/router';

import { ProductEditComponent } from './edit/product-edit.component';
import { ProductListComponent } from './list/product-list.component';


export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'edit/:id', component: ProductEditComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
