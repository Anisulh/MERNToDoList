const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const List = require('../models/listModel')

// desc: get user list
// route: GET /api/list
// private
const getLists = asyncHandler(async(req, res) => {
  //getting user using the id in JWT
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  const lists =  await List.find({user: req.user.id})
  res.status(200).json(lists)
})
// desc: create user list
// route: POST  /api/list
// private
const createList = asyncHandler(async(req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }


  const list = await List.create({
    list: req.user.id,
    name,
    items: req.body.items,
    listAdmin: req.body.listAdmin

  })
  res.status(201).json(list)
})

module.exports ={
  getLists,
  createList
}