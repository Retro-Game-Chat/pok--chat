// controllers/server.js
exports.status = function(req, res, next) {
  res.json({
    status: 'ok',
    application: process.env.VONAGE_APPLICATION_ID,
    conversation: process.env.VONAGE_DEFAULT_CONVERSATION_ID
  });
};