const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    }
}));

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
});

router.get('/:id', async(req, res) => {
    try {
        let genre = await Genre.findById(req.params.id);
        if (!genre || genre.length < 1) return res.status(404).send('genre with given id was not found');
        res.status(200).send(genre);
    } catch (err) {
        res.status(404).send('genre with given id was not found');
    }
});

router.post('/', async(req, res) => {
    const { error } = validateReq(req);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({ name: req.body.name });
    const result = await genre.save();;
    res.status(200).send(result);
});

router.put('/:id', async(req, res) => {
    const { error } = validateReq(req);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const result = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!result || result.length < 1) res.status(404).send('genre with the given id was not found')
        res.send(result);
    } catch (err) {
        res.status(404).send('genre with given id was not found');
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const result = await Genre.findByIdAndRemove(req.params.id)
        if (!result || result.length < 1) res.status(404).send('genre with the given id was not found')
        res.send(result);
    } catch (err) {
        res.status(404).send('genre with given id was not found');
    }
});

function validateReq(req) {
    const schema = {
        name: Joi.string().min(1).required()
    }
    return Joi.validate(req.body, schema);
}

module.exports = router;