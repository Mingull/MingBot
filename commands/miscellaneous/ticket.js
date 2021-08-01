const { ReactionCollector, MessageEmbed } = require("discord.js");
const { getMember } = require("../../backend/functions");

module.exports = {
    name: 'ticket',
    description: "Create a ticket",
    aliases: [],
    category: "Miscellaneous",
    args: false,
    cooldown: 0,
    run: async (client, message, args) => {
        const { author, guild } = message;
        const ticketChannel = message.guild.channels.cache.find(c => c.name == `ticket-${author.username.toLowerCase()}${author.discriminator}`)
        if (ticketChannel) {
            // console.log(ticketChannel);
            const embed = new MessageEmbed()
                .setTitle(`${client.user.username}'s Ticket support`)
                .setDescription(`You already have a ticket. [ [Click!](https://discord.com/channels/762701688540233828/${ticketChannel.id}) ]`)
            return message.channel.send(embed);
        };
        const questions = require("./ticketQuestions.json");

        let time = 1000 * 120
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username}'s Ticket support`)
            .setDescription(`Welcome to the ${client.user.username}'s ticket support.\nPlease respond with a number that corresponds to the correct category of your problem.\n\n\`1.\` General support. (if you have a general issue, choose me)\n\`2.\` Member report. (if you want to report a member or staff, choose me)\n\`3.\` Ban appeal. (if you have been banned from mc server, choose me)\n\nOtherwise if you want to cancel respond with \`cancel\``.trim())
            .setFooter(`You have ${time / 1000} seconds to respond\nMade by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        const answers = [];
        let category = '';

        const filter = (m) => m.author.id === message.author.id;
        var msgDM = await message.author.send(embed)
        var collection = await msgDM.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
            .catch(collected => message.author.send("You didn't answer in time"));

        if (collection.first().content === '1') {
            category = questions.general.category;
            for (const q of questions.general.questions) {
                time = 1000 * 120;
                embed.setTitle(category)
                    .setDescription(`${q.question}\n${q.description}`)
                    .setFooter(`You have ${q.time} seconds to respond\nMade by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                msgDM = await message.author.send(embed)
                collection = await msgDM.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
                    .catch(collected => message.author.send("You didn't answer in time"));
                answers.push(collection.first().content);
            }

            // if they want to submit the ticket
            embed.setTitle(`${client.user.username}'s Ticket support`)
                .setDescription(`Please check the ticket description below and if you are happy to submit a ticket please type \`submit\` to finish\nIf you need to cancel the ticket please type \`cancel\`.\nCategory: **${category}**`)
                // .addField(`**${questions.general.questions[0].question}**`, `${answers[0]}`)
                // .addField(`**${questions.general.questions[1].question}**`, `${answers[1]}`)
                .setFooter(`Go to ${guild}\nMade by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            questions.general.questions.forEach((q, key) => {
                embed.addField(`**${q.question}**`, `${answers[key]}`)
            });

            msgDM = await message.author.send(embed)
            collection = await msgDM.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
                .catch(collected => message.author.send("You didn't answer in time"));

            if (collection.first().content === "submit") {
                const member = getMember(message, answers[0])
                // console.log(member);
                const categoryChannel = message.guild.channels.cache.find(c => c.name === "Tickets" && c.type === "category")
                const channel = await message.guild.channels.create(`ticket-${member.user.username}${member.user.discriminator}`,
                    { nsfw: false, type: "text", topic: "Test", parent: categoryChannel.id, })
                embed.setDescription(`Successfully created a ticket for you. [ [Click me!](https://discord.com/channels/762701688540233828/${channel.id}) ]`)
                    .fields = []
                message.author.send(embed)

                embed.setTitle(`${client.user.username}'s Ticket support`)
                    .setDescription(`This is a **${category}** Ticket`)
                questions.general.questions.forEach((q, key) => {
                    embed.addField(`**${q.question}**`, `${answers[key]}`)
                });
                return channel.send(embed);

            } else if (collection.first().content === "cancel") {
                return message.author.send("The ticket has been canceled")
            }

        } else if (collection.first().content === '2') {
            embed.setDescription(`This is being made`)
            return message.author.send(embed)
        } else if (collection.first().content === '3') {
            embed.setDescription(`This is being made`)
            return message.author.send(embed)
        } else if (collection.first().content === 'cancel') {
            return message.author.send("The ticket has been canceled")
        } else {
            return;
            // return message.author.send("That is not a option")
        }
        // author.send(answers);
        // author.send(`${ questions[counter].question }\n${ questions[counter++].description }`)
    }
}



// First general question
            // time = 1000 * 120;
            // embed.setTitle(category)
            //     .setDescription(`${questions.general.questions[0].question}\n${questions.general.questions[0].description}`)
            //     .setFooter(`You have ${time / 1000} seconds to respond\nMade by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
            //     .setTimestamp();
            // // First general answer
            // msgDM = await message.author.send(embed)
            // collection = await msgDM.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
            //     .catch(collected => message.author.send("You didn't answer in time"));
            // answers.push(collection.first().content);

            // // Second general question
            // time = 1000 * 240;
            // embed.setDescription(`${questions.general.questions[1].question}\n${questions.general.questions[1].description}`)
            //     .setFooter(`You have ${time / 1000} seconds to respond\nMade by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
            //     .setTimestamp();
            // // Second general answer
            // msgDM = await message.author.send(embed)
            // collection = await msgDM.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
            //     .catch(collected => message.author.send("You didn't answer in time"));
            // answers.push(collection.first().content);