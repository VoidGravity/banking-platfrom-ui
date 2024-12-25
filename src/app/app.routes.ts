import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  {path : 'register' , component : RegisterComponent},
  {
    path : 'admin' ,
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [roleGuard] ,
    data: { role: 'ADMIN' }
  },
  {
    path : 'user' ,
    loadChildren : () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [authGuard] ,
    canActivateChild: [roleGuard],
    data: { role: 'USER' }
  }

];
