const { cmd, commands } = require("../command");
const config = require("../config");

const pendingMenu = {};

cmd({
  pattern: "menu",
  react: "⚡",
  desc: "Button category menu",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, sender, pushname, reply }) => {

  try {

    const commandMap = {};

    for (const command of commands) {
      if (command.dontAddCommandList) continue;

      const category = (command.category || "OTHER").toUpperCase();

      if (!commandMap[category]) commandMap[category] = [];
      commandMap[category].push(command);
    }

    const categories = Object.keys(commandMap);

    // 🔥 CREATE BUTTONS DYNAMICALLY
    const buttons = categories.slice(0, 10).map((cat, i) => {
      return {
        buttonId: `cat_${cat}`,
        buttonText: { displayText: `${i + 1}. ${cat}` },
        type: 1
      };
    });

    const buttonMessage = {
      image: { url: config.MENU_IMAGE },
      caption: `
━━━━━━━━━━━━━━━━━━
     ⚡ SITHIJA MD MENU ⚡
━━━━━━━━━━━━━━━━━━

👤 User : ${pushname}
🟢 Status : ONLINE

👉 Select Category Below
━━━━━━━━━━━━━━━━━━
`,
      footer: "⚡ POWERED BY SITHIJA MD",
      buttons: buttons,
      headerType: 4
    };

    await conn.sendMessage(from, buttonMessage, { quoted: mek });

    pendingMenu[sender] = {
      commandMap,
      categories
    };

  } catch (e) {
    console.log(e);
    reply("❌ Error: " + e);
  }
});
