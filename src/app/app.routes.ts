import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ADMIN_ROUTES } from './admin/admin.routes';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: ADMIN_ROUTES},
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
