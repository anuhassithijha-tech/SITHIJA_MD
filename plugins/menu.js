const { cmd } = require("../command");
const config = require("../config");

const menuImage =
  config.MENU_IMAGE ||
  "https://files.catbox.moe/5w0t9b.jpg";

cmd({
    pattern: "menu",
    react: "🧬",
    desc: "Simple Menu",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from,
    pushname
}) => {

    try {

        const speed = Math.floor(Math.random() * 100);

        const menu = `
╭─ [ 🟢 ꜱʏꜱᴛᴇᴍ ꜱᴛᴀᴛᴜꜱ ] ─⊷
│ 📟 ᴠᴇʀꜱɪᴏɴ : 1.0.0
│ ⚡ ʟᴀᴛᴇɴᴄʏ : ${speed}ᴍꜱ
│ 👤 ᴜꜱᴇʀ : ${pushname}
╰────────────⊷

╭── [ 📂 ᴄᴀᴛᴇɢᴏʀɪᴇꜱ ] ─⊷
│ ☘︎ 1 ┃ ᴅᴏᴡɴʟᴏᴀᴅꜱ
│ ☘︎ 2 ┃ ɢʀᴏᴜᴘ
│ ☘︎ 3 ┃ ᴏᴡɴᴇʀ
│ ☘︎ 4 ┃ ꜱʏꜱᴛᴇᴍ
│ ☘︎ 5 ┃ ᴍᴏᴠɪᴇ
╰────────────⊷

> 📌 ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ (1-5)
`;

        const sentMsg = await conn.sendMessage(
            from,
            {
                image: { url: menuImage },
                caption: menu
            },
            { quoted: mek }
        );

        const messageID = sentMsg.key.id;

        const listener = async ({ messages }) => {

            const msg = messages[0];
            if (!msg.message) return;

            const text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text;

            const replyId =
                msg.message.extendedTextMessage?.contextInfo?.stanzaId;

            if (replyId !== messageID) return;

            let txt = "";
            let img = menuImage;

            switch (text) {

                case "1":

                    txt = `
╭──〔 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ 〕──⊷
│ ☘︎ .tiktok  - Download TikTok videos
│ ☘︎ .fb      - Download Facebook videos
│ ☘︎ .song    - Download songs/mp3
│ ☘︎ .video   - Download videos
╰────────────⊷`;
                    break;

                case "2":

                    txt = `
╭──〔 👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ 〕──⊷
│ ☘︎ .kick         - Remove group member
│ ☘︎ .jid          - Get group/user jid
│ ☘︎ .forward      - Forward messages
│ ☘︎ .tagall       - Mention all members
│ ☘︎ .setpp        - Change group profile
│ ☘︎ .admins       - Show admins list
│ ☘︎ .add/.invite  - Add members
│ ☘︎ .promote      - Promote member
│ ☘︎ .demote       - Demote admin
│ ☘︎ .unmute/.open - Open group chat
│ ☘︎ .close/.mute  - Close group chat
│ ☘︎ .revoke       - Reset invite link
│ ☘︎ .link/.grouplink - Get group link
│ ☘︎ .setsubject   - Change group name
│ ☘︎ .setdesc      - Change description
│ ☘︎ .groupinfo/.ginfo - Group details
╰────────────⊷`;
                    break;

                case "3":

                    txt = `
╭──〔 👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ 〕──⊷
│ ☘︎ .owner - Show bot owner
╰────────────⊷`;
                    break;

                case "4":

                    txt = `
╭──〔 ⚙️ ꜱʏꜱᴛᴇᴍ ᴍᴇɴᴜ 〕──⊷
│ ☘︎ .alive   - Bot online status
│ ☘︎ .ping    - Check bot speed
│ ☘︎ .menu    - Open menu
│ ☘︎ .uptime  - Bot running time
╰────────────⊷`;
                    break;

                case "5":

                    txt = `
╭──〔 🎬 ᴍᴏᴠɪᴇ ᴍᴇɴᴜ 〕──⊷
│ ☘︎ .movie     - Search movies
│ ☘︎ .cinesubz  - Search Cinesubz
│ ☘︎ .cinetv    - Search CineTV
╰────────────⊷`;
                    break;

                default:
                    txt = "❌ Invalid Number";
            }

            await conn.sendMessage(
                from,
                {
                    image: { url: img },
                    caption: txt
                },
                { quoted: msg }
            );

        };

        conn.ev.on("messages.upsert", listener);

    } catch (e) {
        console.log(e);
    }

});
