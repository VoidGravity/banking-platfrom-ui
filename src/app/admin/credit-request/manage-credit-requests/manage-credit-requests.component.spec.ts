import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCreditRequestsComponent } from './manage-credit-requests.component';
import { CreditRequestService } from '../../../core/services/credit-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CreditRequest } from '../../../core/models/CreditRequest.model';

describe('ManageCreditRequestsComponent', () => {
  let component: ManageCreditRequestsComponent;
  let fixture: ComponentFixture<ManageCreditRequestsComponent>;
  let creditRequestService: jasmine.SpyObj<CreditRequestService>;

  beforeEach(async () => {
    const mockCreditRequestService = jasmine.createSpyObj('CreditRequestService', [
      'getAll',
      'approve',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ManageCreditRequestsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: CreditRequestService, useValue: mockCreditRequestService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageCreditRequestsComponent);
    component = fixture.componentInstance;
    creditRequestService = TestBed.inject(CreditRequestService) as jasmine.SpyObj<CreditRequestService>;
  });

  it('should load credit requests on init', () => {
    const mockRequests: CreditRequest[] = [
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

    creditRequestService.getAll.and.returnValue(of(mockRequests));

    component.ngOnInit();

    expect(component.creditRequests).toEqual(mockRequests);
    expect(creditRequestService.getAll).toHaveBeenCalled();
  });

  it('should approve a credit request', () => {
    const mockRequest: CreditRequest = {
      id: 1,
      amount: 5000,
      status: 'APPROVED',
      interestRate: 5,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      eligibilityStatus: 'ELIGIBLE',
    };

    creditRequestService.approve.and.returnValue(of(mockRequest));
    spyOn(component, 'fetchCreditRequests');

    component.approveTransaction(mockRequest.id!);

    expect(creditRequestService.approve).toHaveBeenCalledWith(mockRequest.id!, true);
    expect(component.fetchCreditRequests).toHaveBeenCalled();
  });

  it('should reject a credit request', () => {
    const mockRequest: CreditRequest = {
      id: 2,
      amount: 7000,
      status: 'REJECTED',
      interestRate: 3.5,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      eligibilityStatus: 'NOT_ELIGIBLE',
    };

    creditRequestService.approve.and.returnValue(of(mockRequest));
    spyOn(component, 'fetchCreditRequests');

    component.rejectTransaction(mockRequest.id!);

    expect(creditRequestService.approve).toHaveBeenCalledWith(mockRequest.id!, false);
    expect(component.fetchCreditRequests).toHaveBeenCalled();
  });
});
