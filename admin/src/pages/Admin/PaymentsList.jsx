import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const PaymentsList = () => {
  const { payments, getAllPayments } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllPayments();
  }, []);

  const filteredPayments = payments?.filter((payment) =>
    payment._id.includes(searchQuery) ||
    payment.userId.includes(searchQuery) ||
    payment.appointmentId.includes(searchQuery) ||
    payment.transactionId.includes(searchQuery) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Payments</p>

      <input
        type="text"
        placeholder="Search by Payment ID, User ID, Appointment ID, or Status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full border px-4 py-2 rounded shadow-sm text-sm"
      />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1.5fr_1.5fr_1.5fr_3fr_2fr_2fr_2fr_2fr] py-3 px-6 border-b bg-[#F5F8FF] text-gray-600 uppercase text-xs">
          <p>#</p>
          <p>Payment ID</p>
          <p>User ID</p>
          <p>Appointment ID</p>
          <p>Amount</p>
          <p>Currency</p>
          <p>Method</p>
          <p>Transaction ID</p>
          <p>Status</p>
          <p>Initiated At</p>
          <p>Created At</p>
          <p>Updated At</p>
        </div>

        {filteredPayments?.map((payment, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1.5fr_1.5fr_1.5fr_3fr_2fr_2fr_2fr_2fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <p className="truncate">{payment._id}</p>
            <p className="truncate">{payment.userId}</p>
            <p className="truncate">{payment.appointmentId}</p>
            <p>₹{payment.amount}</p>
            <p>{payment.currency.toUpperCase()}</p>
            <p>{payment.paymentMethod}</p>
            <p className="truncate">{payment.transactionId}</p>
            <p className={`font-medium ${payment.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
              {payment.status}
            </p>
            <p className="max-sm:text-xs">{new Date(payment.initiatedAt).toLocaleString()}</p>
            <p className="max-sm:text-xs">{new Date(payment.createdAt).toLocaleString()}</p>
            <p className="max-sm:text-xs">{new Date(payment.updatedAt).toLocaleString()}</p>
          </div>
        ))}

        {filteredPayments?.length === 0 && (
          <div className="p-4 text-center text-gray-500">No payments found.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;
