const OauthClient = require("disco-oauth");
const config = require("../../backend/config.json");

const client = new OauthClient(config.bot.id, config.bot.secret);
client.setRedirect(`${config.dashboardURL}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;