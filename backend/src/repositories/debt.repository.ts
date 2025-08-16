import { pool } from "../config/db";
import { Debt } from "../models/debt.model";
import { CreateDebtDTO } from "../dtos/createDebt.dto";

class DebtRepository {
  async findAllByUser(userId: number): Promise<Debt[]> {
    const [rows] = await pool.query("SELECT * FROM debts WHERE user_id = ?", [userId]);
    return rows as Debt[];
  }

  async findById(id: number): Promise<Debt | null> {
    const [rows] = await pool.query("SELECT * FROM debts WHERE id = ?", [id]);
    const results = rows as Debt[];
    return results.length ? results[0] : null;
  }

  async create(userId: number, data: CreateDebtDTO): Promise<Debt> {
    const [result] = await pool.query(
      "INSERT INTO debts (user_id, name, initial_amount, remaining_amount, created_at) VALUES (?, ?, ?, ?, CURDATE())",
      [userId, data.name, data.initialAmount, data.initialAmount]
    );
    const insertId = (result as any).insertId;
    return this.findById(insertId) as Promise<Debt>;
  }

  async updateRemainingAmount(debtId: number, remaining: number): Promise<void> {
    await pool.query("UPDATE debts SET remaining_amount = ? WHERE id = ?", [remaining, debtId]);
  }
}

export const debtRepository = new DebtRepository();
