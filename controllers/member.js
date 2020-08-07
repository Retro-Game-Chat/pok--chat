// controllers/member.js

const nexmo = require('../utils/nexmo');

exports.fetchAll = (req, res, next) => {
  const { conversation_id, ...options } = req.body;

  nexmo.conversations.members.get(conversation_id, options, (err, result) => {
    if (!err) {
      res.json(result)
    }
  });
};