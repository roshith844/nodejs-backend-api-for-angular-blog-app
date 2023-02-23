const mongoose = require('mongoose')
const POST_MODEL = require('../models/post-schema')

async function getLatestBlogs(numberOfBlogs){
    return await POST_MODEL.aggregate([{ $limit : numberOfBlogs }])
}

module.exports = { getLatestBlogs }