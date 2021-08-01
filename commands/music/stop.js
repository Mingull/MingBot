module.exports = {
    name: "stop",
    aliases: [""],
    category: "Music",
    description: "Stop the music",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        client.distube.stop(message);
        message.channel.send("Stopped the music!");
    }
}