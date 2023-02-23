const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userAuthRoutes = require('./routes/user/auth')
const contentRoutes = require('./routes/user/content')
const interactionRoutes = require('./routes/user/interactions')

require('./database')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', userAuthRoutes)
app.use('/blog', contentRoutes)
app.use('/', interactionRoutes)

app.listen(3000, () => {
    console.log(`app listening on port 3000`)
})