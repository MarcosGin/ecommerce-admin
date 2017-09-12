import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { APP_ROUTING } from './app.routes';

import { HomeService } from './services/home.service';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { CategorysService } from './services/categorys.service';
import { MarksService } from './services/marks.service';


import { CategoryPipe } from './pipes/category.pipe';
import {MarkPipe} from './pipes/mark.pipe';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { UserEditComponent } from './components/users/edit/user-edit.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductEditComponent } from './components/products/edit/product-edit.component';
import { ProductListComponent } from './components/products/list/product-list.component';
import { ProductAddComponent } from './components/products/add/product-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    UserEditComponent,
    UserListComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryPipe,
    MarkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    APP_ROUTING,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    HomeService,
    UsersService,
    ProductsService,
    CategorysService,
    MarksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
