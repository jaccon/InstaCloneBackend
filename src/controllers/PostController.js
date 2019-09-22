const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    // List images persisted on database
    async index(req, res) {
         const posts = await Post.find().sort('-createdAt');
         return res.json(posts);
    },

    // Save images to Mongo database
    async store(req, res){

        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        // Rename files and preserve the image mimetype
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // Resize a image to 500px
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName )
            )

        // Unlink the full image before resize
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author, 
            place, 
            description, 
            hashtags,
            image: fileName,
        })

        req.io.emmit('post', post);
        
        return res.send(post);

    }
};