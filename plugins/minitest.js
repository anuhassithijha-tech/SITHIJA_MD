const { cmd } = require("../command");

cmd({
pattern: "testbtn",
react: "✅",
desc: "Button Test",
category: "test",
filename: __filename
},
async (conn, mek, m, {
from,
reply
}) => {

try {

await conn.sendMessage(
from,
{
text: "🌸 BUTTON TEST SUCCESS",
footer: "SITHIJA MD",
buttons: [
{
buttonId: ".ping",
buttonText: {
displayText: "PING"
},
type: 1
}
],
headerType: 1
},
{
quoted: mek
}
);

} catch (e) {

console.log(e);

reply(`${e}`);

}

});
