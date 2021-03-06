const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { default: slugify } = require('slugify');
const Brand = require('./brandModel');
const AppError = require('./../ultilities/appError');

const racketSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A racket must have a name'],
    trim: true,
    minlength: 10,
    maxlength: 100
  },
  brand: {
    type: String,
    required: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'A racket must in a category'],
    trim: true,
    lowercase: true
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
    lowercase: true,
    enum: ['flex', 'medium', 'stiff', 'verystiff']
  },
  difficulty: {
    type: String,
    lowercase: true,
    enum: ['normal', 'medium', 'advanced']
  },
  frame: [{ type: String, required: true, lowercase: true }],
  shaft: [{ type: String, required: true, lowercase: true }],
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
    type: [String]
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
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  sold: {
    type: Number,
    default: 0,
    select: false
  },
  rating: {
    type: Number,
    default: 5,
    // set when value this field change
    set: (value) => Math.round(value * 10) / 10
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  slug: String
});

racketSchema.plugin(mongoosePaginate);

racketSchema.index({ name: 'text' });
racketSchema.index({ price: 1, rating: -1 });
racketSchema.index('slug');

racketSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

racketSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

racketSchema.pre('save', async function (next) {
  const brand = await Brand.find({
    category: this.category
  });

  if (!brand.length) {
    next(new AppError('Category is not found', 400));
  }
});

racketSchema.pre('save', async function (next) {
  const brand = await Brand.find({ name: this.brand });

  if (!brand.length) {
    next(new AppError('Brand is not found', 400));
  }
});

racketSchema.pre('save', async function (next) {
  let query = Brand.find();
  this.frame.forEach((el) => {
    query = query.find({ frame: el });
  });

  const brand = await query;
  if (!brand.length) {
    next(new AppError('Frame is not found', 400));
  }
  next();
});

racketSchema.pre('save', async function (next) {
  let query = Brand.find();
  this.shaft.forEach((el) => {
    query = query.find({ shaft: el });
  });

  const brand = await query;
  if (!brand.length) {
    next(new AppError('Shaft is not found', 400));
  }
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
