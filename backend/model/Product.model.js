const mongoose = require('mongoose');

const product = mongoose.Schema({
  title:{type: String, require:true},
  img:{type: String, require:true},
  code:{type: String, require:true},
  price:{type: String, require:true},
});
module.exports = mongoose.model('Product', product);
