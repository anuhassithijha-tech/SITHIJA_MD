const os = require("os");
const moment = require("moment-timezone");
const { cmd } = require("../command");

cmd({
    pattern: "alive",
    react: "🎋",
    desc: "Bot alive status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {

    try {

        const uptime = process.uptime();

        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const ramUsage = (
            process.memoryUsage().heapUsed / 1024 / 1024
        ).toFixed(2);

        const totalRam = (
            os.totalmem() / 1024 / 1024
        ).toFixed(0);

        // ⚡ SAFE LATENCY (index compatible)
        const latency = Math.abs(Date.now() - (mek.messageTimestamp * 1000 || Date.now()));

        // 🔥 AUTO NAME FIX (index compatible)
        const name = pushname || await conn.getName(from) || "User";

        const time = moment().tz("Asia/Colombo").format("hh:mm A");
        const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");

        const aliveText = `
☘︎ s ɪ ᴛ ʜ ɪ ᴊ ᴀ  ᴍ ᴅ | ᴠ1.0.0 ☘︎

👋 ${name} 💗! ʏᴏᴜʀ sʏsᴛᴇᴍ ɪs ʀᴜɴɴɪɴɢ ᴘᴇʀғᴇᴄᴛʟʏ

╭─ s ʏ s ᴛ ᴇ ᴍ  s ᴛ ᴀ ᴛ s ⊷
│ 📗 sᴛᴀᴛᴜs : ᴏɴʟɪɴᴇ
│ 📟 ᴠᴇʀsɪᴏɴ : 1.0.0
│ 🛡️ ᴍᴏᴅᴇ : ᴘᴜʙʟɪᴄ
│ ⚡ ʟᴀᴛᴇɴᴄʏ : ${latency}ms
│ ⏳ ᴜᴘᴛɪᴍᴇ : ${hours}h ${minutes}m ${seconds}s
│ 🕒 ᴛɪᴍᴇ : ${time}
│ 📅 ᴅᴀᴛᴇ : ${date}
╰──────────⊷

╭─ ᴏ ᴡ ɴ ᴇ ʀ  ɪ ɴ ғ ᴏ ⊷
│ 👤 ᴏᴡɴᴇʀ : sɪᴛʜɪᴊᴀ
│ 🌿 ʟɪʙʀᴀʀʏ : ʙᴀɪʟᴇʏs
│ 📍 ʟᴏᴄᴀᴛɪᴏɴ : sʀɪ ʟᴀɴᴋᴀ
╰──────────⊷

╭─ s ᴇ ʀ ᴠ ᴇʀ  ɪɴғᴏ ⊷
│ 🍀 ʀᴀᴍ : ${ramUsage}MB / ${totalRam}MB
│ 🪴 ɴᴏᴅᴇ : ${process.version}
│ ☁️ ʜᴏsᴛ : Koyeb
╰──────────⊷

✅ Use .menu to access commands
✅ Use .owner for support

> 「 ®sɪᴛʜɪᴊᴀ ✘ ᴍᴅ v1.0.0 」
> ✦ ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɪᴛʜɪᴊᴀ ✦
`;

        await conn.sendMessage(from, {
            text: aliveText
        }, {
            quoted: mek
        });

    } catch (e) {
        console.log(e);
        reply(String(e));
    }
});
