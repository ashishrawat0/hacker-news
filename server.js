var express = require('express')
var app = express()
var cors = require('cors')
const https = require('https');
var controller = require('./controller/controller')
app.use(cors())
var router = express.Router()
require('dotenv').config()
app.get('/top-stories', async function (req, res) {
    const data = await controller.getStory()
    res.send(data)

})

app.get('/comments', async function (req, res) {
    let storyId= req.query.id
    let data =await controller.getComment(storyId)
    res.status(200).send(data)
})

app.get('/past-stories',async function(req,res){
    let data =await controller.pastStories(storyId)
    res.status(200).send(data)
})

app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
})
