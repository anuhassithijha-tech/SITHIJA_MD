const { cmd, commands } = require("../command");
const config = require("../config");

const menuImage =
  config.MENU_IMAGE ||
  "https://files.catbox.moe/5w0t9b.jpg";

cmd({
  pattern: "menu",
  react: "🌸",
  desc: "Selectable Menu",
  category: "main",
  filename: __filename
},
async (conn, mek, m, {
  from,
  pushname
}) => {

  try {

    const grouped = {};

    for (const c of commands) {

      if (c.dontAddCommandList) continue;

      const cat = (
        c.category || "other"
      ).toUpperCase();

      if (!grouped[cat])
        grouped[cat] = [];

      grouped[cat].push(c);
    }

    const sections = [
      {
        title: "🌸 SITHIJA-MD MENU",
        rows: []
      }
    ];

    Object.keys(grouped).forEach(cat => {

      sections[0].rows.push({
        title: `${cat} MENU`,
        description: `Open ${cat} commands`,
        rowId: `.open_${cat}`
      });

    });

    await conn.sendMessage(from, {
      image: { url: menuImage },
      caption:
`╭━━━〔 🌸 SITHIJA-MD 🌸 〕━━━⬣

👋 Welcome ${pushname}

⚡ Modern Selectable Menu
📂 Click Button Below

╰━━━━━━━━━━━━━━━━⬣`,
      footer: "SITHIJA-MD",
      buttonText: "SELECT MENU",
      sections
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
  }
});

Object.keys(require.cache).forEach(() => {

  cmd({
    on: "body"
  },
  async (conn, mek, m, {
    from,
    body,
    reply
  }) => {

    if (!body.startsWith(".open_"))
      return;

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

    const category =
      body.replace(".open_", "");

    const cmds = grouped[category];

    if (!cmds)
      return reply("❌ Menu Not Found");

    let text =
`╭━━━〔 🌸 ${category} MENU 🌸 〕━━━⬣

`;

    cmds.forEach(c => {

      text += `┃ ✦ ${config.PREFIX}${c.pattern}
┃ 🌸 ${c.desc || "No Description"}

`;

    });

    text += `╰━━━━━━━━━━━━━━━━⬣

📊 Total Commands : ${cmds.length}

> ⚡ POWERED BY SITHIJA-MD`;

    await conn.sendMessage(from, {
      image: { url: menuImage },
      caption: text
    }, { quoted: mek });

  });

});
