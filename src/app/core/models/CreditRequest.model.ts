export interface CreditRequest {
    id?: number;
    amount: number;
    interestRate: number;
    startDate: Date;
    endDate: Date;
    status: string;
    userId?: number;
    eligibilityStatus: string;
    message?: string;
}
