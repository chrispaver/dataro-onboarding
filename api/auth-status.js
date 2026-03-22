module.exports = (req, res) => {
  const cookies = parseCookies(req.headers.cookie || '');
  res.json({ authenticated: !!cookies.gtoken });
};

function parseCookies(str) {
  return Object.fromEntries(
    str.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
  );
}
