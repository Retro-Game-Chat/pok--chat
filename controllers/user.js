// controllers/server.js
exports.login = function(req, res, next) {
  console.log(req.body);

  res.json({
    status: 'ok'
  });
};