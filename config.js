const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "8ZVCgJgK#5NiMQ2NxzFYsc94wd514A9K3YFR88uPsFXuqBv3pU0w",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/sithija-bot/SITHIJA_MD/blob/main/alive.png1.png?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*⚡ SITHIJA MD MOVIE BOT Alive❤️ Fast & Active Always*",
MENU_IMAGE: process.env.MENU_IMAGE || "https://github.com/sithija-bot/SITHIJA_MD/blob/main/alive.png1.png?raw=true",
BOT_OWNER: '94785936039',  // Replace with the owner's phone number



};
