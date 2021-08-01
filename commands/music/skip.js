module.exports = {
    name: "skip",
    aliases: [""],
    category: "Music",
    description: "skip the music",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        client.distube.skip(message);
    }
}