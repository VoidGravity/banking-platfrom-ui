import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState, adapter } from './transaction.state';

export const selectTransactionState = createFeatureSelector<TransactionState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  adapter.getSelectors().selectAll
);

export const selectCurrentPage = createSelector(
  selectTransactionState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  selectTransactionState,
  (state) => state.pageSize
);

export const selectTotalTransactions = createSelector(
  selectTransactionState,
  (state) => state.totalTransactions
);

export const selectIsLoading = createSelector(
  selectTransactionState,
  (state) => state.loading
);
