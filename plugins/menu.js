const { cmd } = require('../command');
                    title: "👑 Owner Menu",
                    rowId: ".ownermenu",
                    description: "Open owner commands"
                }
            ]
        }
    ];

    await conn.sendMessage(from, {
        text: `👋 Hello ${pushname}

Select a menu from the button below.`,
        footer: 'GHOST X BOT',
        title: '📜 MAIN MENU',
        buttonText: 'SELECT MENU',
        sections
    }, { quoted: mek });
});

// Download Menu
cmd({ pattern: "dlmenu", react: "📥" }, async (conn, mek, m, { reply }) => {
    reply(`📥 *Download Menu*

.song
.video
.apk
.play`);
});

// Search Menu
cmd({ pattern: "searchmenu", react: "🔍" }, async (conn, mek, m, { reply }) => {
    reply(`🔍 *Search Menu*

.google
.yts
.weather`);
});

// Group Menu
cmd({ pattern: "groupmenu", react: "👥" }, async (conn, mek, m, { reply }) => {
    reply(`👥 *Group Menu*

.kick
.add
.promote`);
});

// Owner Menu
cmd({ pattern: "ownermenu", react: "👑" }, async (conn, mek, m, { reply }) => {
    reply(`👑 *Owner Menu*

.restart
.shutdown
.block`);
});
