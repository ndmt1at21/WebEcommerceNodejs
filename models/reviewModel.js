const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AppError = require('../ultilities/appError');
const Racket = require('./../models/racketModel');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  title: {
    type: String,
    min: 5,
    max: 50,
    required: true
  },
  content: {
    type: String,
    min: 10,
    max: 200,
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

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

reviewSchema.static('calcAvgRating', async function (racketID) {
  // stats []
  return (stats = await this.aggregate([
    {
      $match: { racket: racketID }
    },
    {
      $group: {
        // group by racket
        _id: '$racket',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]));
});

// Each time save review to db
// recalc rating & ratingQuantity in Racket
reviewSchema.post('save', async function () {
  const stats = await this.constructor.calcAvgRating(this.racket);

  console.log(stats[0].avgRating);
  const a = await Racket.findByIdAndUpdate(stats[0]._id, {
    rating: stats[0].avgRating,
    ratingQuantity: stats[0].nRating
  });
  console.log(a);
});

// Unique { racket, user }
reviewSchema.index({ racket: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
