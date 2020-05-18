const Discord = require("discord.js");
const fs = require("fs");
const {prefix, token} = require("../config.json");
const {players} = require("./assets/players.json");

const client = new Discord.Client();

client.once("ready", () => {
    console.log("rdy!");
});

client.on("message", (message) => {
    if (message === "!h") {
        message.channel.send("HELP");
    }
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === "set-character") {
        if (!args.length) {
            return message.channel.send("Missing arguments!");
        }
        fs.writeFile(
            "./assets/players.json",
            JSON.stringify({...args}),
            (err) => {
                if (err) {
                    console.error(err);
                }
            },
        );
        console.log();
        message.channel.send(`Character for ${message.author}`);
    }
});

client.login(token);
