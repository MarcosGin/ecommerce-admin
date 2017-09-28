import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ConfigComponent } from './config/config.component';
import { HistoryComponent } from './history/history.component';
import { PermissionComponent } from './permission/permission.component';

export const ACCOUNT_ROUTES: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'permission', component: PermissionComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'profile' }
];
