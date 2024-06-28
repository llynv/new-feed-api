const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cor = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { UUID } = require('bson')
const {validateToken} = require('./utils/JWT')

require('dotenv').config()

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL)

app.use(cor())
app.use(cookieParser())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/feed', validateToken, require('./routes/NewFeed'))
app.use('/', require('./routes/User'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
