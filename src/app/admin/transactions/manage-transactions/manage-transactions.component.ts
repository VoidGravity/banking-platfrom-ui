import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TransactionActions from '../state/transaction.actions';
import {
  selectAllTransactions,
  selectCurrentPage,
  selectPageSize,
  selectTotalTransactions,
  selectIsLoading,
} from '../state/transaction.selectors';
import { Transaction } from '../../../core/models/Transaction.model';

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
})
export class ManageTransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]> = this.store.select(selectAllTransactions);
  currentPage$: Observable<number> = this.store.select(selectCurrentPage);
  pageSize$: Observable<number> = this.store.select(selectPageSize);
  totalTransactions$: Observable<number> = this.store.select(selectTotalTransactions);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  displayedTransactions: Transaction[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  transactions: Transaction[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage, this.pageSize);
    this.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      this.updateDisplayedTransactions();
    });
    this.totalTransactions$.subscribe(total => {
      this.totalPages = Math.ceil(total / this.pageSize);
    });
  }

  loadPage(page: number, pageSize: number): void {
    this.store.dispatch(TransactionActions.loadTransactions({ page, pageSize }));
  }

  approveTransaction(transactionId: number): void {
    this.store.dispatch(TransactionActions.approveTransaction({ transactionId }));
  }

  rejectTransaction(transactionId: number): void {
    this.store.dispatch(TransactionActions.rejectTransaction({ transactionId }));
  }

  changePage(direction: number): void {
    this.currentPage += direction;
    this.updateDisplayedTransactions();
  }

  updateDisplayedTransactions(): void {
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.transactions.length);
    this.displayedTransactions = this.transactions.slice(this.startIndex, this.endIndex);
  }
}
