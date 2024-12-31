const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Event = require("../model/event")

//create the event
routes.post("/", async(req, res, next)=>{
    try{
        const {date ,time} = req.body;
        const timedateExists =await Event.findOne({date, time})
        if(timedateExists){
return res.status(404).json({
    message: "Date or time is not avaiable"
})
        }
const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    organizer: req.body.organizer,
    capacity: req.body.capacity,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
})
await event.save()
res.status(201).json({
    message: "Event created sucessfullu"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
 // Get all event
 routes.get("/", async(req, res, next)=>{
    try{
const docs = await Event.find().populate("organizer", 'name email')
res.status(200).json({
    count: docs.length,
    event: docs,
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
 })

 //Get by id
 routes.get("/:eventId", async(req, res, next)=>{
    try{
const id = req.params.eventId;
const doc = await Event.findById(id).populate("organizer", 'name email')
console.log(doc);
if(doc){
    res.status(200).json({
        event: doc,
    })
}else{
    res.status(404).json({
        message: "No valid entry found for this provide ID"
    })
}
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
 })

 //Update the event
routes.patch("/:eventId", async(req, res, next)=>{
    try{
const id = req.params.eventId;
await Event.findByIdAndUpdate({_id: id},{
    $set:{
        title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    organizer: req.body.organizer,
    capacity: req.body.capacity,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    }
})
res.status(200).json({
    message: "Event Updated"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Delete the event
routes.delete("/:eventId", async(req, res, next)=>{
    try{
const id = req. params.eventId;
await Event.deleteOne({_id: id})
res.status(200).json({
    message: "Event deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
module.exports = routes;