const { MessageEmbed, Collection, Client, Message } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    aliases: [],
    category: "Moderation",
    description: "add a reaction role",
    usage: "<amount of winners> <duration> <channel mention> <prize>",
    private: false,
    args: true,
    cooldown: 0,
    permissions: 'MANAGE_MESSAGES',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const winnersAmount = args[0];

        const time = args[1];
        if (!time) return message.channel.send("You did not specify a time!");

        if (!time.endsWith("d") && !time.endsWith("h") && !time.endsWith("m") && !time.endsWith("s"))
            return message.channel.send("You need to use d (days), h (hours), m (minutes) or s (seconds)");

        const giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) return message.channel.send("I cannot find that channel in this server");

        const prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send("Argument missing. whats the prize?");

        message.delete();

        var embed = new MessageEmbed()
            .setTitle(`Hosted by: ${message.author.tag}`)
            .setDescription(`react with :tada: to enter the giveaway!\n**Time:** ${time}\n**Prize:** ${prize}\n**Amount of winners:** ${winnersAmount == 1 ? `1 member` : `${winnersAmount} members`}`)
            .setTimestamp(Date.now() + ms(time))
            .setColor(3447003);

        const n = await giveawayChannel.send({ embeds: [embed] });
        n.react("🎉");

        setTimeout(async () => {
            await n.reactions.cache.get("🎉").users.fetch();
            if (n.reactions.cache.get("🎉").users.cache.size <= 1) {
                embed.setTitle(":tada: Giveaway Ended! :tada:")
                    .addField("Winner", `${client.user}`)
                    .addField("Prize", prize)
                    .setDescription("No one has enter the giveaway so i win!:tada:")
                return n.edit({ embeds: [embed] })
            }
            if (winnersAmount <= 1) {
                const winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                embed.setTitle(":tada: Giveaway Ended! :tada:")
                    .addField("Winner", `${winner}`)
                    .addField("Prize", prize)
                    .setDescription("")
                giveawayChannel.send(`Congratulations ${winner} has won **${prize}**`)
            } else {
                const winners = [];
                for (let i = 0; i < winnersAmount; i++) {
                    if (n.reactions.cache.get("🎉").users.cache.size - 1 < winnersAmount) {
                        winners.push(n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random());
                        break;
                    } else {
                        const winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                        if (!winners.includes(winner)) winners.push(winner)
                        else i--;
                    }
                }
                embed.setTitle(":tada: Giveaway Ended! :tada:")
                    .addField(`${winners.length <= 1 ? 'Winner' : 'Winners'}`, `${winners.length <= 1 ? winners.map(winner => winner).join(" ") : winners.map(winner => winner).join(", ")}`)
                    .addField("Prize", prize)
                    .setDescription("")
                giveawayChannel.send(`Congratulations ${winners.length <= 1 ? winners.map(winner => winner).join(" ") : winners.map(winner => winner).join(", ")} has won **${prize}**`)
            }
            n.edit({ embeds: [embed] })
        }, ms(time))


        // var item = "";
        // var time;
        // var winnerCount;

        // winnerCount = args[0];
        // time = args[1];
        // item = args.splice(2, args.length).join(" ");

        // if (!winnerCount) return message.channel.send("Please provide a number of people who can win");
        // if (!time) return message.channel.send("Please provide a duration");
        // if (!item) return message.channel.send("Please provide a winning item");

        // // message.delete();

        // var date = new Date().getTime();
        // var dateEnd = new Date(date + (time * 1000));
        // var embed = new MessageEmbed()
        //     .setTitle("🎉 **GIVEAWAY** 🎉")
        //     .setFooter(`ends in: ${dateEnd}`)
        //     .setDescription(item)

        // var embedSend = await message.channel.send({ embeds: [embed] });
        // embedSend.react('🎉');

        // setTimeout(() => {
        //     var random = 0;
        //     var winners = [];
        //     var inList = false;

        //     return console.log(embedSend.reactions.cache.get('🎉').users.cache);
        //     var peopleReacted = embedSend.reactions.cache.get('🎉').users.cache.array();

        //     for (let i = 0; i < peopleReacted.length; i++) {
        //         if (peopleReacted[i].id == client.user.id) {
        //             peopleReacted.splice(i, 1);
        //             continue;
        //         }
        //     }

        //     if (peopleReacted.length == 0) {
        //         return message.channel.send("🎉Yeah! I have won because no one reacted")
        //     }
        //     if (peopleReacted.length < winnerCount) {
        //         return message.channel.send("🎉Yeah! I won because there weren't enough people participating");
        //     }

        //     for (let i = 0; i < winnerCount; i++) {
        //         inList = false;
        //         random = Math.floor(Math.random() * peopleReacted.length);
        //         for (let y = 0; y < winners.length; y++) {
        //             if (winners[y] == peopleReacted[random]) {
        //                 inList = true;
        //                 i--;
        //                 break;
        //             }
        //         }
        //         if (!inList) {
        //             winners.push(peopleReacted[random]);
        //         }
        //     }

        //     for (let i = 0; i < winners.length; i++) {
        //         message.channel.send(`Congratulation ${winners[i].username} has won **${item}**`)
        //     }

        // }, time * 1000)
        // setTimeout(() => {
        //     return console.log(embedSend.reactions.cache.get('🎉'));
        // }, (time * 2) * 1000)
    }
}