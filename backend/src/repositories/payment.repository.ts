import { pool } from "../config/db";
import { Payment } from "../models/payment.model";
import { CreatePaymentDTO } from "../dtos/createPayment.dto";

class PaymentRepository {
  async create(debtId: number, data: CreatePaymentDTO): Promise<Payment> {
    const [result] = await pool.query(
      "INSERT INTO payments (debt_id, amount, date, description) VALUES (?, ?, CURDATE(), ?)",
      [debtId, data.amount, data.description ?? null]
    );
    const insertId = (result as any).insertId;
    return { id: insertId, debt_id: debtId, ...data, date: new Date().toISOString().split("T")[0] };
  }

  async findByDebt(debtId: number): Promise<Payment[]> {
    const [rows] = await pool.query("SELECT * FROM payments WHERE debt_id = ?", [debtId]);
    return rows as Payment[];
  }
}

export const paymentRepository = new PaymentRepository();
