var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//  schema
var TestimonialSchema = new Schema({
  emphesis: String,
  author: String,
  language: { type: String, default: 'pl' },
  sortOrder: { type: Number, default: 1000 }
});

//  model
var Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;
