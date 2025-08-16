import { debtRepository } from "../repositories/debt.repository";
import { paymentRepository } from "../repositories/payment.repository";
import { CreateDebtDTO } from "../dtos/createDebt.dto";
import { CreatePaymentDTO } from "../dtos/createPayment.dto";

class DebtService {
  async getAll(userId: number) {
    return await debtRepository.findAllByUser(userId);
  }

  async createDebt(userId: number, data: CreateDebtDTO) {
    return await debtRepository.create(userId, data);
  }

  async addPayment(debtId: number, data: CreatePaymentDTO) {
    const debt = await debtRepository.findById(debtId);
    if (!debt) return null;

    const payment = await paymentRepository.create(debtId, data);
    const remaining = Math.max(0, Number(debt.remaining_amount) - data.amount);

    await debtRepository.updateRemainingAmount(debtId, remaining);

    return { payment, remainingAmount: remaining };
  }
}

export const debtService = new DebtService();
