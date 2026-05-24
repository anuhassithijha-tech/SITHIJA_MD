cmd({
pattern: "testbtn",
category: "test"
},
async (conn, mek, m, {
from
}) => {

await conn.sendMessage(from, {
text: "BUTTON TEST",
footer: "SITHIJA",
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
}, {
quoted: mek
});

});
