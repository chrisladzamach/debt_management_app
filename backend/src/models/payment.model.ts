export interface Payment {
  id: number;
  debt_id: number;
  amount: number;
  date: string;
  description?: string | null;
}
