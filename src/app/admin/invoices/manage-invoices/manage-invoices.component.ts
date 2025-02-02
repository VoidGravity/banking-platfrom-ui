import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice-service.service';
import { Invoice } from '../../../core/models/invoice.model';

@Component({
  selector: 'app-manage-invoices',
  templateUrl: './manage-invoices.component.html',
})
export class ManageInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
    this.invoiceService.getAll().subscribe({
      next: (invoices) => (this.invoices = invoices),
      error: (err) => console.error('Error fetching invoices:', err),
    });
  }

 updateStatus(id: number, status: 'PENDING' | 'PAID' | 'OVERDUE'): void {
  this.invoiceService.updateStatus(id, status).subscribe({
    next: () => {
      const invoice = this.invoices.find((inv) => inv.id === id);

      if (invoice){
        invoice.status = status;
      }
    },
    error: (err) => console.error('Error updating invoice status:', err),
  });
}

  get displayedInvoices(): Invoice[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.invoices.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(delta: number): void {
    this.currentPage += delta;
  }

  get totalPages(): number {
    return Math.ceil(this.invoices.length / this.pageSize);
  }


  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize - 1, this.invoices.length);
  }

  statusClass(status: string): string {
    return {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      OVERDUE: 'bg-red-100 text-red-800',
    }[status] || 'bg-gray-100 text-gray-800';
  }

}
