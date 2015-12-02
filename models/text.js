var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//  schema
var TextSchema = new Schema({
  id: String,
  text: String
});

//  model
var Text = mongoose.model('Text', TextSchema);

module.exports = Text;
