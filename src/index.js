const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Support to http
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Connect to database
mongoose.connect('mongodb+srv://jaccon:jaccon@cluster0-kmocs.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Websocket middleware
app.use((req, res, next) => {
    req.io = io;
    next();
})

// Enable cors
app.use(cors());

app.use(require('./routes'));

server.listen(3333);