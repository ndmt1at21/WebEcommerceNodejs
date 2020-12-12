const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('./../ultilities/appError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    await Model.create(req.body);

    res.status(200).json({
      status: 'success'
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });

    if (!doc) return new AppError('No document match to ID', 404);

    res.status(200).json({
      status: 'success'
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await Model.findByIdAndUpdate(id, { active: false });

    res.status(200).json({
      status: 'success'
    });
  });
