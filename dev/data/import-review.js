const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Review = require('../../models/reviewModel');

dotenv.config({ path: `./.env` });

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PWD);
mongoose
  .connect(db, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connect to database successful');
  });

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/data-review.json`));

// import database
const importData = async () => {
  try {
    await Review.create(reviews);
    console.log('successful');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete data
const deleteData = async () => {
  try {
    await Review.deleteMany();
    console.log('successful');
    process.exit();
  } catch (error) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
