import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TransactionService } from '../../../core/services/transaction.service';
import * as TransactionActions from './transaction.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService
  ) {}

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(({ page, pageSize }) =>
        this.transactionService.getAll(page, pageSize).pipe(
          map((response) =>
            TransactionActions.loadTransactionsSuccess({
              transactions: response.content,
              totalTransactions: response.totalElements,
            })
          ),
          catchError((error) =>
            of(TransactionActions.loadTransactionsFailure({ error }))
          )
        )
      )
    )
  );

  updateTransactionStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.approveTransaction, TransactionActions.rejectTransaction),
      mergeMap((action) =>
        this.transactionService
          .updateStatus(action.transactionId, action.type === '[Transaction] Approve Transaction' ? 'APPROVED' : 'REJECTED')
          .pipe(
            map((transaction) =>
              TransactionActions.updateTransactionStatusSuccess({ transaction })
            ),
            catchError((error) =>
              of(TransactionActions.updateTransactionStatusFailure({ error }))
            )
          )
      )
    )
  );
}
