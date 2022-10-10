const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { validateMovie, Movie } = require("../models/movie");
const { validateGenre, Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid id.");
  const movie = await Movie.findById(req.params.id);
  if (!movie || movie.length < 1)
    return res.status(404).send("movie with given id was not found");
  res.status(200).send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genreId.");

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      name: genre.name,
      _id: genre._id,
    },
  });
  await movie.save();
  res.status(200).send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid id.");
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const result = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!result || result.length < 1)
    res.status(404).send("movie with the given id was not found");
  res.send(result);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid id.");
  const result = await Movie.findByIdAndRemove(req.params.id);
  if (!result || result.length < 1)
    res.status(404).send("movie with the given id was not found");
  res.send(result);
});

router.get('/:id/view', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid id.");
  const movie = await Movie.findById(req.params.id);
  if (!movie || movie.length < 1)
    return res.status(404).send("movie with given id was not found");
  res.status(200).send(movie);
});

module.exports = router;
