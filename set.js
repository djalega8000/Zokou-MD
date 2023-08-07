const fs = require('fs-extra');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
module.exports = { session: process.env.SESSION_ID || 'zokk',
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md"
    API_LOL_HUMAIN: process.env.API_LOL_HUMAIN
};

