const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const racketSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A racket must have a name'],
    trim: true,
    minlength: 10,
    maxlength: 100
  },
  manufacturer: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  category: {
    type: String,
    required: [true, 'A racket must in a category'],
    trim: true
  },
  itemCode: {
    type: String,
    minlength: 2,
    maxlength: 10,
    uppercase: true
  },
  flex: {
    type: String,
    required: true,
    enum: ['Dẻo', 'Trung bình', 'Cứng', 'Rất cứng']
  },
  difficulty: {
    type: String,
    enum: ['Dễ', 'Trung bình', 'Khó']
  },
  frame: {
    type: [String],
    required: true
  },
  shaft: {
    type: [String]
  },
  length: {
    type: Number,
    required: true,
    min: 400,
    max: 800
  },
  // in U
  weight: {
    type: Number,
    required: true,
    validator: function (val) {
      return val >= 1 && val <= 8;
    }
  },
  balancePoint: {
    type: Number,
    required: true,
    validator: function (val) {
      return this.length > val && val > 100;
    }
  },
  maxStringing: {
    type: Number,
    required: true,
    min: 10,
    max: 40
  },
  color: {
    type: String
  },
  madein: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'A racket must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return this.price > val;
      },
      message: 'Price discount ({VALUE}) must less than price'
    }
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    select: false
  },
  desciption: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    default: 'default.jpg'
  },
  images: [String],
  slug: String
});

racketSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

racketSchema.virtual('weightAvg').get(function () {
  switch (this.weight) {
    case 2:
      return 92;
    case 3:
      return 87;
    case 4:
      return 82;
    case 5:
      return 76;
    case 6:
      return 72;
    case 7:
      return 68;
    case 8:
      return 60;
  }
});

const Racket = mongoose.model('Racket', racketSchema);
module.exports = Racket;
