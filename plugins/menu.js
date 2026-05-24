const { cmd, commands } = require("../command");
const config = require("../config");

const {
    proto,
    generateWAMessageContent
} = require("@whiskeysockets/baileys");

const pendingMenu = {};

const headerImage =
config.MENU_IMAGE ||
"https://github.com/sithija-bot/SITHIJA_MD/blob/main/alive.png1.png?raw=true";

cmd({
    pattern: "menu",
    react: "🌸",
    desc: "Show command categories",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from,
    sender,
    pushname,
    reply
}) => {

try {

const uptime = process.uptime();

const ram = (
process.memoryUsage().heapUsed /
1024 /
1024
).toFixed(2);

const commandMap = {};

for (const command of commands) {

if (command.dontAddCommandList) continue;

const category = (
command.category || "OTHER"
).toUpperCase();

if (!commandMap[category])
commandMap[category] = [];

commandMap[category].push(command);

}

const categories = Object.keys(commandMap);

let menuText = `
╔═══════〔 🌸 SITHIJA-MD 🌸 〕═══════╗

👋 HELLO ${pushname}

✦ Welcome To The Anime World ✦

╭───────────────❍
│ 👾 BOT : SITHIJA-MD
│ 👤 USER : ${pushname}
│ 📞 OWNER : ${config.OWNER_NUMBER}
│ ⏰ UPTIME : ${runtime(uptime)}
│ 📂 RAM : ${ram} MB
│ 📊 COMMANDS : ${commands.length}
│ 🪄 PREFIX : ${config.PREFIX}
╰───────────────❍

🌸 SELECT CATEGORY BELOW 🌸
`;

const buttons = [];

categories.forEach((cat, i) => {

menuText += `\n${i + 1}. ${cat} MENU`;

buttons.push({
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: `${cat}`,
id: `.cat_${i}`
})
});

});

const { imageMessage } =
await generateWAMessageContent(
{
image: {
url: headerImage
}
},
{
upload: conn.waUploadToServer
}
);

await conn.relayMessage(
from,
{
viewOnceMessage: {
message: {
interactiveMessage:
proto.Message.InteractiveMessage.create({

header: {
title: "🌸 SITHIJA MD 🌸",
subtitle: "WHATSAPP BOT",
hasMediaAttachment: true,
imageMessage: imageMessage
},

body: {
text: menuText
},

footer: {
text: "⚡ POWERED BY SITHIJA-MD"
},

nativeFlowMessage: {
buttons: buttons
}

})
}
}
},
{}
);

pendingMenu[sender] = {
step: "category",
commandMap,
categories
};

} catch (e) {

console.log(e);

reply(
`❌ ERROR:\n${e}`
);

}

});

cmd({
pattern: "cat_(.*)",
dontAddCommandList: true
},
async (conn, mek, m, {
from,
match,
sender,
reply
}) => {

try {

if (!pendingMenu[sender]) {

return reply(
"❌ Menu Session Expired"
);

}

const {
commandMap,
categories
} = pendingMenu[sender];

const index = parseInt(match);

if (
isNaN(index) ||
index >= categories.length
) {

return reply(
"❌ Invalid Category"
);

}

const selectedCategory =
categories[index];

const cmdsInCategory =
commandMap[selectedCategory];

let cmdText = `
╔═══════〔 🌸 ${selectedCategory} MENU 🌸 〕═══════╗

╭───────────────❍
`;

cmdsInCategory.forEach(c => {

const patterns = [
c.pattern,
...(c.alias || [])
]
.filter(Boolean)
.map(p =>
`${config.PREFIX}${p}`
);

cmdText += `
│ ✦ ${patterns.join(", ")}
│ 🌸 ${c.desc || "No Description"}
│
`;

});

cmdText += `
╰───────────────❍

📊 TOTAL COMMANDS :
${cmdsInCategory.length}

⚡ POWERED BY SITHIJA-MD
`;

await conn.sendMessage(
from,
{
image: {
url: headerImage
},
caption: cmdText
},
{
quoted: mek
}
);

delete pendingMenu[sender];

} catch (e) {

console.log(e);

reply(
`❌ ERROR:\n${e}`
);

}

});

function runtime(seconds) {

seconds = Number(seconds);

const d = Math.floor(
seconds / (3600 * 24)
);

const h = Math.floor(
seconds % (3600 * 24) / 3600
);

const m = Math.floor(
seconds % 3600 / 60
);

const s = Math.floor(
seconds % 60
);

const dDisplay =
d > 0 ? d + "d " : "";

const hDisplay =
h > 0 ? h + "h " : "";

const mDisplay =
m > 0 ? m + "m " : "";

const sDisplay =
s > 0 ? s + "s" : "";

return (
dDisplay +
hDisplay +
mDisplay +
sDisplay
);

}
