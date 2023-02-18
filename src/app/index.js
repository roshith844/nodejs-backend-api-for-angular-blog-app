const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userAuthRoutes = require('./routes/user/auth')
require('./database')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', userAuthRoutes)

app.listen(3000, () => {
    console.log(`app listening on port 3000`)
})