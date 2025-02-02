import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../../core/models/Transaction.model';

export const loadTransactions = createAction(
  '[Transaction] Load Transactions',
  props<{ page: number; pageSize: number }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[]; totalTransactions: number }>()
);

export const loadTransactionsFailure = createAction(
  '[Transaction] Load Transactions Failure',
  props<{ error: any }>()
);

export const approveTransaction = createAction(
  '[Transaction] Approve Transaction',
  props<{ transactionId: number }>()
);

export const rejectTransaction = createAction(
  '[Transaction] Reject Transaction',
  props<{ transactionId: number }>()
);

export const updateTransactionStatusSuccess = createAction(
  '[Transaction] Update Transaction Status Success',
  props<{ transaction: Transaction }>()
);

export const updateTransactionStatusFailure = createAction(
  '[Transaction] Update Transaction Status Failure',
  props<{ error: any }>()
);
