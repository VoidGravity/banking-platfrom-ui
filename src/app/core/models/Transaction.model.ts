export interface Transaction {
  id?: number;
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
  transactionFee: number;
  type: 'CLASSIC' | 'INSTANT' | 'SCHEDULED';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
