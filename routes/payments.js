const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Payment = require("../model/payment")

// Create the payment
routes.post("/", async(req, res, next)=>{
    try{
const payment = new Payment({
    user : req.body.user,
    event : req.body.event,
    amount : req.body.amount,
    paymentMethod : req.body.paymentMethod,
    status : req.body.status,
    createdAt : req.body.createdAt,
})
await payment.save()
res.status(200).json({
    message: "Create the payment sucessfully"
})
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err
        })
    }
})

// Get all payment
routes.get("/", async(req, res, next)=>{
    try{
        const id = req.params.paymentId
        const docs = await Payment.find().populate("user event", 'name email title date')
        res.status(200).json({
            count: docs.length,
            payment: docs,
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err
        })
    }
})

// Get by Id
routes.get("/:paymentId", async(req, res, next)=>{
    try{
        const id = req.params.paymentId
const doc = await Payment.findById(id).populate("user event", 'name email title date')
if(doc){
    res.status(200).json({
        payment: doc,
    })
}else{
    res.status(404).json({
        message: "No valid entry found for this provide ID",
    })
}
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err
        })
    }
})

// Update the payment
routes.patch("/:paymentId", async(req, res, next)=>{
    try{
const id = req.params.paymentId;
await Payment.findByIdAndUpdate({_id: id},{
    $set:{
        user : req.body.user,
        event : req.body.event,
        amount : req.body.amount,
        paymentMethod : req.body.paymentMethod,
        status : req.body.status,
        createdAt : req.body.createdAt,
    }
})
res.status(200).json({
    message: "Payment updated"
})
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err
        })
    }
})

// Delete the payment
routes.delete("/:paymentId", async(req, res, next)=>{
    try{
const id = req.params.paymentId;
await Payment.deleteOne({_id: id})
res.status(200).json({
    message: "Payment deleted"
})
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err
        })
    }
})
module.exports = routes;