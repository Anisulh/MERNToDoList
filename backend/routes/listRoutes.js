const express = require("express");
const router = express.Router();
const {getLists, createList} = require('../controllers/listControllers')
const protect = require ('../middleware/authMiddleWare');

router.route('/').get(protect, getLists).post(protect, createList)

module.exports = router