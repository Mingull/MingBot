module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Music",
    description: "Play music",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        const music = args.join(" ");
        client.distube.play(message, music);
    }
}