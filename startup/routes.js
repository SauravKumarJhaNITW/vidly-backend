const express = require("express");
const error = require("../middleware/error");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const customers = require("../routes/customers");
const auth = require("../routes/auth");
const users = require("../routes/users");
const home = require("../routes/home");
const returns = require("../routes/returns");
const cors = require("cors");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/api/genres", genres);
  app.use("/api/returns", returns);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/rentals", rentals);
  app.use("/api/auth", auth);
  app.use("/", home);
  app.use(error);
};
