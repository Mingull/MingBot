const { MessageEmbed } = require("discord.js");
const { getConnection, getGuildCommandPrefixes, calculateDate, spamCheck } = require("../../backend/functions");
let spamSet = new Set();
module.exports = async (Discord, client, message) => {
    if (message.author.bot) return;
    const conn = await getConnection();
    let guildCommandPrefixes;
    let prefix;
    if (message.guild) {
        guildCommandPrefixes = getGuildCommandPrefixes();
        prefix = guildCommandPrefixes.get(message.guild.id)
    }
    if (message.channel.type == "dm") return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (!message.content.startsWith(prefix)) {
        // spamCheck(message, spamSet, 10000);
        rankSystem(conn, message);
        return;

        // var profileData;
        // try {
        //     profileData = await profileModel.findOne({ userID: message.author.id })
        //     if (!profileData) {
        //         let profile = await profileModel.create({
        //             userID: message.author.id,
        //             serverID: message.guild.id,
        //             coins: 500,
        //             bank: 0
        //         });
        //         profile.save();
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    }
    // const result = await conn.query(`SELECT blacklistedChannelIds FROM GuildConfigurable WHERE guildId = '${message.guild.id}'`);
    // const blacklistedChannelIds = result[0][0].blacklistedChannelIds;
    // console.log(blacklistedChannelIds ? blacklistedChannelIds.split(',').map(r=>r) : null);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    if (command.permissions) {
        if (Array.isArray(command.permissions)) {
            const authorPerms = message.channel.permissionsFor(message.author);
            for (perm of command.permissions) {
                if (!authorPerms || !authorPerms.has(perm)) {
                    return message.channel.send(`You don't have permission to execute this command\nYou are lacking the permission: ${command.permissions.map(perm => `\`${perm}\``)}`);
                }
            }
        } else {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.channel.send(`You don't have permission to execute this command`);
            }
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // const { cooldowns } = client;

    // if (!cooldowns.has(command.name)) {
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const now = Date.now();
    // const timestamps = cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown || 3) * 1000;

    // if (timestamps.has(message.author.id)) {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         const timeLeftCalc = calculateDate(timeLeft, "Array")
    //         if(timeLeftCalc.centuries > 0)
    //         // if (timeLeft < 60) {
    //         //     return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    //         // } else if (timeLeft >= 60 && timeLeft <= 3599) {
    //         //     return message.reply(`please wait ${(timeLeft / 60).toFixed(1)} more minute(s) before reusing the \`${command.name}\` command.`);
    //         // } else if (timeLeft >= 3600 && timeLeft <= 86399) {
    //         //     return message.reply(`please wait ${(timeLeft / 3600).toFixed(1)} more hour(s) before reusing the \`${command.name}\` command.`);
    //         // } else if (timeLeft >= 86400 && timeLeft <= 604799) {
    //         //     return message.reply(`please wait ${(timeLeft / 3600).toFixed(1)} more day(s) before reusing the \`${command.name}\` command.`);
    //         // } else if (timeLeft >= 604800 && timeLeft <= 2419199) {
    //         //     return message.reply(`please wait ${(timeLeft / 3600).toFixed(1)} more week(s) before reusing the \`${command.name}\` command.`);
    //         // } else if (timeLeft >= 2419200) {
    //         //     return message.reply(`please wait ${(timeLeft / 3600).toFixed(1)} more month(s) before reusing the \`${command.name}\` command.`);
    //         // }
    //     }
    // }
    // timestamps.set(message.author.id, now);
    // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.run(client, message, args)
    } catch (err) { console.log(err); }
}

function rankSystem(conn, message) {
    conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${message.guild.id}' AND memberId = '${message.author.id}'`)
        .then(result => {
            // return console.log(result[0] == 0);
            if (result[0] == 0) {
                var randomXp = RandomXp(15, 20);
                conn.query(`INSERT INTO GuildMemberMessage (memberId, guildId, memberXP) VALUES ('${message.author.id}', '${message.guild.id}', '${randomXp}')`).catch(err => console.log(err));;
                console.log("I inserted the data to the database");
            } else {
                var memberId = result[0][0].memberId;
                var levelMember = result[0][0].memberLevel;
                var xpMember = result[0][0].memberXP;
                var randomXp = RandomXp(15, 20);
                var nextLvlXp = levelMember == 0 ? 100 : levelMember >= 15 ? levelMember * 750 : levelMember >= 10 ? levelMember * 600 : levelMember >= 5 ? levelMember * 450 : levelMember * 300;
                var newXP = xpMember + randomXp;

                if (nextLvlXp == 0) nextLvlXp = 100;

                if (newXP >= nextLvlXp) {
                    levelMember = levelMember + 1;
                    conn.query(`UPDATE GuildMemberMessage SET memberLevel = '${levelMember}' WHERE memberId = '${memberId}' AND guildId = '${message.guild.id}'`)
                        .catch(err => console.log(err));
                    const embed = new MessageEmbed()
                        .setColor("#5cff5c")
                        .addField('Level', levelMember)
                        .addField('XP Till next level up', (nextLvlXp));
                    message.channel.send(`GG ${message.author}, you leveled up!`, embed);
                }
                conn.query(`UPDATE GuildMemberMessage SET memberXP = '${newXP}', messageCount = '${result[0][0].messageCount + 1}' WHERE memberId = '${memberId}' AND guildId = '${message.guild.id}'`)
                    .catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
}
/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function RandomXp(min, max) {
    var randomXp = Math.floor(Math.random() * (max - min)) + min;
    return randomXp;
}


// const rankLevels = {
//     level1: 300,
//     level2: 600,
//     level3: 900,
//     level4: 1200,
//     level5: 1500,
//     level6: 1800,
//     level7: 2800,
//     level8: 3200,
//     level9: 3600,
//     level10: 4000,
//     level11: 4400,
//     level12: 4800,
//     level13: 5200,
//     level14: 5600,
//     level15: 6000,
//     level16: 6400,
//     level17: 6800,
//     level18: 3200,
//     level19: 3600,
//     level20: 4000
// }

// for (var i = 0; i < 21; i++) {
//     var level = 1;
//     var xp = level == 0 ? 100 : level >= 15 ? level * 750 : level >= 10 ? level * 600 : level >= 5 ? level * 450 : level * 300
//     console.log(`${level}, ${xp}`)
// }