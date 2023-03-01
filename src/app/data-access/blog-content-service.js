const mongoose = require('mongoose')

const POST_MODEL = require('../models/post-schema')

async function getLatestBlogs(numberOfBlogs) {
    return await POST_MODEL.aggregate([ {
        $lookup:
          {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author_details"
          }
     },
     {$unwind: "$author_details"},{ $limit: numberOfBlogs }])
}

async function getBlogContent(slug) {
   return await POST_MODEL.aggregate([{ $match: { slug: slug } }, 
    
        {
            $lookup:
              {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author_details"
              }
         },
         {$unwind: "$author_details"}
    ])

    // await POST_MODEL.aggregate([{ $match: { slug: slug } }])

}

async function getBlogFormDatabase(articleId) {
    return await POST_MODEL.findOne({ _id: articleId })
}
module.exports = { getLatestBlogs, getBlogContent, getBlogFormDatabase }