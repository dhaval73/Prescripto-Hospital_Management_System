import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [showDetailsFor, setShowDetailsFor] = useState(null)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: { token }
            })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchPaymentDetails = async (appointmentId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/payments/appointmentId/${appointmentId}`, {
                headers: { token }
            })
            setPaymentDetails(data.data) // Adjust based on actual API response
            setShowDetailsFor(appointmentId)
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch payment details")
        }
    }
    
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
                headers: { token }
            })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, {
                        headers: { token }
                    })
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    // const appointmentRazorpay = async (appointmentId) => {
    //     try {
    //         const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, {
    //             headers: { token }
    //         })
    //         if (data.success) {
    //             initPay(data.order)
    //         } else {
    //             toast.error(data.message)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }
    // }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-stripe`, { appointmentId }, {
                headers: { token }
            })
            if (data.success) {
                window.location.replace(data.session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">My Appointments</h2>
            <div className="space-y-6">
                {appointments.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-5 border flex flex-col sm:flex-row sm:items-start gap-6">
                        <img className="w-32 h-32 object-cover rounded-lg bg-gray-100" src={item.docData.image} alt="" />
                        <div className="flex-1 text-sm text-gray-700 space-y-1">
                            <p className="text-lg font-semibold text-gray-900">{item.docData.name}</p>
                            <p className="text-sm text-gray-500">{item.docData.speciality}</p>
                            <p className="mt-2 font-medium text-gray-700">Address:</p>
                            <p>{item.docData.address.line1}</p>
                            <p>{item.docData.address.line2}</p>
                            <p className="mt-2"><span className="font-medium text-gray-700">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>

                        <div className="flex flex-col gap-2 sm:min-w-[160px] text-sm">
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button
                                    onClick={() => setPayment(item._id)}
                                    className="border border-primary text-primary py-2 px-4 rounded hover:bg-primary hover:text-white transition"
                                >
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <>
                                    <button
                                        onClick={() => appointmentStripe(item._id)}
                                        className="border py-2 px-4 rounded hover:bg-gray-50 flex justify-center items-center"
                                    >
                                        <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                                    </button>
                                    {/* <button
                                        onClick={() => appointmentRazorpay(item._id)}
                                        className="border py-2 px-4 rounded hover:bg-gray-50 flex justify-center items-center"
                                    >
                                        <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                                    </button> */}
                                </>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <span className="py-2 px-4 rounded bg-blue-100 text-blue-600 text-center">Paid</span>
                            )}
                            {item.isCompleted && (
                                <span className="py-2 px-4 rounded border border-green-500 text-green-600 text-center">Completed</span>
                            )}
                            {!item.cancelled && !item.isCompleted && (
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className="border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition"
                                >
                                    Cancel Appointment
                                </button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <span className="py-2 px-4 rounded border border-red-500 text-red-500 text-center">Appointment Cancelled</span>
                            )}
                            {item.payment && (
                                <button
                                    onClick={() => fetchPaymentDetails(item._id)}
                                    className="border border-indigo-500 text-indigo-500 py-2 px-4 rounded hover:bg-indigo-500 hover:text-white transition"
                                >
                                    Payment Details
                                </button>
                            )}
                          {showDetailsFor === item._id && paymentDetails && (
    <div className="bg-gray-50 border rounded-lg p-4 text-sm mt-2 space-y-1">
        <p><strong>Payment ID:</strong> {paymentDetails._id}</p>
        <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
        <p><strong>Method:</strong> {paymentDetails.paymentMethod}</p>
        <p><strong>Status:</strong> {paymentDetails.status}</p>
        <p><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
        <p><strong>Timestamp:</strong> {new Date(paymentDetails.initiatedAt).toLocaleString()}</p>
    </div>
)}




                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
