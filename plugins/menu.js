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

    const speed = Math.floor(Math.random() * 100);

    const menu = `
╭───────────────❍
│ 🟢 SYSTEM STATUS
├───────────────❍
│ 💻 VERSION : 1.0.0
│ ⚡ LATENCY : ${speed}MS
│ 👤 USER : ${pushname}
╰───────────────❍

╭───────────────❍
│ 📂 CATEGORIES
├───────────────❍
│ 🌿 1 │ DOWNLOAD
│ 🌿 2 │ GROUP
│ 🌿 3 │ OWNER
│ 🌿 4 │ SYSTEM
│ 🌿 5 │ SEARCH
╰───────────────❍

📌 REPLY WITH NUMBER (1-5)
`;

    const sent = await conn.sendMessage(
        from,
        {
            image: { url: menuImage },
            caption: menu
        },
        { quoted: mek }
    );

    const msgId = sent.key.id;

    conn.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        const replyId =
            msg.message.extendedTextMessage?.contextInfo?.stanzaId;

        if (replyId === msgId) {

            let txt = "";

            switch (text) {

                case "1":
                    txt = `
╭──〔 📥 DOWNLOAD MENU 〕──❍
│ 🌿 .tiktok  - Download TikTok videos
│ 🌿 .fb      - Download Facebook videos
│ 🌿 .song    - Download songs/mp3
│ 🌿 .video   - Download videos
╰────────────────❍`;
                    break;

                case "2":
                    txt = `
╭──〔 👥 GROUP MENU 〕──❍
│ 🌿 .kick         - Remove group member
│ 🌿 .jid          - Get group/user jid
│ 🌿 .forward      - Forward messages
│ 🌿 .tagall       - Mention all members
│ 🌿 .setpp        - Change group profile
│ 🌿 .admins       - Show admins list
│ 🌿 .add/.invite  - Add members
│ 🌿 .promote      - Promote member
│ 🌿 .demote       - Demote admin
│ 🌿 .unmute/.open - Open group chat
│ 🌿 .close/.mute  - Close group chat
│ 🌿 .revoke       - Reset invite link
│ 🌿 .link/.grouplink - Get group link
│ 🌿 .setsubject   - Change group name
│ 🌿 .setdesc      - Change description
│ 🌿 .groupinfo/.ginfo - Group details
╰────────────────❍`;
                    break;

                case "3":
                    txt = `
╭──〔 👑 OWNER MENU 〕──❍
│ 🌿 .owner - Show bot owner
╰────────────────❍`;
                    break;

                case "4":
                    txt = `
╭──〔 ⚙️ SYSTEM MENU 〕──❍
│ 🌿 .alive   - Bot online status
│ 🌿 .ping    - Check bot speed
│ 🌿 .menu    - Open menu
│ 🌿 .uptime  - Bot running time
╰────────────────❍`;
                    break;

                case "5":
                    txt = `
╭──〔 🔎 MOVIE MENU 〕──❍
│ 🌿 .movie     - Search movies
│ 🌿 .cinesubz  - Search Cinesubz
│ 🌿 .cinetv    - Search CineTV
╰────────────────❍`;
                    break;

                default:
                    txt = "❌ Invalid Number";
            }

            await conn.sendMessage(
                from,
                {
                    text: txt
                },
                { quoted: msg }
            );
        }
    });

});
