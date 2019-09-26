const Post = require('../models/Post');

module.exports = {

    // Save images to mongo database
    async store(req, res){
        const post = await Post.findById(req.params.id);
        
        post.likes += 1;

        await post.save();

        req.io.emit('like', post);

        return res.json(post);

    }
};