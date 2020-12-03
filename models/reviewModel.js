const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  content: {
    type: String,
    min: 10,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  racket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Racket',
    required: [true, 'A review must belong a racket']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A comment must belong a user']
  }
});

reviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model(reviewSchema);
module.exports = Review;
