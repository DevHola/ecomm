const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + '-' + Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 70
  }
})
router.post('/category/create', upload.single('photo'), async (req, res, next) => {
  try {
    const file = await req.file.path
    const category = new Category({
      name: req.body.name,
      desc: req.body.desc,
      photo: file
    })
    category.save(err => {
      if (err) {
        res.json(err)
        console.log(err)
      } else {
        res.status(200).json({
          category: category,
          message: 'success'
        })
      }
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
})
router.get('/category', async (req, res) => {
  try {
    const category = await Category.find()
    if (category < 1) {
      res.status(200).json({
        categories: 'No Category Exists',
        message: 'success'
      })
    } else {
      res.status(200).json({
        categories: category,
        message: 'success'
      })
    }
  } catch (error) {
    res.json({
      message: error
    })
  }
})
router.get('/category/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.status(200).json({
      category: category,
      message: 'success'
    })
  } catch (error) {
    res.jsson({
      message: error
    })
  }
})
router.delete('/category/delete/:id', async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({ _id: req.params.id })
    if (category) {
      res.status(200).json({
        message: 'Deletion completed'
      })
    }
  } catch (error) {
    res.json({
      message: error
    })
  }
})
module.exports = router
