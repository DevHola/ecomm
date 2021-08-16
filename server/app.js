const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000 }))
app.use(cors())
dotenv.config({ path: path.join(__dirname, '/.env') })
app.use('/upload', express.static('upload'))
//routes
const productrouter = require('./routes/product')
const categoryrouter = require('./routes/category')
const userrouter = require('./routes/user')
const vendorrouter = require('./routes/vendor')
const darouter = require('./routes/address')
app.use('/Api',darouter)
app.use('/Api', productrouter)
app.use('/Api', categoryrouter)
app.use('/Api', userrouter)
app.use('/Apiv2', vendorrouter)
// mongodb connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
err => {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to db')
  }
})

server.listen(process.env.PORT || 7000, function () {
  console.log('listening on port 7000')
})
