import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import {TransactionEffects} from "./app/admin/transactions/state/transaction.effects";
import {provideEffects} from "@ngrx/effects";
import {provideStore} from "@ngrx/store";
import {transactionReducer} from "./app/admin/transactions/state/transaction.reducer";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ transactions: transactionReducer }),
    provideEffects([TransactionEffects]),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
