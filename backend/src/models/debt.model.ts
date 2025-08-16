import { Payment } from "./payment.model";

export interface Debt {
  id: string;
  name: string;
  initialAmount: number;
  remainingAmount: number;
  createdAt: string;
  payments: Payment[];
}
