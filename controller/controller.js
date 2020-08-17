var cache = require('memory-cache');
const axios = require('axios');

async function getStory() {
    let cachedData = cache.get('data')
    let newCached = cache.get('newData')
    let newData
    var data
    let postData = []
    if (cachedData) {
        console.log("got cache")
    }
    else {
        data = await axios.get(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        cache.put('data', data.data, 900000);
        console.log('got Req')
    }
    if (newCached) {
        return (newCached)
    }
    else {
        for (let id = 1; id <= 10; id++) {
            console.log(id)
            newData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${data.data[id]}.json?print=pretty`)
            postData.push(newData.data)
            console.log('new req')
        }
        cache.put('newData', postData, 900000)
        console.log(postData.length)
        return (postData)
    }
}

async function getComment(id) {
    let data = []
    let storyData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    let commentIds = storyData.data.kids
    var lastPost = Array(10)
    if (lastPost.length >= 10) {
        lastPost.pop()
    }
    lastPost.append(id)
    for (let id = 0; id <= 10; id++) {
        let commentData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentIds[id]}.json`)
        data.push(commentData.data)
    }
    return data
}
async function pastStories() {
    let data = []
    for (let id = 0; id <= 10; id++) {
        let commentData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentIds[id]}.json`)
        data.push(commentData.data)
    }
    return data
}

module.exports = {
    getStory,
    getComment,
    pastStories
}