const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const uploadConfig = require('./config/upload');
const path = require('path');

const routes = new express.Router();
const upload = multer(uploadConfig);

// Application Routes
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', upload.single('image'), LikeController.store);
routes.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'  )));


module.exports = routes;