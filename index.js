const express = require('express');
const app = express();
require('dotenv').config();
const genres = require('./routes/genres')
const home = require('./routes/home')
app.use(express.json());
app.use(express.static('public'));
app.use('/api/genres', genres)
app.use('/', home);
const db = require('./db')

db.connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));