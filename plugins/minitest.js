const { cmd } = require("../command");

cmd({
pattern: "test2",
category: "test"
},
async (conn, mek, m, { from }) => {

await conn.sendMessage(from,{
text:
"🌸 BUTTON TEST 🌸\n\nReply .ping"
},{
quoted: mek
});

});
