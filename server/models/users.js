var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Users = new Schema({
    email: String,
    password: String,
    name: {
      type: String,
        default: ''
    },
    home_country: {
      type: String,
        default: ''
    },
    language: {
      type: String,
        default: 'EN'
    },
    visited: {
      type: Array
    },
    feedback: {
      type: Array
    },
    wishlist: {
      type: Array
    },
    maps: {
      type: Array
    },
    settings: {
      type: Array
    }
}, {
  timestamps: true
});

Users.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', Users);
