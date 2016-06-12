var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countriesSchema = new Schema({
  id:  {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: false
});


var continentsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  countries:[countriesSchema]
}, {
  timestamps: false
});

// the schema is useless so far
// we need to create a model using it
var Countries = mongoose.model('Continent', continentsSchema);

// make this available to our Node applications
module.exports = Countries;
