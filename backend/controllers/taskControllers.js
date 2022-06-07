const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const List = require('../models/listModel');
const Task = require('../models/taskModel');

// desc: get user lists
// route: GET /api/lists:id
// private
const getTasks = asyncHandler(async(req, res) => {
  //getting user using the id in JWT
  const list = await List.findById(req.params.id)
  if(!list){
    res.status(401)
    throw new Error('List not found')
  }

  const tasks =  await Task.find({user: req.user.id})
  res.status(200).json(tasks)
})



// desc: create user list
// route: POST  /api/list
// private
const createTask = asyncHandler(async(req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Please add a task')
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }


  const task = await Task.create({
    listTitle: req.params.id,
    name,
    date,
    completed: false

  })
  res.status(201).json(task)
})

// desc: delete  user list
// route: DELETE /api/lists/:id
// private
const deleteTask = asyncHandler(async(req, res) => {
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
  await task.remove()
  res.status(200).json({success : true})
})
// desc: update user list
// route: PUT /api/lists/:id
// private
const updateTask = asyncHandler(async(req, res) => {
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

  const updatedTask = await List.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {new:true}
    )
  res.status(200).json(updatedTask)
})

module.exports ={
  getTasks,
  createTask,
  deleteTask,
  updateTask
}