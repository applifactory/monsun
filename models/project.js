var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var ProjectSchema = new Schema({
  name: String,
  link: String,
  language: { type: String, index: true },
  description: String,
  customer: String,
  cooperation: String,
  stage: String,
  team: String,
  design: String,
  status: String,
  category: String,
  year: String,
  sortOrder: { type: Number, default: 1000 },
  images: [{ type: Number, ref: 'Image' }]
});

//  numeric ID for linking
ProjectSchema.plugin(autoIncrement.plugin, 'Project');

//  model
var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
