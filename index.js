const Eris = require("eris"),
token = require("./token.json").token,
commands = require("./commands")(),
bot = new Eris(token);

bot.connect();

bot.on("ready", () =>{
    console.log("Bot connected")
});
