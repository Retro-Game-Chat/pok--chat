// controllers/server.js

const nexmo = require('../utils/nexmo');

exports.login = function(req, res, next) {
  const { 
    VONAGE_PRIVATE_KEY_PATH: privateKeyPath,
    VONAGE_APPLICATION_ID: applicationId,
    VONAGE_DEFAULT_CONVERSATION_ID :conversationId
  } = process.env;

  const response = {
    conversation: conversationId
  }

  nexmo.users.create({
    name: `${req.body.name}-${Date.now()}`,
    display_name: JSON.stringify({
      n: req.body.name,
      s: req.body.version,
      x: 0,
      y: 0
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

        response.member = member;
        res.json(response);
      }
    );
  });
};