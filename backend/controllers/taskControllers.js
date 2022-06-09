const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Task = require('../models/taskModel');

// desc: get tasks
// route: GET /api/tasks
// private
const getTasks = asyncHandler(async(req, res) => {

  const tasks =  await Task.find({user: req.user.id})
  res.status(200).json(tasks)
})

// desc: add tasks
// route: POST  /api/list
// private
const addTask = asyncHandler(async(req, res) => {

  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a task')
  }

  const task = await Task.create({
    
    user: req.user.id,
    name: req.body.name,
    date: req.body.date,
    completed: false

  })
  res.status(201).json(task)
})

// desc: delete  task
// route: DELETE /api/task/:id
// private
const deleteTask = asyncHandler(async(req, res) => {
 
  const task = await Task.findById(req.params.id)
  if(!task){
    res.status(401)
    throw new Error('Task not found')
  }

  
  if (!req.user) {
    res.status(404)
    throw new Error ('User not found')
  }

  if(task.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Not authorized')
  }
  await task.remove()
  res.status(200).json({id: req.params.id})
})
// desc: update user list
// route: PUT /api/tasks/:id
// private
const updateTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedTask = await Task.findByIdAndUpdate(task, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

module.exports ={
  getTasks,
  addTask,
  deleteTask,
  updateTask
}