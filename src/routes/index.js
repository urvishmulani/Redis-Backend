const express = require('express');

const userRoute = require('./users');

const routes = express.Router();

routes.use('/v1', userRoute);

module.exports = routes;