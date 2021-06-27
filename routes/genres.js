const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { validateGenre, Genre } = require('../models/genre');
const admin = require('../middleware/admin');

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre || genre.length < 1) return res.status(404).send('genre with given id was not found');
    res.status(200).send(genre);
});

router.post('/', auth, async(req, res) => {
    const { error } = validateGenre(req);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({ name: req.body.name });
    await genre.save();;
    res.status(200).send(genre);
});

router.put('/:id', auth, async(req, res) => {
    const { error } = validateGenre(req);
    if (error) return res.status(400).send(error.details[0].message);
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Invalid id.')
    const result = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!result || result.length < 1) res.status(404).send('genre with the given id was not found')
    res.send(result);
});

router.delete('/:id', [auth, admin], async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Invalid id.')
    const result = await Genre.findByIdAndRemove(req.params.id)
    if (!result || result.length < 1) res.status(404).send('genre with the given id was not found')
    res.send(result);
});

module.exports = router;