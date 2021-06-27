const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental } = require("../models/rental");
const auth = require("../middleware/auth");
const { Movie } = require("../models/movie");
const Joi = require("joi");
const validate = require("../middleware/validateReq");

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental)
    return res
      .status(404)
      .send("no rental with given movieId and customerId was found");

  if (rental.dateReturned)
    return res.status(400).send("rental alredy returned");

  rental.return();
  await rental.save();

  const movie = await Movie.findById(req.body.movieId);
  movie.numberInStock = movie.numberInStock + 1;
  await movie.save();

  return res.send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(req.body, schema);
}

module.exports = router;
