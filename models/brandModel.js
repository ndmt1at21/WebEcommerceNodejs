const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    lowercase: true,
    unique: true,
    required: true
  }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
