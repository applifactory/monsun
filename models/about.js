var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var AboutSchema = new Schema({
  name: String,
  type: String,
  description: String,
  author: String,
  language: { type: String, index: true },
  sortOrder: { type: Number, default: 0 }
});

//  numeric ID for linking
AboutSchema.plugin(autoIncrement.plugin, 'About');

//  model
var About = mongoose.model('About', AboutSchema);

module.exports = About;
