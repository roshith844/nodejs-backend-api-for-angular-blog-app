const blogContentService = require('./../../data-access/blog-content-service')

async function getBlogCards() {
    let BLOG_CONTENT = await blogContentService.getLatestBlogs(2)

    // Takes only first 200 words from content
    for (let i = 0; i < BLOG_CONTENT.length; i++) {
        BLOG_CONTENT[i].content = BLOG_CONTENT[i].content.substr(0, 200)
    }

    return BLOG_CONTENT
}

async function getBlogContent(slug){
    const CONTENT = await blogContentService.getBlogContent(slug)
    if(CONTENT !== null){
              return CONTENT[0]
    }else{
        return false
    }
    
}

module.exports = { getBlogCards,getBlogContent }