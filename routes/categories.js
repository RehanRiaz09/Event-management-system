const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Category = require("../model/category");
const category = require("../model/category");

//Create the category
routes.post("/", async (req, res, next)=>{
    try{
const category = new Category({
    name: req.body.name,
    description: req.body.description,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
})
await category.save()
res.status(201).json({
    message: "Create category sucessfully" 
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Get all category
routes.get("/", async(req, res, next)=>{
    try{
const docs = await Category.find()
res.status(200).json({
    count : docs.length,
    category: docs,
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Get By Id
routes.get("/:categoryId", async(req, res, next)=>{
    try{
const id = req.params.categoryId;
const doc = await Category.findById(id)
console.log(doc);
if(doc){
    res.status(200).json({
        category:doc,
    })
}else{
    res.status(404).json({
        message: "No valid entry found for this provide ID",
    })
}
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Update the category
routes.patch("/:categoryId", async (req, res, next)=>{
    try{
const id = req.params.categoryId
await Category.findByIdAndUpdate({_id: id}, {
    $set:{
        name: req.body.name,
    description: req.body.description,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    }
})
res.status(201).json({
    message: "Category updated"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Delete category
routes.delete("/:category", async(req, res, next)=>{
    try{
const id = req.params.categoryId;
await Category.deleteOne({_id: id})
res.status(200).json({
    message: "Cateory deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
module.exports = routes;