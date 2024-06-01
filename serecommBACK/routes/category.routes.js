const express = require('express');
const router = express.Router();
// internal
const categoryController = require('../controller/category.controller');

// Upload Video with Multer
const uploadFile = require("../middleware/multer/multerImageConfig.js");

// get
router.get('/get/:id', categoryController.getSingleCategory);
// add
router.post('/add', uploadFile.fields([{name: 'image', maxCount:1}, {name: 'file',maxCount:1}]),categoryController.addCategory);
// add All Category
router.post('/add-all', categoryController.addAllCategory);
// get all Category
router.get('/all', categoryController.getAllCategory);
// get Product Type Category
router.get('/show/:type', categoryController.getProductTypeCategory);
// get Show Category
router.get('/show', categoryController.getShowCategory);
// delete category
router.delete('/delete/:id', categoryController.deleteCategory);
// update product
router.put('/edit/:id',uploadFile.fields([{name: 'image', maxCount:1}, {name: 'file',maxCount:1}]), categoryController.updateCategory);

module.exports = router;