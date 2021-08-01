const moment = require("moment");
const { getConnection } = require("../../backend/functions")
module.exports = {
    name: 'weekly',
    aliases: [],
    category: "Economy",
    description: "gives you money that can be claimed by the week",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    run: async (client, message, args) => {
        // if (message.deletable) return message.delete().then(msg => msg.channel.send("This command has been deactivated").then(msg => msg.delete({ timeout: 3000 })))
        const conn = await getConnection();
        const cooldownData = await conn.query(`SELECT * FROM MemberCooldowns WHERE memberId = '${message.author.id}'`);
        let format = 'HH:mm:ss:SSS DD/MM/YYYY';
        let currentDate = moment();
        let prevDate;
        let nextDate = currentDate.clone().add(7, 'days');
        if (cooldownData[0].length == 0 || cooldownData[0][0] == undefined) {
            conn.query(`INSERT INTO MemberCooldowns (memberId, weeklyCooldown) VALUES ('${message.author.id}', '${nextDate.format(format)}')`);
            const moneyData = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = ${message.member.id}`);
            if (moneyData[0].length == 0 || moneyData[0][0] == undefined) {
                conn.query(`INSERT INTO MemberEconomy (memberId) VALUES ('${message.author.id}')`);
                conn.query(`UPDATE MemberEconomy SET memberMoney = memberMoney + 2000 WHERE memberId = ${message.member.id}`);
                message.channel.send(`Congrats \`${message.author.username}\`, you claimed your first weekly M2000!`);
                return;
            }
            let money = moneyData[0][0].memberMoney + 2000;
            conn.query(`UPDATE MemberEconomy SET memberMoney = ${money} WHERE memberId = ${message.member.id}`);
            message.channel.send(`Congrats \`${message.author.username}\`, you claimed your first weekly M2000!`);
        }
        else {
            let amountOfMillisecondsLeft;
            let amountOfWeeks;
            let amountOfDays;
            let amountOfHours;
            let amountOfMinutes;
            let amountOfSeconds;
            if (cooldownData[0][0].weeklyCooldown != '') {
                let enddate = cooldownData[0][0].weeklyCooldown.split(' ');
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

            if (cooldownData[0][0].weeklyCooldown == '') amountOfMillisecondsLeft = 0;

            if (amountOfMillisecondsLeft <= 0) {
                const moneyData = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = ${message.member.id}`);
                let money = moneyData[0][0].memberMoney + 2000;

                conn.query(`UPDATE MemberCooldowns SET weeklyCooldown = '${nextDate.format(format)}' WHERE memberId = ${message.member.id}`);
                conn.query(`UPDATE MemberEconomy SET memberMoney = ${money} WHERE memberId = ${message.member.id}`);

                message.channel.send(`You claimed M2000!\nYour balance is now \`M${money}\``);
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
                message.channel.send(`not so fast \`${message.author.username}\`!\nGet more weekly points ${text}`)
            }
        }
    }
}