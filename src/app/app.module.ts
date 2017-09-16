import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { APP_ROUTING } from './app.routes';

import { AuthService } from './services/auth.service';
import { HomeService } from './services/home.service';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { CategorysService } from './services/categorys.service';
import { MarksService } from './services/marks.service';

import { CategoryPipe } from './pipes/category.pipe';
import { MarkPipe } from './pipes/mark.pipe';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './admin/components/home/home.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { NavbarComponent } from './admin/components/navbar/navbar.component';
import { UsersComponent } from './admin/components/users/users.component';
import { UserEditComponent } from './admin/components/users/edit/user-edit.component';
import { UserListComponent } from './admin/components/users/list/user-list.component';
import { ProductsComponent } from './admin/components/products/products.component';
import { ProductEditComponent } from './admin/components/products/edit/product-edit.component';
import { ProductListComponent } from './admin/components/products/list/product-list.component';
import { ProductAddComponent } from './admin/components/products/add/product-add.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './admin/components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
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
    MarkPipe,
    AdminComponent,
    AccountComponent
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
    AuthGuard,
    AuthService,
    HomeService,
    UsersService,
    ProductsService,
    CategorysService,
    MarksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
