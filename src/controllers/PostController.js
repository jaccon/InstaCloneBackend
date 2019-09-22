const Post = require('../models/Post');

module.exports = {

    // List images persisted on database
    async index(req, res) {
         const posts = await Post.find().sort('-createdAt');
         return res.json(posts);
    },

    // Save images to mongo database
    async store(req, res){

        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const post = await Post.create({
            author, 
            place, 
            description, 
            hashtags,
            image,
        })
        
        return res.send(post);

    }
};