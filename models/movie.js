const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    }
})
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(req) {
    const Schema = {
        title: Joi.string().min(1).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(req.body, Schema);
}

module.exports = {
    validateMovie: validateMovie,
    movieSchema: movieSchema,
    Movie: Movie
}