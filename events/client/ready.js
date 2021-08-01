const { defaultPrefix } = require("../../backend/config.json")
const { setGuildCommandPrefixes, getConnection, getGuildCommandPrefixes, getQueue, getWelcomeChannels, setWelcomeChannels } = require("../../backend/functions");
module.exports = async (Discord, client) => {
    const conn = await getConnection();
    console.log(`Hi, ${client.user.tag} has started.\nserving ${client.users.cache.size} users in ${client.channels.cache.size} channels in ${client.guilds.cache.size} servers\n`);

    let num = 0;
    const colors = ["\x1b[36m%s\x1b[0m", "\x1b[32m%s\x1b[0m"];
    var color;
    client.guilds.cache.forEach((g) => {
        const isOdd = num % 2;
        isOdd == 0 ? color = colors[0] : color = colors[1];
        console.log(color, `serving ${g.name}[${g.nameAcronym}](${g.id}) with ${g.memberCount} users in ${g.channels.cache.size} channel`);
        num += 1;
    });

    const statuses = [
        { afk: false, status: "online", activity: { name: client.guilds.cache.size == 1 ? `${client.guilds.cache.size} server` : `${client.guilds.cache.size} servers`, type: "WATCHING" } },
        // { afk: false, status: "dnd", activity: { name: "This bot is in development", type: "PLAYING" } },
        // { afk: false, status: "idle", activity: { name: "This bot is made by Mingull#2901", type: "PLAYING", url: "https://mingull.tk/" } },
        { afk: false, status: "online", activity: { name: `"${defaultPrefix}help" for help`, type: "WATCHING" } }
    ];
    let i = 0;
    client.user.setPresence(statuses[i]);
    setInterval(() => {
        i++;
        let status = statuses[i];

        if (!status) {
            status = statuses[0];
            i = 0;
        }
        client.user.setPresence(status);
    }, 1000 * 30);

    client.guilds.cache.forEach(guild => {
        conn.query(`SELECT * FROM GuildConfigurable WHERE guildId = '${guild.id}'`)
            .then(result => {
                setGuildCommandPrefixes(guild.id, result[0][0].cmdPrefix)
                if (result[0][0].welcomeChannelId) setWelcomeChannels(guild.id, result[0][0].welcomeChannelId)
            })
            .catch(err => { console.error(err); })
    })
    // setTimeout(() => {
    //     console.log(getGuildCommandPrefixes());
    // }, 500);
}

// client.guilds.cache.size == 1 ? `${client.guilds.cache.size} server` : `${client.guilds.cache.size} servers`