const { cmd } = require('../command');
const config = require('../config');
const os = require("os");

cmd({
    pattern: "alive",
    react: "🧬",
    desc: "Check bot online status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from,
    reply
}) => {

    try {

        const uptime = process.uptime();
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ping = Date.now() - mek.messageTimestamp * 1000;

        const aliveMsg = `
╭━━━〔 🌿 SITHIJA - MD 🌿 〕━━━⊷
┃
┃ 👋 Hello User,
┃ ✅ Bot Status : *ONLINE*
┃ ⚡ Speed : *${ping}ms*
┃ ⏰ Uptime : *${runtime(uptime)}*
┃ 💾 RAM Usage : *${ram} MB*
┃ 🖥️ Platform : *${os.platform()}*
┃ 🟢 NodeJS : *${process.version}*
┃
┣━━━━━━━━━━━━━━━━⊷
┃ 🛡️ Mode : *PUBLIC*
┃ 🖥 Library : *BAILEYS*
┃ 👑 Owner : *SITHIJA*
┃ 📍 Country : *SRI LANKA*
┣━━━━━━━━━━━━━━━━⊷
┃ 🌸 Bot Running Smoothly...
┃ 🚀 Enjoy Premium Features
┃
╰━━━〔 ⚡ POWERED BY SITHIJA MD ⚡ 〕━━━⊷

> 🌿 Type *.menu* For Command List
`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveMsg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "SITHIJA MD",
                    body: "WHATSAPP MULTI DEVICE BOT",
                    thumbnailUrl: config.ALIVE_IMG,
                    sourceUrl: "https://github.com/",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

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

    return `${d}d ${h}h ${m}m ${s}s`;
}
