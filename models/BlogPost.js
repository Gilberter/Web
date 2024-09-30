const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema(
    {   
        user_id: String,
        title: String,
        content: String
    }
)

const BlogPosts = mongoose.model('BlogPosts',blogSchema);

module.exports = BlogPosts;