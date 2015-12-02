var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var ProjectSchema = new Schema({
  name: String,
  link: String,
  language: { type: String, index: true },
  customer: String,
  description: String,
  status: String,
  role: String,
  sortOrder: { type: Number, default: 1000 },
  images: [{ type: Number, ref: 'Image' }],
  sector: { type: Number },
  solution: { type: Number }
});

//  numeric ID for linking
ProjectSchema.plugin(autoIncrement.plugin, 'Project');

//  relations
//NodeSchema.plugin(relationship, { relationshipPathName: ['sector'] });

//  model
var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
