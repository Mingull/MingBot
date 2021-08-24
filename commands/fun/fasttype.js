const { words } = require("@backend/fast-type-words.json");
const { Client, Message } = require("discord.js");
const example = {
    channelId: {
        message: 'message object',
        stage: 'string',
        counter: 'number',
        currentWord: 'string',
        remainingWords: ['words here'],
        points: {
            userId: 'points'
        }
    }
};
const games = {};
const stages = {
    'STARTING': (counter) => {
        return `A new "Fast Type" game is starting in ${counter}s!`
    },
    'INGAME': (word) => {
        let spacedWord = '';
        for (const char of [...word]) {
            spacedWord += `${char} `;
        }
        return `The new word is  **${spacedWord}**`
    },
    'ENDING': (points) => {
        const sorted = Object.keys(points).sort((a, b) => {
            return points[b] - points[a];
        })
        let results = '';
        for (const key of sorted) {
            const amount = points[key];
            results += `<@${key}> had ${amount} point${amount === 1 ? '' : 's'}\n`;
        }
        return `The game is now over. Here's how everyone did:\n\n${results}-----------------------------`
    }
};

const selectWord = (game) => {
    game.currentWord = game.remainingWords[Math.floor(Math.random() * game.remainingWords.length)]

    const index = game.remainingWords.indexOf(game.currentWord)
    game.remainingWords.splice(index, 1)
}

const gameLoop = () => {
    for (const key in games) {
        const game = games[key];
        const { message, stage } = game;

        if (stage === "STARTING") {
            let string = stages[stage](game.counter)
            message.edit(string)
            if (game.counter <= 0) {
                game.stage = "INGAME";
                game.counter = 15;

                selectWord(game);
                string = stages[game.stage](game.currentWord)
                message.edit(string)
            }
        } else if (stage === "INGAME") {
            if (game.counter <= 0) {
                game.stage = "ENDING";

                const string = stages[game.stage](game.points);
                message.edit(string);

                delete games[key];
                console.log(games);
                continue;
            }
        }
        --game.counter;
    }
    setTimeout(gameLoop, 1000);
};

module.exports = {
    name: "fasttype",
    aliases: ["ft"],
    category: "Fun",
    description: "Start a fast type game",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    permissions: 'MANAGE_MESSAGES',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        client.on("messageCreate", message => {
            const { channel, content, member } = message;
            const { id } = channel;

            const game = games[id];

            if (game && game.currentWord && !member.user.bot) {
                message.delete()
                if (game.stage === 'INGAME' && content.toLowerCase() === game.currentWord.toLowerCase()) {
                    game.currentWord = null;
                    const seconds = 2;
                    const { points } = game;
                    points[member.id] = points[member.id] || 0;

                    message.channel.send(`You won! +1 point (${++points[member.id]} total)`).then(msg => {
                        setTimeout(() => msg.delete(), 999 * seconds)
                    })
                    setTimeout(() => {
                        if (game.stage === 'INGAME') {
                            selectWord(game);
                            const string = stages[game.stage](game.currentWord);
                            game.message.edit(string)
                        }
                    }, 1000 * seconds);
                }
            }
        })
        gameLoop()

        const { channel } = message;

        message.delete();
        channel.send('Preparing game...').then((message) => {
            games[channel.id] = {
                message,
                stage: 'STARTING',
                counter: 5,
                remainingWords: [...words],
                points: {
                    '739483724814614679': 4,
                    '288382736899506176': 6,
                    '701740972714885140': 2
                }
            }
        })
    }
}