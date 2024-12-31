const mongoose = require("mongoose")
const reviewSchema = mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, req: 'Event', required: true},
    user:{type: mongoose.Schema.Types.ObjectId, req: 'User', required: true},
    rating: {type: Number, default: 3},
    comment: {type: String},
    createdAt: {type: Date, default: Date.now}
},{ timestamps: true })
module.exports = mongoose.model("Review", reviewSchema)