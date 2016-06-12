var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users');
var Verify = require('./verify');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.route('/:usersId')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.findById(req.params.usersId)
        .exec(function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.findById(req.params.usersId, function (err, user) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        user.save(function (err, user) {
            if (err) throw err;
            console.log('Created User');
            res.json(user);
        });
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.findByIdAndUpdate(req.params.usersId, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
  Users.findByIdAndRemove(req.params.usersId, function (err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = usersRouter;
