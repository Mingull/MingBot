const { getConnection, getCachedMessageReactions, setCachedMessageReactions } = require("../../backend/functions")

module.exports = async (Discord, client, reaction, user) => {
    const removeMemberRole = (results) => {
        results.forEach(result => {
            if (result.emojiId === reaction.emoji.id) {
                let role = reaction.message.guild.roles.cache.get(result.roleId);
                let member = reaction.message.guild.members.cache.get(user.id);
                if (role && member) {
                    member.roles.remove(role);
                    return result.emojiId;
                }
            }
        })
    }
    if (reaction.message.partial) {
        await reaction.message.fetch()
        const conn = await getConnection();
        let { id, guild } = reaction.message;
        const data = await conn.query(`SELECT * FROM GuildReactionRole WHERE guildId = '${guild.id}' and MessageId = '${id}'`)
        try {
            if (!data[0].length == 0 || !data[0][0] == undefined) {
                const results = data[0]
                const arr = [];
                removeMemberRole(results);
                results.forEach(result => {
                    arr.push({ emojiId: result.emojiId, roleId: result.roleId })
                })
                setCachedMessageReactions(id, arr);
            }
            else {
                return;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        const results = getCachedMessageReactions(reaction.message.id);
        if (results == undefined || results.length == 0) return;
        removeMemberRole(results);
    }
}