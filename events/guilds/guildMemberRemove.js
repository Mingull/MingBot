const { getWelcomeChannels } = require("../../backend/functions");

module.exports = async (Discord, client, member) => {
    const { guild } = member;

    const channelId = getWelcomeChannels().get(guild.id);
    if (!channelId) return console.log("channelId not found");

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return console.log("channel not found");

    channel.send(`Sad to see ${member.username} go\nWe now have \`${guild.memberCount} members\``);
}