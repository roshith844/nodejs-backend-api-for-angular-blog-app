const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userAuthRoutes = require('./routes/user/auth')
const contentRoutes = require('./routes/user/content')
const interactionRoutes = require('./routes/user/interactions')
const statisticsRoutes = require('./routes/user/statistics')
const becomeWriterRoutes = require('./routes/user/become-writer')
const userProfileRoutes = require('./routes/user/profile')
const writerContentRoutes = require('./routes/writer/content')
const writerProfileRoutes = require('./routes/writer/profile')
require('./database')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', userAuthRoutes)
app.use('/blog', contentRoutes)
app.use('/', interactionRoutes)
app.use('/', statisticsRoutes)
app.use('/writer', becomeWriterRoutes)
app.use('/user/profile', userProfileRoutes)
app.use('/writer/blog', writerContentRoutes)
app.use('/writer/profile', writerProfileRoutes)

app.listen(3000, () => {
    console.log(`app listening on port 3000`)
})