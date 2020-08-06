// controllers/server.js
exports.status = function(req, res, next) {
  res.json({
    status: 'ok'
  });
};