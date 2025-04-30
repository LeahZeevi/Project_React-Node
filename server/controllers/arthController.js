// const User=require("../models/users")
//  const bcrypt=require("bcrypt")
 
 
//  const login=async(req,res)=>{
//  const {userName,password}=req.body
//  if(!userName||!password){
//      return res.status(400).json({message:"userName or password is not complete"})
//  }
//  const foundUser=await User.findOne({userName}).lean()
//  if(!foundUser)
//      return res.status(401).json({message:"Unauthhorized"})
 
//  const match=await bcrypt.compare(password,foundUser.password)
//  if(!match)
//      return res.status(401).json({message:"Unauthhorized"})
//  res.send("Logged In")
//  }
 
 
 
//  const register=async(req,res)=>{
     
//  }