const { cmd, commands } = require("../command");
const config = require("../config");

const headerImage =
config.MENU_IMAGE ||
"https://github.com/sithija-bot/SITHIJA_MD/blob/main/alive.png1.png?raw=true";

cmd({
pattern: "menu",
react: "🌸",
desc: "Menu System",
category: "main",
filename: __filename
},
async (conn, mek, m, {
from,
pushname,
reply
}) => {

try {

const uptime = runtime(process.uptime());

const ram = (
process.memoryUsage().heapUsed /
1024 /
1024
).toFixed(2);

const categories = [];

commands.forEach(cmd => {

if (
cmd.category &&
!categories.includes(
cmd.category.toUpperCase()
) &&
!cmd.dontAddCommandList
) {

categories.push(
cmd.category.toUpperCase()
);

}

});

let text = `
╔═══════〔 🌸 SITHIJA MD 🌸 〕═══════╗

👋 HELLO ${pushname}

╭───────────────❍
│ 👾 BOT : SITHIJA-MD
│ 👤 USER : ${pushname}
│ 📞 OWNER : ${config.OWNER_NUMBER}
│ ⏰ UPTIME : ${uptime}
│ 📂 RAM : ${ram} MB
│ 📊 COMMANDS : ${commands.length}
│ 🪄 PREFIX : ${config.PREFIX}
╰───────────────❍

🌸 SELECT CATEGORY 🌸
`;

const buttons = [];

categories.slice(0,3).forEach((cat, i) => {

buttons.push({
buttonId: `.list ${cat}`,
buttonText: {
displayText: cat
},
type: 1
});

});

await conn.sendMessage(
from,
{
image: {
url: headerImage
},
caption: text,
footer: "⚡ POWERED BY SITHIJA MD",
buttons: buttons,
headerType: 4
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
desc: "Command List",
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
return reply("❌ Category Not Found");

let text = `
╔═══════〔 ${category} MENU 〕═══════╗

╭───────────────❍
`;

cmds.forEach(c => {

text += `
│ ✦ ${config.PREFIX}${c.pattern}
│ 🌸 ${c.desc || "No Description"}
│
`;

});

text += `
╰───────────────❍

📊 TOTAL COMMANDS : ${cmds.length}

⚡ SITHIJA MD
`;

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

function runtime(seconds) {

seconds = Number(seconds);

const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor(seconds % (3600 * 24) / 3600);
const m = Math.floor(seconds % 3600 / 60);
const s = Math.floor(seconds % 60);

return (
(d ? d + "d " : "") +
(h ? h + "h " : "") +
(m ? m + "m " : "") +
(s ? s + "s" : "")
);

}
