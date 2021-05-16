const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const home = require('./routes/home')

mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db..'))
    .catch((err) => {
        console.error("couldn't connect to db..", err)
    })

app.use(express.json());
app.use(express.static('public'));
app.use('/api/genres', genres)
app.use('/api/movies', movies)
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));