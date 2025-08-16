import { Router } from "express";
import { debtController } from "../controllers/debt.controller";

const router = Router();

router.get("/", (req, res) => debtController.getAll(req, res));
router.post("/", (req, res) => debtController.createDebt(req, res));
router.post("/:id/payments", (req, res) => debtController.addPayment(req, res));

export default router;
