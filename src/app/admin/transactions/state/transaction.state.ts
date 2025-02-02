import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from '../../../core/models/Transaction.model';

export interface TransactionState extends EntityState<Transaction> {
  totalAmount: number;
  currentPage: number;
  pageSize: number;
  totalTransactions: number;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

export const initialState: TransactionState = adapter.getInitialState({
  totalAmount: 0,
  currentPage: 1,
  pageSize: 5,
  totalTransactions: 0,
  loading: false,
  error: null,
});
