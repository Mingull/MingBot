module.exports = {
    name: 'deposit',
    aliases: ["depo"],
    category: "Economy",
    description: "Returns latency and API ping",
    usage: "",
    private: false,
    run: async (client, message, args) => {
        if (message.deletable) message.delete().then(msg => msg.channel.send("This command has been deactivated").then(msg => msg.delete({ timeout: 3000 })))
    }
}