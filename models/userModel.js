const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please provide a phone number'],
    validate: {
      validator: function (val) {
        return validator.isMobilePhone(val, 'vi-VN');
      },
      message: 'Please provide a valid email'
    }
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.isChangedPasswordAfter = function (JWTTime) {
  console.log('dsghbwsyg');
  // convert time (ex: 02-01-2012 UTC ..) to second
  // getDate return milisecond
  if (this.passwordChangeAt) {
    const passChangedAt = this.passwordChangedAt.getTime() / 1000;
    if (passChangedAt > JWTTime) {
      return true;
    }
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
