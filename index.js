const express = require('express');
const Joi = require('joi');
const app = express();
require('dotenv').config();
app.use(express.json());

var genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'adventure' }
];

app.get('/', (req, res) => {
    res.send('welcome to vidly!!');
});

app.get('/api/genres', (req, res) => {
    res.status(200).send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre with given id was not found');
    res.status(200).send(genre);
});

app.post('/api/genres/', (req, res) => {
    const { error } = validateReq(req);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        name: req.body.name,
        id: genres.length + 1
    };

    genres.push(genre);
    res.status(200).send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const { error } = validateReq(req);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('genre with given id was not found');
    }

    genre.name = req.body.name;
    res.status(200).send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) {
        return res.status(404).send('genre with given id was not found');
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.status(200).send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

function validateReq(req) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(req.body, schema);
}