const express = require("express");
const router = express.Router();
const {getLists, getList, createList, deleteList, updateList} = require('../controllers/listControllers')
const protect = require ('../middleware/authMiddleWare');

router.route('/').get(protect, getLists).post(protect, createList)
router.route('/:id').get(protect, getList).delete(protect, deleteList).put(protect, updateList)
module.exports = router