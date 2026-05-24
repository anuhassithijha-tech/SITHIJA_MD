const { cmd, commands } = require("../command");
const config = require("../config");

const menuImage =
  config.MENU_IMAGE ||
  "https://files.catbox.moe/5w0t9b.jpg";

// MENU COMMAND
cmd({
  pattern: "menu",
  react: "🌸",
  desc: "Modern Selectable Menu",
  category: "main",
  filename: __filename
},
async (conn, mek, m, {
  from,
  pushname,
  reply
}) => {

  try {

    // CATEGORY GROUP
    const grouped = {};

    for (const c of commands) {

      if (c.dontAddCommandList)
        continue;

      const cat = (
        c.category || "other"
      ).toUpperCase();

      if (!grouped[cat])
        grouped[cat] = [];

      grouped[cat].push(c);
    }

    // MENU ROWS
    const rows = [];

    Object.keys(grouped).forEach(cat => {

      rows.push({
        title: `${cat} MENU`,
        description: `Open ${cat} commands`,
        rowId: `.open_${cat}`
      });

    });

    // SEND LIST MENU
    await conn.sendMessage(
      from,
      {
        image: { url: menuImage },

        caption:
`╭━━━〔 🌸 SITHIJA-MD 🌸 〕━━━⬣

👋 Welcome ${pushname}

⚡ Modern Selectable Menu
📂 Click Button Below

╰━━━━━━━━━━━━━━━━⬣`,

        footer: "SITHIJA-MD",

        title: "🌸 MAIN MENU",

        buttonText: "SELECT MENU",

        sections: [
          {
            title: "🌸 MENU LIST",
            rows: rows
          }
        ]
      },
      { quoted: mek }
    );

  } catch (e) {

    console.log(e);
    reply(`${e}`);

  }
});

// OPEN CATEGORY
cmd({
  on: "body"
},
async (conn, mek, m, {
  from,
  body,
  reply
}) => {

  try {

    if (!body.startsWith(".open_"))
      return;

    const category =
      body.replace(".open_", "");

    // GROUP COMMANDS AGAIN
    const grouped = {};

    for (const c of commands) {

      if (c.dontAddCommandList)
        continue;

      const cat = (
        c.category || "other"
      ).toUpperCase();

      if (!grouped[cat])
        grouped[cat] = [];

      grouped[cat].push(c);
    }

    const cmds = grouped[category];

    if (!cmds)
      return reply("❌ Menu Not Found");

    // CREATE MENU TEXT
    let text =
`╭━━━〔 🌸 ${category} MENU 🌸 〕━━━⬣

`;

    cmds.forEach((c, i) => {

      text +=
`┃ ${i + 1}. ${config.PREFIX}${c.pattern}
┃ 🌸 ${c.desc || "No Description"}

`;

    });

    text +=
`╰━━━━━━━━━━━━━━━━⬣

📊 Total Commands : ${cmds.length}

> ⚡ POWERED BY SITHIJA-MD`;

    // SEND CATEGORY MENU
    await conn.sendMessage(
      from,
      {
        image: { url: menuImage },
        caption: text
      },
      { quoted: mek }
    );

  } catch (e) {

    console.log(e);

  }
});
