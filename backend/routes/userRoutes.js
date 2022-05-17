const express = require('express')
const router = express.Router()
const {loginUser, registerUser, getMe} = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleWare')

router.post('/', registerUser)

router.post('/login', loginUser)
router.get('/me', protect, getMe )

module.exports= router