// controllers/server.js

const nexmo = require('../utils/nexmo');

exports.login = (req, res, next) => {
  const { 
    VONAGE_APPLICATION_ID: applicationId,
    VONAGE_DEFAULT_CONVERSATION_ID :conversationId
  } = process.env;

  const result = {
    conversation: conversationId
  }

  nexmo.users.create({
    name: `${req.body.name}-${Date.now()}`,
    display_name: JSON.stringify({
      name: req.body.name,
      color: req.body.color,
      direction: 'left',
      moving: false,
      x: 19,
      y: -1
    }),
  }, (err, user) => {
    nexmo.conversations.members.create(
      conversationId,
      {
        action: 'join',
        user_id: user.id,
        channel: {
          type: 'app'
        }
      },
      (err, member) => {
        const aclPaths = {
          "paths": {
            "/*/users/**": {},
            "/*/conversations/**": {},
            "/*/sessions/**": {},
            "/*/devices/**": {},
            "/*/image/**": {},
            "/*/media/**": {},
            "/*/applications/**": {},
            "/*/push/**": {},
            "/*/knocking/**": {}
          }
        };

        const expires_at = new Date();
        expires_at.setDate(expires_at.getDate() + 1);

        member.token = nexmo.generateJwt({
          application_id: applicationId,
          sub: member.name,
          exp: Math.round(expires_at/1000),
          acl: aclPaths
        })

        result.member = member;
        res.json(result);
      }
    );
  });
};

exports.sync = (req, res, next) => {
  const { user_id, ...options } = req.body;

  nexmo.users.update(user_id, options, (err, result) => {
    if (!err) {
      res.json(result)
    }
  });
};