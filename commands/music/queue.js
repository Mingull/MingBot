module.exports = {
    name: "queue",
    aliases: ["q"],
    category: "Music",
    description: "View the music queue",
    usage: "",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
}