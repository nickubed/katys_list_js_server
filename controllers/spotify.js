require('dotenv').config()
let express = require('express')
let router = express.Router()
let axios = require('axios')

router.get('/', (req, res) => {
    // long-term, I would like valid queries should be handled by a front-end drop-down. For testing, this will do.
    let valid_queries = [
        'artist',
        'album',
        'track'
    ]
    // just making sure query actually contains a valid query.
    let query = valid_queries.includes(req.query) ? req.query : null
    let this_key, value
    for(key in query){
        console.log('Here is key', key)
        value = query[key].replace(/ /g, '%20')
        this_key = key
    }
    if(req.query){
    axios.get(`https://api.spotify.com/v1/search?q=${value}&type=${this_key}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        }})
        .then(response => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    res.send('Please enter a valid query')
})

module.exports = router