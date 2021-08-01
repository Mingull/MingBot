module.exports = {
    name: "loop",
    aliases: ["repeat"],
    category: "Music",
    description: "Loop music",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        client.distube.setRepeatMode(message, parseInt(args[0]));
    }
}