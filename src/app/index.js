const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(process.env.PORT, () => {
    console.log(`app listening on port 3000`)
})