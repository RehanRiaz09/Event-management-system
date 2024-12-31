const mongoose = require("mongoose")
const ticketSchema = mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    ticketType: {type: String, enum:["VIP", "General Admission"], default: "General Admission"},
    price: {type: Number, required: true},
    status: {type: String, enum : ["active", "used", "cancelled"], default: "active"},
    issuedAt: {type: Date, default: Date.now}
},{ timestamps: true })
module.exports = mongoose.model("Ticket", ticketSchema)