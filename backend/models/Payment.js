import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true }, // Linking Appointment
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentMethod: { type: String, required: true, enum: ["card", "netbanking", "upi", "paypal"] },
    transactionId: { type: String, unique: true, sparse: true }, // Only required when completed
    refundId: { type: String, unique: true, sparse: true }, // Store refund transaction ID if applicable
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
    initiatedAt: { type: Date, default: Date.now }, // Track payment initiation
  },
  { timestamps: true }
);

// module.exports = mongoose.model("", paymentSchema);
const PaymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default PaymentModel;