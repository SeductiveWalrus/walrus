const fs = require("fs");

module.exports = () =>{
    console.log("Loading commands...");
    let commands = {}, i = 0;
    const commandFiles = fs.readdirSync("./commands")
    commandFiles.map(name =>{
        commands[name.split(".")[0]] = require("./commands/" + name);
        i++;
    });
    console.log(i + " commands successfully loaded");
    return commands;
};