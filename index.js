const winston = require("winston");
const express = require("express");
const app = express();
const https = require("https");

const httpsServer = https.createServer(app, {
    privateKey: process.env.PRIVATE_KEY,
    secretKey: process.env.SECRET_KEY
});

// httpsServer.listen(443, () => {
//     console.log('https server listening on port 443');
// })

require("dotenv").config();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`listening on port ${port}`));
