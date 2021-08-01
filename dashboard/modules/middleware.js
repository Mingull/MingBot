const client = require('../../index');
const sessions = require('./sessions');

module.exports.updateGuilds = async (req, res, next) => {
    try {
        const key = res.cookies.get('key');
        if (key) {
            const { guilds } = await sessions.get(key);
            res.locals.guilds = guilds;
        }
    } finally {
        return next();
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const key = res.cookies.get('key');
        if (key) {
            const { authUser } = await sessions.get(key);
            res.locals.user = authUser;
        }
    } finally {
        return next();
    }
};

module.exports.validateGuild = async (req, res, next) => {
    if (res.locals.guilds === undefined || res.locals.guilds === null) {
        res.locals.guild = client.guilds.cache.find(g => g.id === req.params.id);
    } else {
        res.locals.guild = res.locals.guilds.find(g => g.id === req.params.id);
    }
    return (res.locals.guild)
        ? next()
        : res.render('errors/404');
}

module.exports.validateUser = async (req, res, next) => {
    return (res.locals.user)
        ? next()
        : res.render('errors/401');
};