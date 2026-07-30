const {writeFileSync} = require('node:fs');
const {resolve} = require('node:path');
const {mainArticlePath} = require('../site-content.cjs');

const englishTarget = `/${mainArticlePath.replace(/^\/+|\/+$/g, '')}/`;
const italianTarget = `/it${englishTarget}`;

const redirects = [
  `/      ${italianTarget}      302!  Language=it`,
  `/      ${englishTarget}      302!`,
  `/it/   ${italianTarget}      302!`,
  '',
].join('\n');

writeFileSync(resolve(__dirname, '../build/_redirects'), redirects);
