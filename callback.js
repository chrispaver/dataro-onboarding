const { makeOAuthClient } = require('./_config');

module.exports = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  const client = makeOAuthClient();
  const { tokens } = await client.getToken(code);

  // Store tokens in a secure cookie (base64 encoded)
  const tokenData = Buffer.from(JSON.stringify(tokens)).toString('base64');
  res.setHeader('Set-Cookie', `gtoken=${tokenData}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`);
  res.redirect('/');
};
