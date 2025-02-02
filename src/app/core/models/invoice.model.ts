export interface Invoice {
  id?: number;
  description: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  dueDate: Date;
  issueDate: Date;
  userId?: number;
}
