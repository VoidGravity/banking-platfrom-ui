import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayUsersComponent} from "./user/display-users/display-users.component";
import {AdminComponent} from "./admin.component";
import {CreateComponent} from "./user/create/create.component";
import {ManageAccountsComponent} from "./account/manage-accounts/manage-accounts.component";
import {ManageCreditRequestsComponent} from "./credit-request/manage-credit-requests/manage-credit-requests.component";
import {ManageInvoicesComponent} from "./invoices/manage-invoices/manage-invoices.component";
import {ManageTransactionsComponent} from "./transactions/manage-transactions/manage-transactions.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'users', component: DisplayUsersComponent },
      {path : 'create/user' , component : CreateComponent},
      {path : 'accounts' , component : ManageAccountsComponent},
      {path : 'credit-requests' , component : ManageCreditRequestsComponent} ,
      {path : 'invoices' , component : ManageInvoicesComponent} ,
      {path : 'transactions' , component : ManageTransactionsComponent}


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
