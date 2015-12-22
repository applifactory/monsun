var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var ImageSchema = new Schema({
  file: String,
  description: String,
  project: { type: Number, ref: 'Project', childPath: 'images' },
  slider: Number,
  link: String,
  sortOrder: { type: Number, default: 1000 }
});

//  numeric ID for linking
ImageSchema.plugin(autoIncrement.plugin, 'Image');

//  relations
ImageSchema.plugin(relationship, { relationshipPathName: ['project'] });

//  model
var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
