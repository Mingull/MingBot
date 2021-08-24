const { MessageEmbed, Client, Message } = require("discord.js");
const fetch = require("node-fetch")
module.exports = {
    name: 'meme',
    aliases: [],
    category: 'Fun',
    description: "Get a meme",
    cooldown: 0,
    args: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        fetch("https://www.reddit.com/r/memes/random/.json")
            .then(response => response.json())
            .then(response => {
                var permalink = response[0].data.children[0].data.permalink;
                var memeURL = `https://www.reddit.com${permalink}`;
                var memeImg = response[0].data.children[0].data.url;
                var memeTitle = response[0].data.children[0].data.title;
                const embed = new MessageEmbed()
                    .setTitle(`${memeTitle}`)
                    .setURL(`${memeURL}`)
                    .setImage(`${memeImg}`)

                message.channel.send({ embeds: [embed] })
            })
            .catch(err => console.error(err))
    }
}