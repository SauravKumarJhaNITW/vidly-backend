const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    }
})
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(req) {
    const schema = {
        name: Joi.string().min(1).required()
    }
    return Joi.validate(req.body, schema);
}

module.exports = {
    validateGenre: validateGenre,
    genreSchema: genreSchema,
    Genre: Genre
}