import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './transaction.state';
import * as TransactionActions from './transaction.actions';

export const transactionReducer = createReducer(
  initialState,

  on(TransactionActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransactionActions.loadTransactionsSuccess, (state, { transactions, totalTransactions }) =>
    adapter.setAll(transactions, {
      ...state,
      totalTransactions,
      loading: false,
    })
  ),

  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.updateTransactionStatusSuccess, (state, { transaction }) =>
    adapter.updateOne(
      { id: transaction.id!, changes: { status: transaction.status } },
      state
    )
  ),

  on(TransactionActions.updateTransactionStatusFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const { selectAll } = adapter.getSelectors();
