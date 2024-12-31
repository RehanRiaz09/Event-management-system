const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Attendee = require("../model/attendee");
const attendee = require("../model/attendee");

// Create the attendee
routes.post("/", async (req, res, next)=>{
    try{
const attendee = new Attendee({
    user: req.body.user,
    event: req.body.event,
    status: req.body.status,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
})
await attendee.save()
res.status(201).json({
    message: "Create attendee sucessfully"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

//Get all the attendee
routes.get("/", async(req, res, next)=>{
try{
const docs = await Attendee.find().populate("user event", 'name email title time')
res.status(200).json({
    count: docs.length,
    attendee: docs,
})
}catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

// Get by id
routes.get("/:attendeeId", async(req, res, next)=>{
    try{
const id = req.params.attendeeId;
const doc = await Attendee.findById(id).populate("user event", 'name email title time')
if(doc){
    res.status(200).json({
        attendee: doc,
    })
}else{
    res.status(404).json({
        message: "No valod entry found for this provide ID"
    })
}
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

// Update the attendee
routes.patch("/:attendeeId", async(req, res, next)=>{
    try{
const id = req.params.attendeeId;
await Attendee.findByIdAndUpdate({_id: id}, {
    $set:{
        user: req.body.user,
    event: req.body.event,
    status: req.body.status,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    }
})
res.status(201).json({
    message: "Update attendee"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

// delete the attendee
routes.delete("/:addendeeId", async (req, res,next)=>{
    try{
const id = req.params.addendeeId;
await Attendee.deleteOne({_id: id})
res.status(200).json({
    message: "Attendee deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})
module.exports = routes;