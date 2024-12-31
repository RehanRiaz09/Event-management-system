const mongoose = require("mongoose")
const eventSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, enum: ["Day", "Night"], default: "Night" },
    location: {type: String, required: true},
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    capacity: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
}, { timestamps: true })
module.exports = mongoose.model("Event", eventSchema)