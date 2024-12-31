const mongoose = require("mongoose")
const attendeeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    event: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
    status: {type: String, enum: ["registered", "checked-in", "cancelled"], default: "registered"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, { timestamps: true })
module.exports = mongoose.model("Attendee", attendeeSchema)