const mongoose = require("mongoose")
const paymentSchema = mongoose.Schema({
user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
amount: {type: Number, required: true},
paymentMethod: {type: String, enum: ["credit card", "Online", "Cash"], default: "Cash"},
status: {type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending"},
createdAt: {type: Date, default: Date.now}
}, { timestamps: true })
module.exports = mongoose.model("Payment", paymentSchema)