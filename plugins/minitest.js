const { cmd } = require("../command");

cmd({
pattern: "test",
react: "✅",
desc: "Button Test",
category: "test",
filename: __filename
},
async (conn, mek, m, { from }) => {

await conn.sendMessage(
from,
{
text: "🌸 BUTTON WORKING",
footer: "SITHIJA MD",
templateButtons: [
{
index: 1,
quickReplyButton: {
displayText: "PING",
id: ".ping"
}
}
]
},
{
quoted: mek
}
);

});
