import { Component, OnInit } from '@angular/core';
import { CreditRequestService } from '../../../core/services/credit-request.service';
import { CreditRequest } from '../../../core/models/CreditRequest.model';

@Component({
  selector: 'app-manage-credit-requests',
  templateUrl: './manage-credit-requests.component.html',
})
export class ManageCreditRequestsComponent implements OnInit {
  creditRequests: CreditRequest[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(private creditRequestService: CreditRequestService) {}

  ngOnInit(): void {
    this.fetchCreditRequests();
  }

  fetchCreditRequests(): void {
    this.creditRequestService.getAll().subscribe({
      next: (requests) => (this.creditRequests = requests),
      error: (err) => console.error('Error fetching credit requests:', err),
    });
  }


  approveTransaction(requestId: number): void {
    this.updateStatus(requestId, 'APPROVED', () => {
      this.fetchCreditRequests();
    });
  }

  rejectTransaction(requestId: number): void {
    this.updateStatus(requestId, 'REJECTED', () => {
      this.fetchCreditRequests();
    });
  }

  updateStatus(requestId: number, newStatus: string, callback?: () => void): void {
    const approve = newStatus === 'APPROVED';
    this.creditRequestService.approve(requestId, approve).subscribe({
      next: () => {
        const request = this.creditRequests.find((req) => req.id === requestId);
        if (request) {
          request.status = newStatus;
        }
        if (callback) {
          callback();
        }
      },
      error: (err) => console.error(`Error updating status for request ${requestId}:`, err),
    });
  }


  get displayedRequests(): CreditRequest[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.creditRequests.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(delta: number): void {
    const newPage = this.currentPage + delta;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.creditRequests.length / this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize - 1, this.creditRequests.length);
  }

  statusClass(status: string): string {
    return {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
    }[status] || 'bg-gray-100 text-gray-800';
  }
}
