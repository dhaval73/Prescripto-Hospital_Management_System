import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaEye } from "react-icons/fa"; // Import eye icon

import { Link } from "react-router-dom"; // For navigation

const PaymentsList = () => {
  const { payments, getAllPayments } = useContext(AdminContext);

  useEffect(() => {
    getAllPayments();
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Payments</h2>
      {payments?.length > 0 ? (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Payment ID</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Appointment ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Currency</th>
              <th className="p-2">Method</th>
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Initiated At</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Updated At</th>
              <th className="p-2">Action</th> {/* Added action column */}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{payment._id}</td>
                <td className="p-2">{payment.userId}</td>
                <td className="p-2">{payment.appointmentId}</td>
                <td className="p-2">₹{payment.amount}</td>
                <td className="p-2">{payment.currency.toUpperCase()}</td>
                <td className="p-2">{payment.paymentMethod}</td>
                <td className="p-2 truncate max-w-[200px]">{payment.transactionId}</td>
                <td className={`p-2 ${payment.status === 'completed' ? 'text-green-600 font-medium' : 'text-red-600'}`}>
                  {payment.status}
                </td>
                <td className="p-2">{new Date(payment.initiatedAt).toLocaleString()}</td>
                <td className="p-2">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="p-2">{new Date(payment.updatedAt).toLocaleString()}</td>
                <td className="p-2">
                  {/* Eye icon that links to the payment details page */}
                  <Link to={`/admin/payments/${payment._id}`} className="text-blue-600">
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default PaymentsList;
