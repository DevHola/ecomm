const express = require(express)
const router = express.Router()
const Address = require('../models/address')
const User = require('../models/user')

router.get('/Address/:id',async (req,res)=>{
    try {
        const address = await Address.findOne({_id:req.params.id})
        if(address){
            res.status(200).json({
                Address:address,
                success:"true"
            })
        }
    } catch (error) {
        res.json({
            message:error
        })
    }
    
})
router.post('/Address/setDefault/:id',async (req,res)=>{
    try {
        const defaultAddress =  new Address({
        user:req.params.id,
        fullname:req.body.fullname,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        street:req.body.street,
        zipcode:req.body.zipcode,
        phoneNumber:req.body.phoneNumber
    })
    defaultAddress.save(async function(err){
        if(err){
            res.json({
                message:err
            })
        }
        const user = User.update({_id:defaultAddress.user},{$push:{address:address._id}}).exec();
    })
     res.status(200).json({
        message:'Address Defined'
         })
    } catch (error) {
        res.json({
            success:"false",
            message:error
        })
    }
    
})
router.put('/Address/Edit/:id',async (req,res)=>{
    try {
        const address = await Address.findOneAndUpdate({_id:req.params.id},{
        $set:{
                fullname : req.body.fullname || address.fullname,
                country  : req.body.country  || address.country,
                state    : req.body.state    || address.state,
                city     : req.body.city     || address.city,
                street   : req.body.street   || address.street,
                zipcode  : req.body.zipcode  || address.zipcode,
                phoneNumber: req.body.phone  || address.phoneNumber
        },
    },
    );
    res.json({
        message:"Information Updated",
        success:"true"
    })
    } catch (error) {
      res.json({
          message:error
      })  
    }
})
module.exports = router