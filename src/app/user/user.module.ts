import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ProfileComponent} from "./profile/profile.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    UserRoutingModule,
    ProfileComponent
  ]
})
export class UserModule { }
