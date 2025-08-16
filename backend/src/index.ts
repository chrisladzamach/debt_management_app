import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map(s => s.trim());

app.use(cors({ origin: allowedOrigins }));

// Estado en memoria para empezar (luego lo cambio a DB)
type Payment = { id: string; amount: number; date: string; description?: string };
type Debt = { id: string; name: string; initialAmount: number; remainingAmount: number; createdAt: string; payments: Payment[] };
const debts: Debt[] = [];

app.get("/debts", (_req, res) => res.json(debts));

app.post("/debts", (req, res) => {
  const { name, initialAmount } = req.body ?? {};
  if (!name || typeof initialAmount !== "number") {
    return res.status(400).json({ error: "name (string) e initialAmount (number) son requeridos" });
  }
  const id = String(Date.now());
  const debt: Debt = {
    id,
    name,
    initialAmount,
    remainingAmount: initialAmount,
    createdAt: new Date().toISOString(),
    payments: []
  };
  debts.unshift(debt);
  res.status(201).json(debt);
});

app.post("/debts/:id/payments", (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body ?? {};
  const debt = debts.find(d => d.id === id);
  if (!debt) return res.status(404).json({ error: "Deuda no encontrada" });
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "amount debe ser number > 0" });
  }

  const payment: Payment = {
    id: String(Date.now()),
    amount,
    date: new Date().toISOString(),
    description
  };

  debt.remainingAmount = Math.max(0, debt.remainingAmount - amount);
  debt.payments.unshift(payment);

  res.status(201).json({ ok: true, payment, remainingAmount: debt.remainingAmount });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));