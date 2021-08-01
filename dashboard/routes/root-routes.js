const express = require("express");
const client = require("../../index");
const { getConnection } = require("../../backend/functions");

const categoryConfig = require("../../commands/config.json");
const { commands } = require("../../handler/command");
const { validateGuild } = require("../modules/middleware");

const router = express.Router();

router.get('/', (req, res) => res.render('index'))

router.get('/commands', (req, res) => res.render('commands', {
    page: 'Commands',
    categories: categoryConfig,
    commands: Array.from(commands.values()),
    commandsString: JSON.stringify(Array.from(commands.values()))
}))
router.get('/dash', (req, res) => {
    res.redirect('/dashboard');
})

router.get('/leaderboard/:id', validateGuild, async (req, res) => {
    const conn = await getConnection();
    if (!res.locals.user === undefined || !res.locals.user === null) {
        const results = await conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${res.locals.guild.id}' ORDER BY memberLevel DESC, memberXP DESC, messageCount DESC LIMIT 5`);
        res.render('dashboard/leaderboard', {
            page: res.locals.guild.name,
            guild: res.locals.guild,
            results: results[0]
        })
    } else {
        const guild = client.guilds.cache.find(g => g.id === req.params.id);
        const results = await conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${guild.id}' ORDER BY memberLevel DESC, memberXP DESC, messageCount DESC LIMIT 5`);
        res.render('dashboard/leaderboard', {
            page: guild.name,
            guild: guild,
            results: results[0]
        })
    }
});

router.put('/userSettings/:module', async (req, res) => {
    const { module } = req.params;
    const conn = await getConnection()
    if (module == 'Theme') {
        const { theme } = req.body;
        res.locals.theme = theme;
        console.log(res.locals.theme);
        res.redirect('/dashboard')
    } else if (module == 'RankCard') {
        const { rankColor, bgColor, bgImage } = req.body;
        const bgType = bgImage ? 'IMAGE' : 'COLOR'
        const background = bgImage ? bgImage : bgColor
        conn.query(`UPDATE MemberRankCard SET color = '${rankColor}', background = '${background}', backgroundType = '${bgType}' WHERE memberId = '${res.locals.user.id}'`)
        res.redirect('/dashboard');
    }
})

module.exports = router;