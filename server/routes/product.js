const express = require('express')
const router = express.Router()
const Product = require('../models/product')
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
const pmupload = upload.array('image', 5)

router.post('/product/create', pmupload, async (req, res, next) => {
  //ReactAwesome Slider for slider on homepage
  /*Mern Authentication using jwb passport
   https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
   https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
   https://github.com/anhthii/Echo
  */
  try {
    const multi = await req.files
    const product = new Product({
      name: req.body.name,
      image: multi,
      stockquantity: req.body.stockquantity,
      price: req.body.price,
      desc: req.body.desc,
      category:req.body.category,
      manufacturer:req.body.manufacturer
    })
    console.log(product)
    product.save(err => {
      if (err) {
        res.json({
          message: err
        })
      } else {
        res.status(200).send({
          message: 'successful'
        })
      }
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
})
router.get('/Products', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      products: products,
      message: 'Successfully Fetched'
    })
  } catch (error) {
    console.log(error)
  }
})
router.delete('/product/delete/:id',async (req,res)=>{
  try {
    const product = await Product.findOneAndRemove({_id:req.params.id})
    if(product){
      res.status(200).json({
        message:"successfully deleted",
        status:200
      })
    }
  } catch (error) {
    res.json({
      message:error
    })
  }
})
router.put('/product/update/:id',pmupload,async (req,res)=>{
  try {
     const multi = await req.files
    const product = await Product.findOneAndUpdate({_id:req.params.id},{
      $set:{
                name: req.body.name || product.name,
                image: multi        || product.image,
                stockquantity: req.body.stockquantity || product.stockquantity,
                price: req.body.price || product.price,
                desc: req.body.desc   || product.desc
      }
    });
    res.json({
      message:"Product Updated"
    })
  } catch (error) {
    res.json({
      message:error
    })
  }
})
module.exports = router