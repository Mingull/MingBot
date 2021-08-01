module.exports = {
    name: 'ping',
    aliases: ["latency"],
    category: "General",
    description: "Returns latency and API ping",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        // if (message.deletable) message.delete();
        const msg = await message.channel.send(`🏓 Pinging...`);
        msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }
}