import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting route params
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import left arrow icon for navigation back

const PaymentDetails = () => {
  const { paymentId } = useParams(); // Get paymentId from URL
  const { payments } = useContext(AdminContext);
  
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Find the payment from the payments array
    const selectedPayment = payments.find(payment => payment._id === paymentId);
    if (selectedPayment) {
      setPaymentData(selectedPayment);
    }
  }, [paymentId, payments]);

  if (!paymentData) {
    return <p>Loading payment details...</p>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <a href="/admin/payments" className="text-blue-600">
          <FaArrowLeft /> Back to Payments List
        </a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <div className="space-y-4">
        <p><strong>Payment ID:</strong> {paymentData._id}</p>
        <p><strong>User ID:</strong> {paymentData.userId}</p>
        <p><strong>Appointment ID:</strong> {paymentData.appointmentId}</p>
        <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
        <p><strong>Currency:</strong> {paymentData.currency.toUpperCase()}</p>
        <p><strong>Payment Method:</strong> {paymentData.paymentMethod}</p>
        <p><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
        <p><strong>Status:</strong> {paymentData.status}</p>
        <p><strong>Initiated At:</strong> {new Date(paymentData.initiatedAt).toLocaleString()}</p>
        <p><strong>Created At:</strong> {new Date(paymentData.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(paymentData.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PaymentDetails;
