import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyPayments = () => {
    const { loadUserPayments, payments, userData } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (userData) {
            loadUserPayments(userData._id);
        }
    }, [userData, loadUserPayments]);

    const filteredPayments = payments.filter(payment =>
        payment._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full max-w-6xl m-5 mt-32 h-screen">
            <p className="mb-3 text-lg font-medium">User Payments</p>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search payments by ID, method, or status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_2fr_2fr_1fr_5fr] py-3 px-6 border-b bg-[#F5F8FF] text-gray-600 uppercase text-xs">
                    <p>#</p>
                    <p>Payment ID</p>
                    <p>Amount</p>
                    <p>Payment Method</p>
                    <p>Status</p>
                    <p>Initiated At</p>
                </div>

                {filteredPayments.map((payment, index) => (
                    <div
                        key={payment._id}
                        className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_2fr_1fr_5fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <p className="sm:truncate">{payment._id}</p>
                        <p>₹{payment.amount} {payment.currency.toUpperCase()}</p>
                        <p>{payment.paymentMethod}</p>
                        <p>{payment.status}</p>
                        <p className="sm:truncate">{new Date(payment.initiatedAt).toLocaleString()}</p>
                    </div>
                ))}

                {filteredPayments.length === 0 && (
                    <div className="text-center text-gray-400 py-6">No payments found</div>
                )}
            </div>
        </div>
    );
};

export default MyPayments;
