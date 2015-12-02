var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var SolutionSchema = new Schema({
  name: String,
  link: String,
  language: { type: String, index: true },
  claim: String,
  description: String,
  sortOrder: { type: Number, default: 1000 },
  image: { type: Number, ref: 'Image' }
});

//  numeric ID for linking
SolutionSchema.plugin(autoIncrement.plugin, 'Solution');

//  model
var Solution = mongoose.model('Solution', SolutionSchema);

module.exports = Solution;
