var cache = require('memory-cache');
const axios = require('axios');


async function getStory() {
    let cachedData = cache.get('data')
    let newCached = cache.get('newData')
    let newData
    let postData = []
    if (cachedData) {
        console.log("got cache")
    }
    else {
        const data = await axios.get(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        cache.put('data', data.data, 900000);
        console.log('got Req')
    }
    if (newCached) {
        return (newCached)
        console.log('new Cache')
    }
    else {
        for (let id = 1; id <= 10; id++) {
            newData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            postData.push(newData.data)
            console.log('new req')
        }
        cache.put('newData', postData, 900000)
        console.log(postData.length)
        return (postData)
    }
}

module.exports = {
    getStory,
}