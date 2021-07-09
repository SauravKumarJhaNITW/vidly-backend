const mongoose = require("mongoose");
const winston = require("winston");
require("dotenv").config();

module.exports = async function () {
  const db = process.env.MONGO_CONNECTION_URL;
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`connected to ${db}..`));
};
