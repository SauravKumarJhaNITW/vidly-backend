const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number
})
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(req) {
    const Schema = {
        title: Joi.string().min(1).required()
    }
    return Joi.validate(req.body, Schema);
}

module.exports = {
    validateMovie: validateMovie,
    movieSchema: movieSchema,
    Movie: Movie
}