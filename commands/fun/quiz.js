const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: 'quiz',
    aliases: [],
    category: 'Fun',
    description: "Start a quiz",
    cooldown: 0,
    args: false,
    run: async (client, message, args) => {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=boolean");
        const data = await response.json();
        var length = data.results.length;
        var randomIndex = Math.floor(Math.random() * length);
        var randomQuestion = data.results[randomIndex];
        var question = randomQuestion.question;
        var correctAnswer = randomQuestion.correct_answer;

        message.channel.send(question).then(msg => msg.delete({ timeout: 11000 }));
        const filter = m => m.author.id === message.author.id;
        const answer = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            .catch(cld => message.channel.send("You didn't answer in time"));
        const ans = answer.first();
        if (ans.content.toLowerCase() === correctAnswer.toLowerCase()) {
            message.channel.send('Correct').then(msg => msg.delete({ timeout: 1000 }));
        } else {
            message.channel.send('Incorrect').then(msg => msg.delete({ timeout: 1000 }));
        }
    }
}