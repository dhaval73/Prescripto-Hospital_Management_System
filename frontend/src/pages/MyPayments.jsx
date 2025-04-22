import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyPayments = () => {
    const { loadUserPayments, payments, userData } = useContext(AppContext);

    useEffect(() => {
        if (userData) {
            loadUserPayments(userData._id);  // Fetch payments for the user when userData is available
        }
    }, [userData, loadUserPayments]);

    return (
        <div className="w-full max-w-6xl m-5 mt-32 h-screen">
            <p className="mb-3 text-lg font-medium">User Payments</p>

            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
                {/* Header row for larger screens */}
                <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1.5fr_3fr] py-3 px-6 border-b bg-[#F5F8FF] text-gray-600 uppercase text-xs">
                    <p>#</p>
                    <p>Payment ID</p>
                    <p>Amount</p>
                    <p>Payment Method</p>
                    <p>Status</p>
                    <p>Initiated At</p>
                </div>

                {/* Data rows */}
                {payments?.map((payment, index) => (
                    <div
                        key={payment._id}
                        className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1.5fr_3fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <p>{payment._id}</p>
                        <p>{payment.amount} {payment.currency.toUpperCase()}</p>
                        <p>{payment.paymentMethod}</p>
                        <p>{payment.status}</p>
                        <p className="sm:truncate">{new Date(payment.initiatedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPayments;
