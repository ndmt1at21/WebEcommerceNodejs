const Racket = require('./../models/racketModel');

exports.getRacketByID = async (id) => {
  const racket = await Racket.findById(id);
  return racket;
};

exports.getAllActiveRackets = async () => {
  const rackets = await Racket.find().select('+active');
  return rackets;
};

exports.getAllRackets = async () => {
  const rackets = await Racket.find();
  return rackets;
};

exports.createRacket = async (racket) => {
  if (racket.frame) {
    racket.frame = racket.frame.split(',');
  }

  if (racket.shaft) {
    racket.shaft = racket.shaft.split(',');
  }

  if (racket.color) {
    racket.color = racket.color.split(',');
  }

  if (req.files.imageCover) {
    racket.imageCover = req.files.imageCover[0].filename;
  }

  if (req.files.images) {
    racket.images = req.files.images.map((el) => el.filename);
  }

  const newRacket = await Racket.create(racket);
  return newRacket;
};

exports.updateRacket = async (id, racket) => {
  Object.keys(racket).forEach(
    (key) =>
      racket[key] === undefined ||
      (racket[key] === 'undefined' && delete racket[key])
  );

  await Racket.findByIdAndUpdate(id, racket, {
    new: true,
    runValidators: true
  });
};

exports.deleteRacketByID = async (id) => {
  await Racket.findByIdAndUpdate(id, { active: false });
};
