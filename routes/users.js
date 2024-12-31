const express =  require("express")
const routes = express.Router();
const mongoose = require("mongoose")
// const multer = require ("multer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require ("path")
const User = require("../model/user")

// signup the user 
routes.post("/signup", async (req, res, next)=>{
    try{
const {name, email, password} = req.body;
if(!name || !email || !password){
    return res.status(400).json({
        message: "Name and email and password are required"
    })
}
const userExists =await User.findOne({email})
if(userExists){
    return res.status(400).json({
        message: "User already exists with  this email",
    })  
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt)
const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    profilePicture: req.body.profilePicture,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
})
await user.save();
res.status(200).json({
    message: "User created sucessfully"
})
    }catch(err){
    console.log(err);
    res.status(500).json({
        error: err
    })
}
});

// login the user
routes.post("/login", async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Email and PAssword are required"
        })
    }try{
const user = await User.findOne({email})
if(!user){
return res.status(404).json({
    message: "User not found"
});
}
const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
    return res.status(404).json({
        message: "Invalid email or Password"
    })
}
const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret', // Replace with your JWT secret
    { expiresIn: '1h' }
);
res.status(200).json({
    message: "Login sucessfully",
    token,
})
    }catch(err){
    console.log(err);
    res.status(500).json({
        error: err
    })
}
})

// get all user
routes.get("/", async (req, res, next)=>{
    try{
const docs = await User.find().select()
res.status(200).json({
    count: docs.length,
    User: docs,
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Get user by Id
routes.get("/:userId", async(req, res, next)=>{
    try{
const id = req.params.userId;
const doc = await User.findById(id).select()
console.log(doc);
if(doc){
    res.status(404).json({
        user: doc,
    })
}else{
    res.status(200).json({
        message: "No invalid entery found for this provide ID"
    })
}
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// Update the user

routes.patch("/:userId", async (req, res, next)=>{
    const id = req.params.userId;
  const {name, email, password} = req.body;
  try{
const user = await User.findById(id)
if(!user){
    return res.status(404).json({
        success: false,
        message: "User not found"
    })
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
await User.findByIdAndUpdate({_id: id}, {
    $set:{
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        profilePicture: req.body.profilePicture,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    }
})
res.status(200).json({
    message: "Update user"
})
  } catch(err){
    console.log(err);
    res.status(500).json({
        error: err
    })
}
})
 
// Delete the user
routes.delete("/:userId", async(req, res, next)=>{
    try{
const id = req.params.userId;
await User.deleteOne({_id: id})
res.status(200).json({
    message: "User deleted"
})
    }catch(err){
    console.log(err);
    res.status(500).json({
        error: err
    })
}
})
module.exports = routes;