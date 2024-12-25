import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {DisplayUsersComponent} from "./user/display-users/display-users.component";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DisplayUsersComponent
  ]
})
export class AdminModule { }
