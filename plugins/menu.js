const { cmd, commands } = require("../command");
const config = require("../config");

const headerImage =
config.MENU_IMAGE ||
"https://github.com/sithija-bot/SITHIJA_MD/blob/main/alive.png1.png?raw=true";

cmd({
pattern: "menu",
react: "🌸",
desc: "Main Menu",
category: "main",
filename: __filename
},
async (conn, mek, m, {
from,
pushname,
reply
}) => {

try {

const categories = [];

commands.forEach(c => {

if (
c.category &&
!categories.includes(
c.category.toUpperCase()
) &&
!c.dontAddCommandList
) {

categories.push(
c.category.toUpperCase()
);

}

});

const rows = [];

categories.forEach(cat => {

rows.push({
title: `${cat} MENU`,
rowId: `.list ${cat}`,
description: `Open ${cat} commands`
});

});

await conn.sendMessage(
from,
{
image: {
url: headerImage
},
caption:
`🌸 *SITHIJA MD MENU* 🌸

👤 User : ${pushname}

📊 Commands : ${commands.length}

⚡ Select Menu Category Below`,
footer: "SITHIJA MD",
title: "MENU LIST",
buttonText: "OPEN MENU",
sections: [
{
title: "MENU CATEGORY",
rows: rows
}
]
},
{
quoted: mek
}
);

} catch (e) {

console.log(e);

reply(`${e}`);

}

});

cmd({
pattern: "list ?(.*)",
dontAddCommandList: true
},
async (conn, mek, m, {
from,
match,
reply
}) => {

try {

const category =
match.toUpperCase();

const cmds = commands.filter(
c =>
c.category &&
c.category.toUpperCase() === category
);

if (!cmds.length)
return reply("❌ No Commands Found");

let text =
`╔══════〔 ${category} MENU 〕══════╗

`;

cmds.forEach(c => {

text += `✦ .${c.pattern}
🌸 ${c.desc || "No Description"}

`;

});

text += `⚡ POWERED BY SITHIJA MD`;

await conn.sendMessage(
from,
{
image: {
url: headerImage
},
caption: text
},
{
quoted: mek
}
);

} catch (e) {

console.log(e);

reply(`${e}`);

}

});
