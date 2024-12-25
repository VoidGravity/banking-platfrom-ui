import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayUsersComponent} from "./user/display-users/display-users.component";

const routes: Routes = [
  {path : 'users', component: DisplayUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
