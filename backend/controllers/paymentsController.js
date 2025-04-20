import PaymentModel from "../models/Payment.js"

const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find()
       res.json({success:true ,data:payments})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
const getAllPaymentsBy = async (req, res) => {
    try {
        const { By ,id } = req.params

        const payments = await PaymentModel.find({
            [By] : id
        })
       res.json({success:true ,data:payments})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export {
    getAllPayments,
    getAllPaymentsBy
}