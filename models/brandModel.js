const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    lowercase: true,
    unique: true,
    required: true
  },
  category: [
    {
      type: String,
      minlength: 2,
      maxlength: 20,
      lowercase: true
    }
  ],
  frame: [
    {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 50
    }
  ],
  shaft: [
    {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 50
    }
  ]
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
