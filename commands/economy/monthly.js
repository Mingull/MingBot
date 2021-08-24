const { Client, Message } = require("discord.js");
const moment = require("moment");
const { getConnection } = require("../../backend/functions")
module.exports = {
    name: 'monthly',
    aliases: [],
    category: "Economy",
    description: "gives you money that can be claimed by the month",
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
        const conn = await getConnection();
        const cooldownData = await conn.query(`SELECT * FROM MemberCooldowns WHERE memberId = '${message.author.id}'`);
        let format = 'HH:mm:ss:SSS DD/MM/YYYY';
        let currentDate = moment();
        let prevDate;
        let nextDate = currentDate.clone().add(4, 'week');
        if (cooldownData[0].length == 0 || cooldownData[0][0] == undefined) {
            conn.query(`INSERT INTO MemberCooldowns (memberId, monthlyCooldown) VALUES ('${message.author.id}', '${nextDate.format(format)}')`);
            const moneyData = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = ${message.member.id}`);
            if (moneyData[0].length == 0 || moneyData[0][0] == undefined) {
                conn.query(`INSERT INTO MemberEconomy (memberId) VALUES ('${message.author.id}')`);
                conn.query(`UPDATE MemberEconomy SET memberMoney = memberMoney + 10000 WHERE memberId = ${message.member.id}`);
                message.channel.send(`Congrats \`${message.author.username}\`, you claimed your first monthly M10000!`);
                return;
            }
            let money = moneyData[0][0].memberMoney + 10000;
            conn.query(`UPDATE MemberEconomy SET memberMoney = ${money} WHERE memberId = ${message.member.id}`);
            message.channel.send(`Congrats \`${message.author.username}\`, you claimed your first monthly M1000!`);
        }
        else {
            let amountOfMillisecondsLeft;
            let amountOfWeeks;
            let amountOfDays;
            let amountOfHours;
            let amountOfMinutes;
            let amountOfSeconds;
            if (cooldownData[0][0].monthlyCooldown != '') {
                let enddate = cooldownData[0][0].monthlyCooldown.split(' ');
                let enddates = enddate[1].split('/');

                let endtimes = enddate[0].split(':');

                let day = enddates[0];
                let month = enddates[1];
                let year = enddates[2];

                let hours = endtimes[0];
                let minutes = endtimes[1];
                let seconds = endtimes[2];
                let milliseconds = endtimes[3];

                prevDate = moment([year, month, day, hours, minutes, seconds, milliseconds], 'YYYYMD HH:mm:ss:SSS');

                amountOfMillisecondsLeft = prevDate.diff(currentDate);
                amountOfWeeks = prevDate.diff(currentDate, 'weeks');
                amountOfDays = prevDate.diff(currentDate, 'days');
                amountOfHours = prevDate.diff(currentDate, 'hours');
                amountOfMinutes = prevDate.diff(currentDate, 'minutes');
                amountOfSeconds = prevDate.diff(currentDate, 'seconds');
            }

            if (cooldownData[0][0].monthlyCooldown == '') amountOfMillisecondsLeft = 0;

            if (amountOfMillisecondsLeft <= 0) {
                const moneyData = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = ${message.member.id}`);
                let money = moneyData[0][0].memberMoney + 10000;

                conn.query(`UPDATE MemberCooldowns SET monthlyCooldown = '${nextDate.format(format)}' WHERE memberId = ${message.member.id}`);
                conn.query(`UPDATE MemberEconomy SET memberMoney = ${money} WHERE memberId = ${message.member.id}`);

                message.channel.send(`You claimed M10000!\nYour balance is now \`M${money}\``);
            } else {
                let text;
                if (amountOfMillisecondsLeft > 604800000) {
                    days = amountOfDays - (amountOfWeeks * 7);
                    text = `in: \n\`${amountOfWeeks} week(s) and ${days} day(s)\``;
                } else if (amountOfMillisecondsLeft > 86400000) {
                    hours = amountOfHours - (amountOfDays * 24)
                    text = `in: \n\`${amountOfDays} day(s) and ${hours} hour(s)\``;
                } else if (amountOfMillisecondsLeft > 3600000) {
                    minutes = amountOfMinutes - (amountOfHours * 60);
                    text = `in: \n\`${amountOfHours} hour(s) and ${minutes} minute(s)\``;
                } else {
                    seconds = amountOfSeconds - (amountOfMinutes * 60);
                    text = `in: \n\`${amountOfMinutes} minute(s) and ${seconds} second(s)\``;
                }
                message.channel.send(`not so fast \`${message.author.username}\`!\nGet more monthly points ${text}`)
            }
        }
    }
}