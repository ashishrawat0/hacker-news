var express = require('express')
var app = express()
var cors = require('cors')
const https = require('https');
var cache = require('memory-cache');
var controller = require('./controller')
app.use(cors())
var router = express.Router()
require('dotenv').config()
app.get('/', async function (req, res) {
    const data = await controller.getStory()
    res.send(data)

})

app.get('/comments', async function (req, res) {

})

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
})
