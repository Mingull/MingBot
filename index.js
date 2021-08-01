require("dotenv").config({ path: "./backend/.env" });
const Discord = require('discord.js');
const DisTube = require('distube');
const fs = require('fs');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.events = new Discord.Collection();

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
client.distube = distube;

client.login(process.env.TOKEN);

["command", "event", "distube"].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord);
});

module.exports = client;

require('./dashboard/server');
// client.on("message", async message => {
// const member = functions.getMember(message, answers[0])
// const categoryChannel = message.guild.channels.cache.find(c => c.name === "Tickets" && c.type === "category")
// const channel = await message.guild.channels.create(`test`,
//     { nsfw: false, type: "text", topic: "Test", parent: categoryChannel.id })
// channel.send()
// })
// client.on("messageReactionAdd", async (reaction, user) => {
//     console.log(reaction)
//     console.log(user)
// })