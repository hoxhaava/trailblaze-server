require('./models/User')
require('./models/Track')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const auth = require('./middlewares/auth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'your-mongo-url'
mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo: ', err)
})

app.get('/', auth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
