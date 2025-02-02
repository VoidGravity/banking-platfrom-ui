import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { Account } from '../../../core/models/account.model';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
})
export class ManageAccountsComponent implements OnInit {
  accounts: Account[] = [];
  currentPage = 1;
  pageSize = 4;
  displayedAccounts: Account[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.accounts.length);
  }

  get totalPages(): number {
    return Math.ceil(this.accounts.length / this.pageSize);
  }



  fetchAccounts(): void {
    this.accountService.getAllAccounts().subscribe((accounts) => {
      this.accounts = accounts;
      this.updateDisplayedAccounts();
    });
  }

  updateDisplayedAccounts(): void {
    this.displayedAccounts = this.accounts.slice(this.startIndex, this.endIndex);
  }

  updateAccountStatus(accountId: number, status: string): void {
    this.accountService.updateAccountStatus(accountId, status).subscribe((updatedAccount) => {
      const index = this.accounts.findIndex((account) => account.id === accountId);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
        this.updateDisplayedAccounts();
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedAccounts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedAccounts();
    }
  }
}
