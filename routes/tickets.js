const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Ticket = require("../model/ticket");
const ticket = require("../model/ticket");

// Create the ticket
routes.post("/", async(req, res, next)=>{
    try{
const ticket = new Ticket({
    event: req.body.event,
    user: req.body.user,
    ticketType: req.body.ticketType,
    price: req.body.price,
    status: req.body.status,
    issuedAt: req.body.issuedAt
})
await ticket.save()
res.status(201).json({
message: "Create ticket sucessfully"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Get all ticket
routes.get("/",async(req, res, next)=>{
    try{
const docs = await Ticket.find().populate("event user", 'title time name email')
res.status(200).json({
    count: docs.length,
    ticket: docs,
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Get by Id
routes.get("/:ticketId", async (req, res, next)=>{
    try{
const id = req.params.ticketId;
const doc = await Ticket.findById(id).populate("event user", 'title time name email')
if(doc){
    res.status(200).json({
        ticket: doc,
    })
}else{
    res.status(404).json({
        message: "No valod entry found for this provide ID"
    })
}
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Update ticket
routes.patch("/:ticketId", async(req, res, next)=>{
    try{
const id = req.params.ticketId;
await Ticket.findByIdAndUpdate({_id: id},{
    $set:{
        event: req.body.event,
    user: req.body.user,
    ticketType: req.body.ticketType,
    price: req.body.price,
    status: req.body.status,
    issuedAt: req.body.issuedAt
    }
})
res.status(201).json({
    message: "Ticket updated"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Delete ticket
routes.delete("/:ticketId", async(req, res, next)=>{
    try{
const id = req.params.ticketId;
await Ticket.deleteOne({_id: id});
res.status(200).json({
    message: "Ticket deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
module.exports = routes;