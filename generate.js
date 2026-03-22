const { google } = require('googleapis');
const { makeOAuthClient, TEMPLATE_IDS, OPTIONAL_BLOCKS, INCLUDE_PREFIXES } = require('./_config');

function parseCookies(str) {
  return Object.fromEntries(
    str.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
  );
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const cookies = parseCookies(req.headers.cookie || '');
  if (!cookies.gtoken) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  let tokens;
  try {
    tokens = JSON.parse(Buffer.from(cookies.gtoken, 'base64').toString());
  } catch {
    return res.status(401).json({ error: 'Invalid session. Please sign in again.' });
  }

  const { templateType, answers, __optionalBlocks } = req.body;
  const templateId = TEMPLATE_IDS[templateType];

  try {
    const client = makeOAuthClient();
    client.setCredentials(tokens);

    const drive = google.drive({ version: 'v3', auth: client });
    const docs  = google.docs({ version: 'v1', auth: client });

    const docName = templateType === 'offer'
      ? 'Offer Letter - ' + (answers['[FULL NAME]'] || 'New Employee')
      : 'Consulting Agreement - ' + (answers['[CONSULTANT NAME]'] || 'New Contractor');

    const copy = await drive.files.copy({
      fileId: templateId,
      requestBody: { name: docName }
    });
    const docId = copy.data.id;

    const requests = [];

    // 1. Handle optional blocks
    if (__optionalBlocks) {
      for (const [key, include] of Object.entries(__optionalBlocks)) {
        if (!include) {
          if (OPTIONAL_BLOCKS[key]) {
            requests.push({
              replaceAllText: {
                containsText: { text: OPTIONAL_BLOCKS[key], matchCase: false },
                replaceText: ''
              }
            });
          }
        } else {
          if (INCLUDE_PREFIXES[key] && OPTIONAL_BLOCKS[key]) {
            const fullBlock = OPTIONAL_BLOCKS[key];
            const prefix = INCLUDE_PREFIXES[key];
            const content = fullBlock
              .replace(prefix, '')
              .replace(/\]\]$/, ']')
              .replace(/\]$/, '');
            requests.push({
              replaceAllText: {
                containsText: { text: fullBlock, matchCase: false },
                replaceText: content
              }
            });
          }
        }
      }
    }

    // 2. Field replacements
    for (const [find, replace] of Object.entries(answers)) {
      if (!find || !replace) continue;
      requests.push({
        replaceAllText: {
          containsText: { text: find, matchCase: true },
          replaceText: String(replace)
        }
      });
    }

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId: docId,
        requestBody: { requests }
      });
    }

    res.json({
      success: true,
      url: 'https://docs.google.com/document/d/' + docId + '/edit',
      name: docName
    });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
