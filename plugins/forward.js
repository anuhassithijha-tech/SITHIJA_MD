const { cmd } = require("../command");
const { downloadMediaMessage, getContentType } = require("@whiskeysockets/baileys");

cmd({
    pattern: "forward",
    alias: ["fv", "fw"],
    desc: "Forward message without watermark (Hybrid Mode)",
    category: "tools",
    use: ".forward <target_jid>",
    react: "📤"
}, async (bot, mek, m, { from, args, reply }) => {
    try {
        if (!mek.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            return reply("❌ *Reply කරපු message එකක් තියෙන්න ඕනේ.*");
        }
        const target = args[0];
        if (!target || !target.includes('@')) {
            return reply("❌ *Invalid JID!*\nඋදා: `.forward 94771234567@s.whatsapp.net`");
        }
        const quoted = mek.message.extendedTextMessage.contextInfo;
        const quotedMsg = quoted.quotedMessage;
        const messageType = getContentType(quotedMsg);
        if (messageType === 'imageMessage' || messageType === 'audioMessage') {
            
            const buffer = await downloadMediaMessage(
                { message: quotedMsg },
                'buffer',
                {},
                { logger: bot.logger, reuploadRequest: bot.updateMediaMessage }
            );

            const mediaType = messageType.replace('Message', '');
            await bot.sendMessage(target, {
                [mediaType]: buffer,
                mimetype: quotedMsg[messageType].mimetype,
                caption: quotedMsg[messageType]?.caption || "",
                fileName: quotedMsg[messageType]?.fileName || undefined,
                contextInfo: { 
                    forwardingScore: 0, 
                    isForwarded: false 
                }
            });

            return reply(`✅ *${mediaType.toUpperCase()} Forwarded Successfully*`);

        }
        else {
            await bot.sendMessage(target, {
                forward: {
                    key: {
                        remoteJid: from,
                        id: quoted.stanzaId,
                        fromMe: false
                    },
                    message: quotedMsg,
                    messageTimestamp: quoted.messageTimestamp || Date.now()
                },
                contextInfo: {
                    forwardingScore: 0,
                    isForwarded: false
                }
            });

            return reply(`✅ *Message Forwarded Successfully*`);
        }

    } catch (err) {
        console.error("Forward Error:", err);
        await reply(`❌ *Forward Failed*\n${err.message || "Unknown error"}`);
    }
});
