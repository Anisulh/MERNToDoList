const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 8000
const errorHandler = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db');



//connecting to db
connectDB()

const app = express()

//allows you to get data from the body
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the todo list API'})
})

//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/list', require('./routes/listRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server has started on ${PORT}`))