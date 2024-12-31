const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Review = require("../model/review");


// Create the review
routes.post("/", async(req, res, next)=>{
    try{
const review = new Review({
    event: req.body.event,
    user: req.body.user,
    rating: req.body.rating,
    comment: req.body.comment,
    createdAt: req.body.createdAt,
})
await review.save()
res.status(201).json({
    message: "Create review sucessfully"
})
    }catch(err){
        console.log(err);
        res.status(201).json({
            error: err
        })
    }
})

// Get all reviews
routes.get("/", async(req, res, next)=>{
    try{
const docs = await Review.find().populate("event user", "title time name email")
res.status(200).json({
    count: docs.length,
    review: docs,
})
    }catch(err){
        console.log(err);
        res.status(201).json({
            error: err
        })
    }
})

// Get by Id
routes.get("/:reviewId", async(req, res, next)=>{
    try{
    const id = req.params.reviewId;
    const doc = await Review.findById(id).populate("event user", 'title date name email')
    if(doc){
        res.status(200).json({
            review: doc,
        })
    }else{
res.status(404).json({
    message: "No valid entry found for this provide ID",
})
    }
    }catch(err){
        console.log(err);
        res.status(201).json({
            error: err
        })
    }
})

// Update the review
routes.patch("/:reviewId", async(req, res, next)=>{
    try{
        const id = req.params.reviewId;
await Review.findByIdAndUpdate({_id: id}, {
    $set:{
        event: req.body.event,
        user: req.body.user,
        rating: req.body.rating,
        comment: req.body.comment,
        createdAt: req.body.createdAt,   
    }
})
res.status(201).json({
    message: "Review updated"
})
    }catch(err){
        console.log(err);
        res.status(201).json({
            error: err
        })
    }
})

//delete the review

routes.delete("/:reviewId", async(req, res, next)=>{
try{
    const id = req.params.reviewId;
await Review.deleteOne({_id: id});
res.status(200).json({
    message: "Review deleted"
})
}catch(err){
    console.log(err);
    res.status(201).json({
        error: err
    })
}
})
module.exports = routes;