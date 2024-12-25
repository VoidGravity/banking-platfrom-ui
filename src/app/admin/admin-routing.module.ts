import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayUsersComponent} from "./user/display-users/display-users.component";
import {AdminComponent} from "./admin.component";
import {CreateComponent} from "./user/create/create.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: DisplayUsersComponent },
      {path : 'create/user' , component : CreateComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
