const express = require("express");
const { getConnection, setGuildCommandPrefixes } = require('../../backend/functions');
const client = require("../../index")

const categoryConfig = require("../../commands/config.json");
const { validateGuild } = require("../modules/middleware");
const { rankCard, cooldownFormatter } = require("../modules/functions")

const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const conn = await getConnection();
    const rankCardResults = await conn.query(`SELECT * FROM MemberRankCard WHERE memberId = '${res.locals.user.id}'`)
    let economyResults = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = '${res.locals.user.id}'`)
    if (economyResults[0].length == 0 || economyResults[0][0] == undefined) {
        conn.query(`INSERT INTO MemberEconomy (memberId) VALUES ('${res.locals.user.id}')`)
        economyResults = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = '${res.locals.user.id}'`)
    }
    const hourlyCooldownValues = await cooldownFormatter(res.locals.user, "hourly")
    const dailyCooldownValues = await cooldownFormatter(res.locals.user, "daily")
    const weeklyCooldownValues = await cooldownFormatter(res.locals.user, "weekly")
    const monthlyCooldownValues = await cooldownFormatter(res.locals.user, "monthly")

    res.render('dashboard/index', {
        page: "Dashboard",
        rankCardImage: (await rankCard(res.locals.user, rankCardResults[0][0].color, rankCardResults[0][0].backgroundType, rankCardResults[0][0].background)).toString(),
        rankCardValues: rankCardResults[0][0],
        user: res.locals.user,
        economyValues: economyResults[0][0],
        hourlyCooldownValues: hourlyCooldownValues,
        dailyCooldownValues: dailyCooldownValues,
        weeklyCooldownValues: weeklyCooldownValues,
        monthlyCooldownValues: monthlyCooldownValues
    })
});

router.get('/server/:id', validateGuild, async (req, res) => {
    const conn = await getConnection();

    const result = await conn.query(`SELECT * FROM GuildConfigurable WHERE guildId = '${res.locals.guild.id}'`)
    const prefix = result[0][0].cmdPrefix;
    const modLogId = result[0][0].modLogId;
    res.render('dashboard/show',
        {
            page: res.locals.guild.name,
            guild: res.locals.guild,
            categories: categoryConfig,
            prefix: prefix,
            modLogId: modLogId
        }
    )
});

router.put('/server/:id/:module', validateGuild, async (req, res) => {
    const conn = await getConnection();
    try {
        const { id, module } = req.params;
        if (module == 'general') {
            const { prefix } = req.body;
            if (!prefix) return res.render('errors/400');
            conn.query(`UPDATE GuildConfigurable SET cmdPrefix = '${prefix}' WHERE guildId = '${id}'`);
            setGuildCommandPrefixes(id, prefix);
        }
        else if (module == 'moderation') {
            const { modLogId } = req.body;
            if (!modLogId) return res.render('errors/400');
            conn.query(`UPDATE GuildConfigurable SET modLogId = '${modLogId}' WHERE guildId = '${id}'`);
        }
        res.redirect(`/servers/${id}`);
    } catch (err) {
        res.render('errors/400');
        throw err;
    }
});

router.post('/server/:id/:module', validateGuild, async (req, res) => {
    const { id, module } = req.params;
    try {
        if (module === 'general') {
            const { channel: channelId, message } = req.body;

            const guild = client.guilds.cache.find(g => g.id === id)
            if (!guild) return res.render('errors/400')
            const channel = guild.channels.cache.find(c => c.id === channelId)
            if (!channel) return res.render('errors/400')
            channel.send(message);
        }
        res.redirect(`/servers/${id}`);
    } catch (err) {
        res.render('errors/400')
        throw err
    }
})

module.exports = router;
