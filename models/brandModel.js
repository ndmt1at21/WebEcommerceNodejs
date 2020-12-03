const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { default: slugify } = require('slugify');

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

brandSchema.plugin(mongoosePaginate);

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
