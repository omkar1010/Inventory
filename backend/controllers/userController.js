
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler ( async (req,res) => {
 
    const {name , email, password} = req.body

    // validation

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please fill in all required fields")
    }

    if(password.lenght < 6 ){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }

    // check if user email already exist
    const userExists = await User.findOne({email})


    if(userExists){
        res.status(400)
        throw new Error("Email has already been used registered ")
    }

  

  

  // Create new User 
  const user = await User.create({
    name,
    email,
    password
  })

  if (user){

const { _id , name , email , photo , phone, bio} = user

    res.status(201).json({
        _id , name , email , photo , phone, bio

    })
  } else {
    res.status (400)
    throw new Error("Invalid user data")
  }

});

module.exports = {
    registerUser,
}