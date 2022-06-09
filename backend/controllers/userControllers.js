const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');


// desc: register New Users
// route: /api/users
// public
const registerUser = asyncHandler(async (req, res) => {
  const {firstName, lastName, email, password}=req.body

  //validation
  if(!firstName||!lastName||!email||!password){
     res.status(400)
     throw new Error('Please be sure to fill out all fields')
  }
  //checking is user already exist
  const existingUser = await User.findOne({email})
  if (existingUser) {
    res.status(400)
    throw new Error('User Already exists :(')
  }

  //hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  })
  if (user){
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,     
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// desc: login Users
// route: /api/users/login
// public
const loginUser = asyncHandler(async(req, res) => {
  const {email, password}=req.body
  if(!email||!password){
    res.status(400)
    throw new Error('Please be sure to fill out all fields')
 }
  //check user and passwords match
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,     
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid information')
  }
})
// desc: register New Users
// route: /api/users/me
// private
const getMe = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)
})





//generating json web token
const generateToken= (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '60d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}