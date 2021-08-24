const { MessageEmbed, Client, Message } = require("discord.js");
const { getConnection } = require("../../backend/functions")

module.exports = {
    name: 'beg',
    category: 'economy',
    aliases: [],
    description: "Beg for money",
    private: false,
    args: false,
    cooldown: 300,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const conn = await getConnection();

        const randomNum = RandomNum(10, 100);
        const embed = new MessageEmbed()
            .setTitle(`${message.author.username} you broke son of a bitch`)
            .setDescription(`you got \`M${randomNum}\` because you begged for it`)
        // const result = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = '${message.author.id}'`);
        // if (result[0].length == 0 || result[0][0] == undefined) {
        //     conn.query(`INSERT INTO MemberEconomy ('memberId') VALUES ('${message.author.id}')`)
        // } else {
        //     const money = result[0][0].memberMoney + randomNum
        //     conn.query(`UPDATE MemberEconomy SET memberMoney = '${money}' WHERE memberId = '${message.author.id}'`)
        // }
        message.channel.send(embed);
    }
}

/**
 * Give you a random number between a min and max
 * @param {Number} min set the minimum number
 * @param {Number} max set the maximum number
 * @returns a random number between a num and max
 */
function RandomNum(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
}
