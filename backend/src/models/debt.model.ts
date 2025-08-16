// src/models/debt.model.ts
export interface Debt {
  id: number;
  user_id: number;
  name: string;
  initial_amount: number;
  remaining_amount: number;
  created_at: string;
}
