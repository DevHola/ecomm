const express = require('express')
const router = express.Router()
const Vendor = require('../models/vendor')
const jwt = require('jsonwebtoken')
router.post('/Register', async (req, res) => {
  try {
    const vendor = new Vendor({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    await vendor.save(err => {
      if (err) {
        res.json({
          message: err
        })
      } else {
        // generate token
        const token = jwt.sign(vendor.toJSON(), process.env.JWT_SECRET,
          {
            expiresIn: 604800
          }

        )
        res.status(200).json({
          user: token,
          message: 'Registration Successful'
        })
      }
    })
  } catch (error) {
    return res.json({
      success: 'false',
      message: 'Registration Failed'
    })
  }
})
router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter email or password'
    })
  } else {
    try {
      const vendor = await Vendor.findOne({ email: req.body.email })
      if (!vendor) {
        res.status(403).send({
          message: 'Authentication Fail.user not found',
          success: 'fail'
        })
      } else {
        if (vendor.comparePassword(req.body.password)) {
          const token = jwt.sign(
            vendor.toJSON()
            , process.env.JWT_SECRET,
            {
              expiresIn: 604800
            }

          )
          res.json({
            success: 'true',
            token: token
          })
        } else {
          res.status(403).send({
            success: 'fail',
            message: 'Authentication Failed'
          })
        }
      }
    } catch (error) {
      res.json({
        success: 'false',
        message: error
      })
    }
  }
})
router.get('/vendors', async (req, res) => {
  try {
    const vendor = await Vendor.find()
    res.status(200).json({
      vendors: vendor,
      message: 'succcessful'
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
})
module.exports = router
