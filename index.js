const { Message } = require("eris");

const Eris = require("eris"),
token = require("./token.json").token,
commands = require("./commands")(),
config = require("./config.json"),
bot = new Eris(token);

let listeningTo = {};

bot.connect();

bot.on("ready", () =>{
    console.log("Bot connected")
});

// Event handler for new message
bot.on("messageCreate", async (msg) =>{
    if(msg.author.bot === true) return;
    // if DM
    if(msg.channel.type === 1){
        // Pre-declare fields of text of embed to be sent to admin channel 
        let fields = [
            {
                name: "Message",
                value: (msg.content ? msg.content : "<No Message>"),
                inline: false
            },
            {
                name: "User ID",
                value : msg.author.id,
                inline: true
            }
        ];

        let attachments;
        if(msg.attachments.length > 0){
            attachments = [];
            for(i = 0; i < msg.attachments.length; i++){
                // Append new text field for each attachment
                fields.push(
                    {
                        name: `Attachment ${i + 1}`,
                        value: msg.attachments[i].url,
                        inline: false
                    }
                );
                // Append url of each attachment to send in new message after embed
                attachments.push(msg.attachments[i].url);
            }
        }

        // Send embed to admin channel
        bot.createMessage(config.adminChannel, {
            embed: {
                title: "Someone slid in Walrus' DMs",
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL 
                },
                fields: fields
            }
        });

        // Send attachments url outside of embed to display in channel 
        if(attachments){
            bot.createMessage(config.adminChannel, attachments.join(" "));
        }
        // If message isn't DM and contains trigger
    }else if(config.commandTriggers.includes(msg.content) && ){
        // Set listening state of uid to true 
        listeningTo[msg.author.id] = true;
        // TODO: Set listening state to false after command is recognized
        // but before it is processed 

        // Respond to trigger with random response
        bot.createMessage(msg.channel.id, config.responses[Math.floor(Math.random() * (config.responses.length))]);
    } 
});