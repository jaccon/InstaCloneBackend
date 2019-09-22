const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://jaccon:jaccon@cluster0-kmocs.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Enable cors
app.use(cors());

app.use(require('./routes'));

app.listen(3333);