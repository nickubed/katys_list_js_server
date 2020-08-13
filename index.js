const express = require('express')
const sequelize = require('sequelize')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from the back-end')
})

app.use('/spotify', require('./controllers/spotify'))

app.listen(3000, () => console.log('Hello from port 3000'))