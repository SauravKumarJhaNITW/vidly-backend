const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { validateMovie, Movie } = require('../models/movies')
const { validateGenre, Genre } = require('../models/genres')

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('title');
    res.status(200).send(movies);
});

router.get('/:id', async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie || movie.length < 1) return res.status(404).send('movie with given id was not found');
        res.status(200).send(movie);
    } catch (err) {
        res.status(404).send('movie with given id was not found');
    }
});

router.post('/', async(req, res) => {
    // const { error } = validateMovie(req);
    // if (error) return res.status(400).send(error.details[0].message);
    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: new Genre({ name: req.body.genre.name })
    });
    const result = await movie.save();;
    res.status(200).send(result);
});

router.put('/:id', async(req, res) => {
    // const { error } = validateMovie(req);
    // if (error) return res.status(400).send(error.details[0].message);
    try {
        const result = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
        if (!result || result.length < 1) res.status(404).send('movie with the given id was not found')
        res.send(result);
    } catch (err) {
        res.status(404).send('movie with given id was not found');
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const result = await Movie.findByIdAndRemove(req.params.id)
        if (!result || result.length < 1) res.status(404).send('movie with the given id was not found')
        res.send(result);
    } catch (err) {
        res.status(404).send('movie with given id was not found');
    }
});

module.exports = router;