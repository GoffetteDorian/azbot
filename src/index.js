const Discord = require("discord.js");
const fs = require("fs");
const {prefix, token} = require("../config.json");
// const {players} = require("/players.json");

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

        // const [pseudo, server];
        const [pseudo, server] = args[0].split("-");

        // fs.writeFile(
        //     "./src/assets/players.json",
        //     JSON.stringify({
        //         [message.author]: {
        //             main: pseudo,
        //             server: server,
        //             armory: `https://worldofwarcraft.com/fr-fr/character/eu/${pseudo}/${server}`,
        //         },
        //     }),
        //     (err) => {
        //         if (err) {
        //             console.error(err);
        //         }
        //     },
        // );

        let users = JSON.parse(
            fs.readFileSync("./src/assets/players.json", "utf-8"),
        );
        console.log(users);
        message.channel.send(
            `Character set for ${message.author}, armory: ${
                users[message.author]
            }`,
        );
    }
});

client.login(token);
