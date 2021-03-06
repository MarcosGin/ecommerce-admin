import { Routes } from '@angular/router';

import { ProductEditComponent } from './edit/product-edit.component';
import { ProductListComponent } from './list/product-list.component';
import { ProductAddComponent } from './add/product-add.component';
import { ImageEditComponent } from './images/image-edit.component';
import { MarksComponent } from './marks/marks.component';
import { CategoriesComponent } from './categories/categories.component';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'edit/:id', component: ProductEditComponent},
  { path: 'add', component: ProductAddComponent},
  { path: 'images/:id', component: ImageEditComponent},
  { path: 'marks/add', component: MarksComponent },
  { path: 'categories/add', component: CategoriesComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
