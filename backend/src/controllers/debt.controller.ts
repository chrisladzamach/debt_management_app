import { Request, Response } from "express";
import { debtService } from "../services/debt.service";

class DebtController {
  async getAll(req: Request, res: Response) {
    const userId = Number(req.query.userId);
    if (!userId) return res.status(400).json({ error: "userId requerido" });
    const debts = await debtService.getAll(userId);
    return res.json(debts);
  }

  async createDebt(req: Request, res: Response) {
    const userId = Number(req.body.userId);
    const { name, initialAmount } = req.body;
    if (!userId || !name || typeof initialAmount !== "number") {
      return res.status(400).json({ error: "userId, name e initialAmount requeridos" });
    }
    const debt = await debtService.createDebt(userId, { name, initialAmount });
    return res.status(201).json(debt);
  }

  async addPayment(req: Request, res: Response) {
    const debtId = Number(req.params.id);
    const { amount, description } = req.body;
    if (!debtId || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "id deuda y amount > 0 requeridos" });
    }
    const result = await debtService.addPayment(debtId, { amount, description });
    if (!result) return res.status(404).json({ error: "Deuda no encontrada" });
    return res.status(201).json(result);
  }
}

export const debtController = new DebtController();
