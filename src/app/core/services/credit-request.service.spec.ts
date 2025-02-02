import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreditRequestService } from './credit-request.service';
import { CreditRequest } from '../models/CreditRequest.model';

describe('CreditRequestService', () => {
  let service: CreditRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditRequestService],
    });
    service = TestBed.inject(CreditRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all credit requests', () => {
    const dummyRequests: CreditRequest[] = [
      {
        id: 1,
        amount: 5000,
        status: 'PENDING',
        interestRate: 5,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        eligibilityStatus: 'ELIGIBLE',
      },
      {
        id: 2,
        amount: 7000,
        status: 'APPROVED',
        interestRate: 3.5,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        eligibilityStatus: 'NOT_ELIGIBLE',
      },
    ];

    service.getAll().subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests).toEqual(dummyRequests);
    });

    const req = httpMock.expectOne('/api/credit-requests');
    expect(req.request.method).toBe('GET');
    req.flush(dummyRequests);
  });

  it('should approve a credit request', () => {
    const requestId = 1;
    const dummyResponse: CreditRequest = {
      id: requestId,
      amount: 5000,
      status: 'APPROVED',
      interestRate: 5,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      eligibilityStatus: 'ELIGIBLE',
    };

    service.approve(requestId, true).subscribe((response) => {
      expect(response.status).toBe('APPROVED');
    });

    const req = httpMock.expectOne(`/api/credit-requests/approve/${requestId}?approve=true`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('should reject a credit request', () => {
    const requestId = 2;
    const dummyResponse: CreditRequest = {
      id: requestId,
      amount: 7000,
      status: 'REJECTED',
      interestRate: 3.5,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      eligibilityStatus: 'NOT_ELIGIBLE',
    };

    service.approve(requestId, false).subscribe((response) => {
      expect(response.status).toBe('REJECTED');
    });

    const req = httpMock.expectOne(`/api/credit-requests/approve/${requestId}?approve=false`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });
});
