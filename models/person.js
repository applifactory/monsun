var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var PersonSchema = new Schema({
  name: String,
  description: String,
  linkedIn: String,
  language: { type: String, index: true },
  sortOrder: { type: Number, default: 1000 },
  image: { type: Number, ref: 'Image' }
});

//  numeric ID for linking
PersonSchema.plugin(autoIncrement.plugin, 'Person');

//  model
var Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
