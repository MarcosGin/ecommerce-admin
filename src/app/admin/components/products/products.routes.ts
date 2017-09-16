import { Routes } from '@angular/router';

import { ProductEditComponent } from './edit/product-edit.component';
import { ProductListComponent } from './list/product-list.component';
import { ProductAddComponent } from './add/product-add.component';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'edit/:id', component: ProductEditComponent},
  { path: 'add', component: ProductAddComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
