const { cmd } = require('../command');
const config = require('../config');
const os = require("os");

cmd({
    pattern: "alive",
    desc: "Check Bot Status",
    react: "🧬",
    category: "main",
    filename: __filename
},
async (danuwamd, mek, m, {
    from,
    reply
}) => {

    try {

        const uptime = process.uptime();

        const ping = mek.messageTimestamp
            ? Date.now() - mek.messageTimestamp * 1000
            : "0";

        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const runtime = (seconds) => {
            seconds = Number(seconds);

            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor(seconds % (3600 * 24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);

            return `${d}d ${h}h ${m}m ${s}s`;
        };

        let aliveMsg = `
╔════════════════════════════╗
     ⚡ BOT ALIVE ⚡
   🌿 SITHIJA - MD SYSTEM 🌿
╚════════════════════════════╝

👋 SYSTEM STATUS ➜ ONLINE 🟢
⚡ SPEED         ➜ ${ping}ms
⏰ UPTIME        ➜ ${runtime(uptime)}
💾 RAM USAGE     ➜ ${ram} MB
🖥 PLATFORM      ➜ ${os.platform()}
🟢 NODE VERSION  ➜ ${process.version}

━━━━━━━━━━━━━━━━━━━━━━
🛡 SYSTEM DETAILS
━━━━━━━━━━━━━━━━━━━━━━

⚙ MODE      ➜ PUBLIC
📚 LIBRARY   ➜ BAILEYS
👑 OWNER     ➜ SITHIJA
📍 COUNTRY   ➜ SRI LANKA

━━━━━━━━━━━━━━━━━━━━━━
✨ STATUS MESSAGE
━━━━━━━━━━━━━━━━━━━━━━
🌸 Bot Running Smoothly...
🚀 All Systems Operational
💎 Ultra Performance Active

╚════════════════════════════╝
   ⚡ POWERED BY SITHIJA MD ⚡
`;

        await danuwamd.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveMsg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
