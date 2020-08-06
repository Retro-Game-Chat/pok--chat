const nexmo = require('../utils/nexmo');

// controllers/server.js
exports.login = function(req, res, next) {
  console.log(req.body);

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
    response.user_id = user.id;

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
        response.member = member;

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

        response.token = nexmo.generateJwt(
          Buffer.from(privateKeyPath, 'utf8')
        , {
          application_id: applicationId,
          sub: member.name,
          exp: Math.round(expires_at/1000),
          acl: aclPaths
        })

        res.json(response);
      }
    );
  });
};