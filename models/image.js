var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var autoIncrement = require('mongoose-auto-increment');

//  schema
var ImageSchema = new Schema({
  file: String,
  project: { type: Number, ref: 'Project', childPath: 'images' },
  solution: { type: Number, ref: 'Solution', childPath: 'image' },
  person: { type: Number, ref: 'Person', childPath: 'image' },
  sortOrder: { type: Number, default: 1000 }
});

//  numeric ID for linking
ImageSchema.plugin(autoIncrement.plugin, 'Image');

//  relations
ImageSchema.plugin(relationship, { relationshipPathName: ['project', 'solution', 'person'] });

//  model
var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
