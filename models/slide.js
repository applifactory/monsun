var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

//  schema
var SlideSchema = new Schema({
  image: String,
  text: String,
  class: { type: String, default: 'right' },
  link: String,
  newWindow: { type: Boolean, default: false }
});

//  numeric ID
SlideSchema.plugin(autoIncrement.plugin, 'Slide');

//  model
var Slide = mongoose.model('Slide', SlideSchema);

module.exports = Slide;
