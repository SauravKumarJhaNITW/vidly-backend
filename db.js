const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true })
        .then(() => console.log('connected to db..'))
        .catch((err) => console.error("couldn't connect to db..", err))
}

const genreSchema = new mongoose.Schema({
    name: String,
    id: Number
});
const Genre = mongoose.model('Genre', genreSchema);
async function createGenre(genre1) {
    const genre = new Genre(genre1);
    return await genre.save();
}

async function getGenres() {
    return await Genre.find();
}

async function getGenre(id1) {
    return await Genre.find({ id: id1 });
}

async function updateGenre(id1, name1) {
    return await Genre.updateOne({ id: id1 }, {
        $set: { name: name1 }
    });
}

async function deleteGenre(id1) {
    return await Genre.deleteOne({ id: id1 });
}

async function getCnt() {
    return await Genre.find().countDocuments();;
}


module.exports = {
    connectDB: connectDB,
    createGenre: createGenre,
    getGenres: getGenres,
    getCnt: getCnt,
    getGenre: getGenre,
    updateGenre: updateGenre,
    deleteGenre: deleteGenre
}