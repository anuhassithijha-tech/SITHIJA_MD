const { cmd } = require('../command');
const config = require('../config');
const os = require("os");

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (danuwamd, mek, m, {
    from, pushname, reply
}) => {
    try {

        const start = Date.now();

        const uptimeSec = process.uptime();
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const seconds = Math.floor(uptimeSec % 60);

        const latency = Date.now() - start;

        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const totalRam = Math.round(os.totalmem() / 1024 / 1024);
        const ramUsage = Math.round((os.totalmem() - os.freemem()) / 1024 / 1024);

        const caption = `☘︎ s ɪ ᴛ ʜ ɪ ᴊ ᴀ  ᴍ ᴅ | ᴠ1.0.0 ☘︎

👋 ${pushname || "User"} 💗! ʏᴏᴜʀ sʏsᴛᴇᴍ ɪs ʀᴜɴɴɪɴɢ ᴘᴇʀғᴇᴄᴛʟʏ

╭─ s ʏ s ᴛ ᴇ ᴍ  s ᴛ ᴀ ᴛ s ⊷
│ 📗 sᴛᴀᴛᴜs : ᴏɴʟɪɴᴇ
│ 📟 ᴠᴇʀsɪᴏɴ : 1.0.0
│ 🛡️ ᴍᴏᴅᴇ : ᴘᴜʙʟɪᴄ
│ ⚡ ʟᴀᴛᴇɴᴄʏ : ${latency}ms
│ ⏳ ᴜᴘᴛɪᴍᴇ : ${hours}h ${minutes}m ${seconds}s
│ 🕒 ᴛɪᴍᴇ : ${time}
│ 📅 ᴅᴀᴛᴇ : ${date}
╰──────────⊷

╭─ s ᴇ ʀ ᴠ ᴇʀ  ɪɴғᴏ ⊷
│ 🍀 ʀᴀᴍ : ${ramUsage}MB / ${totalRam}MB
│ 🪴 ɴᴏᴅᴇ : ${process.version}
│ ☁️ ʜᴏsᴛ : Koyeb
╰──────────⊷

> ✦ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɪᴛʜɪᴊᴀ`;

        return await danuwamd.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: caption
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error: " + e.message);
    }
});
