import express from 'express';
import { getAllPayments, getAllPaymentsBy } from '../controllers/paymentsController.js';

const paymentRouter = express.Router();

paymentRouter.get("/get-all", getAllPayments)
paymentRouter.get("/:By/:id", getAllPaymentsBy)


export default paymentRouter;