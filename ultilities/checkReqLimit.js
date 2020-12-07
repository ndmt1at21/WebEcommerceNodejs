module.exports = (req, res, next) => {
  if (req.limit > 100) req.limit = 100;
  next();
};
