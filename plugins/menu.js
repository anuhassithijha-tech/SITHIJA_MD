const { cmd } = require('../command');

cmd({
    pattern: "menu",
    react: "📜",
    desc: "Show selectable menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {

    const menuText = `╭━━━〔 *GHOST X MENU* 〕━━━⬣
┃
┃ 👋 Hello ${pushname}
┃
┃ 1️⃣ Download Menu
┃ 2️⃣ Search Menu
┃ 3️⃣ Group Menu
┃ 4️⃣ Owner Menu
┃ 5️⃣ Fun Menu
┃
╰━━━━━━━━━━━━━━⬣

Reply with a number to select a menu.`;

    const sentMsg = await conn.sendMessage(from, {
        text: menuText
    }, { quoted: mek });

    // Save message id for reply checking
    global.menuReplies = global.menuReplies || {};
    global.menuReplies[sentMsg.key.id] = true;
});

// Reply Handler
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, reply }) => {

    if (!mek.message?.extendedTextMessage?.contextInfo?.stanzaId) return;

    const repliedMsgId = mek.message.extendedTextMessage.contextInfo.stanzaId;

    if (!global.menuReplies || !global.menuReplies[repliedMsgId]) return;

    switch (body) {
        case '1':
            return reply(`📥 *Download Menu*

.song
.video
.apk
.play`);

        case '2':
            return reply(`🔍 *Search Menu*

.google
.yts
.weather`);

        case '3':
            return reply(`👥 *Group Menu*

.kick
.add
.promote`);

        case '4':
            return reply(`👑 *Owner Menu*

.restart
.shutdown
.block`);

        case '5':
            return reply(`😂 *Fun Menu*

});
