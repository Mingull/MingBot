module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Music",
    description: "Play music",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const music = args.join(" ");
        client.distube.play(message, music);
    }
}