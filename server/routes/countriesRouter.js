var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Countries = require('../models/countries');
var Verify = require('./verify');

var countriesRouter = express.Router();
countriesRouter.use(bodyParser.json());

countriesRouter.route('/')

.get(function (req, res, next) {
    Countries.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

module.exports = countriesRouter;
