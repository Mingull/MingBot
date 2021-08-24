const { Client, Message } = require("discord.js");
const { getConnection } = require("../../backend/functions")
module.exports = {
    name: 'balance',
    aliases: ["bal"],
    category: "Economy",
    description: "Shows you your balance",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // if (message.deletable) return message.delete().then(msg => msg.channel.send("This command has been deactivated").then(msg => msg.delete({ timeout: 3000 })))
        const conn = await getConnection()
        const result = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = '${message.author.id}'`);
        if (!result[0].length == 0 || !result[0][0] == undefined) {
            message.channel.send(`Your wallet balance is \`${result[0][0].memberMoney}\``)
        } else {
            conn.query(`INSERT INTO MemberEconomy (memberId) VALUES ('${message.author.id}')`)
            message.channel.send(`Your wallet balance is \`100\``)
        }
        // message.channel.send(`Your wallet balance is ${profileData.coins}, your bank balance is ${profileData.bank}`)
    }
}