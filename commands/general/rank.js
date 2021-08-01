const { MessageAttachment } = require("discord.js");
const { Rank } = require("canvacord");
const { getConnection, getMember } = require("../../backend/functions");

module.exports = {
    name: "rank",
    aliases: ["level", "lvl"],
    category: "General",
    description: "Shows you your or the mentioned members rank",
    args: false,
    usage: "[mention member | member id]",
    run: async (client, message, args) => {
        const conn = await getConnection();
        const member = getMember(message, args.join(" "))
        const rank = new Rank()
            .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
        const result = await conn.query(`SELECT * FROM GuildMemberMessage WHERE memberId = '${member.id}' AND guildId = '${message.guild.id}'`)
        if (result[0] == 0) {
            conn.query(`INSERT INTO GuildMemberMessage (memberId, guildId) VALUES ('${member.id}', '${message.guild.id}')`).catch(err => console.log(err));
            conn.query(`INSERT INTO MemberRankCard (memberId, color, background) VALUES ('${member.id}', '${message.guild.id}')`).catch(err => console.log(err));
            var rankPos = undefined;
            conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${message.guild.id}' and memberId = '${member.id}'`).then(result => {
                rankPos = result[0][0].id;
                rank.setRank(rankPos);
            }).catch(err => console.log(err));
            rank.setCurrentXP(0)
                .setLevel(0)
                .setRequiredXP(100, "#00ffff")
                .setStatus(member.user.presence.status)
                .setProgressBar("#00ffff", "COLOR")
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator)
                .setBackground('COLOR', '#23272a')
        } else {
            var rankPos = undefined;
            const rankPosResults = await conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${message.guild.id}' ORDER BY memberLevel DESC, memberXP DESC`)
            rankPosResults[0].forEach((result, key) => {
                if (member.id === result.memberId) {
                    rankPos = key + 1;
                    rank.setRank(rankPos);
                }
            })
            const memberSettings = await conn.query(`SELECT * FROM MemberRankCard WHERE memberId = '${member.id}'`)
            const level = result[0][0].memberLevel
            let requiredXP = level == 0 ? 100 : level >= 15 ? level * 750 : level >= 10 ? level * 600 : level >= 5 ? level * 450 : level * 300;
            rank.setCurrentXP(result[0][0].memberXP)
                .setLevel(result[0][0].memberLevel)
                .setRequiredXP(requiredXP)
                .setStatus(member.user.presence.status)
                .setProgressBar(memberSettings[0][0].color, "COLOR")
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator)
                .setBackground(memberSettings[0][0].backgroundType, memberSettings[0][0].background)
        }
        rank.build().then(data => {
            const attachment = new MessageAttachment(data, "rank.png");
            message.channel.send(attachment);
        })
    }
}