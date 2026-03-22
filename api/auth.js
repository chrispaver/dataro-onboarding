const { makeOAuthClient } = require('./_config');

module.exports = (req, res) => {
  const client = makeOAuthClient();
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive'
    ],
    prompt: 'consent'
  });
  res.redirect(url);
};
