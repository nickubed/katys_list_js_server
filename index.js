const express = require('express')
const sequelize = require('sequelize')
let cors = require('cors')
let cookieParser = require('cookie-parser')

const app = express()

app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from the back-end')
})

app.use('/auth', require('./controllers/auth'))
app.use('/spotify', require('./controllers/spotify'))

app.listen(3000, () => console.log('Hello from port 3000'))