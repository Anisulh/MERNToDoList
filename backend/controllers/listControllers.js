const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const List = require('../models/listModel')

// desc: get user lists
// route: GET /api/lists
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

// desc: get single user list
// route: GET /api/lists/:id
// private
const getList = asyncHandler(async(req, res) => {
  //getting user using the id in JWT
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  const list =  await List.findById(req.params.id)
  if (!list) {
    res.status(404)
    throw new Error ('List not found')
  }

  if(list.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Not authorized')
  }
  res.status(200).json(list)
})


// desc: create user list
// route: POST  /api/lists
// private
const createList = asyncHandler(async(req, res) => {
  

  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a list')
  }


  const list = await List.create({
    user: req.user.id,
    name: req.body.name,
    tasks: req.body.tasks,
    listAdmin: true
  })
  res.status(201).json(list)
})

// desc: delete  user list
// route: DELETE /api/lists/:id
// private
const deleteList = asyncHandler(async(req, res) => {
  //getting user using the id in JWT
  
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  const list =  await List.findById(req.params.id)
  if (!list) {
    res.status(404)
    throw new Error ('List not found')
  }

  if(list.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Not authorized')
  }
  await list.remove()
  res.status(200).json({id: req.params.id})
})
// desc: update user list
// route: PUT /api/lists/:id
// private
const updateList = asyncHandler(async(req, res) => {
  //getting user using the id in JWT
  
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  const list =  await List.findById(req.params.id)
  if (!list) {
    res.status(404)
    throw new Error ('List not found')
  }

  if(list.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Not authorized')
  }

  const updatedList = await List.findByIdAndUpdate(list, req.body, {
    new:true
  })
  res.status(200).json(updatedList)
})

module.exports ={
  getLists,
  getList,
  createList,
  deleteList,
  updateList
}