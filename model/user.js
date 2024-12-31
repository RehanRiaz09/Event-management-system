const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum:["organizer", "attendee", "admin"], default: "attendee"},
    profilePicture: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
},{ timestamps: true })
module.exports = mongoose.model("User", userSchema)