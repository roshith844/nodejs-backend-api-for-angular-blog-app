require('dotenv').config()
const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://roshith844:7906@cluster0.ggg7eva.mongodb.net/blog-app?retryWrites=true&w=majority').then(() => {
    console.log("connection success");
})
    .catch((err) => {
        console.log(err);
    })