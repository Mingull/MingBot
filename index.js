require("module-alias/register");
require("dotenv").config({ path: "./backend/.env" });
const Discord = require('discord.js');
const { Intents, Client, Collection } = Discord;
const DisTube = require('distube');
const fs = require('fs');

const intents = new Intents();
intents.add(Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_WEBHOOKS);
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
    intents,
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: true,
    }
});

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.categories = fs.readdirSync("./commands/");
client.events = new Collection();

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
client.distube = distube;

client.login(process.env.TOKEN);

["command", "event", "distube"].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord);
});

module.exports = client;

require('./dashboard/server');
// client.on("messageCreate", async message => {
//     const channel = message.guild.channels.cache.find(channel => channel.id === "873529712255860768")
//     console.log(channel)
// })
// client.on("messageReactionAdd", async (reaction, user) => {
//     console.log(reaction)
//     console.log(user)
// })

// const statuses = [
//     { afk: false, status: "online", activity: { name: client.guilds.cache.size == 1 ? `${client.guilds.cache.size} server` : `${client.guilds.cache.size} servers`, type: "WATCHING" } },
//     // { afk: false, status: "dnd", activity: { name: "This bot is in development", type: "PLAYING" } },
//     // { afk: false, status: "idle", activity: { name: "This bot is made by Mingull#2901", type: "PLAYING", url: "https://mingull.tk/" } },
//     // { afk: false, status: "online", activity: { name: `"${defaultPrefix}help" for help`, type: "WATCHING" } }
// ];
// let i = 0;
// client.user.setPresence(statuses[i]);
// setInterval(() => {
//     i++;
//     let status = statuses[i];

//     if (!status) {
//         status = statuses[0];
//         i = 0;
//     }
//     client.user.setPresence(status);
// }, 1000 * 30);