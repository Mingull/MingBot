const fs = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('#', 'Event', 'Load status');
module.exports = (client, Discord) => {
    var num = 0;
    fs.readdirSync("./events/").forEach(dir => {
        const events = fs.readdirSync(`./events/${dir}`).filter(f => f.endsWith(".js"));
        for (const event of events) {
            const pull = require(`../events/${dir}/${event}`);
            const pullName = event.split('.')[0];
            num++;
            client.on(pullName, pull.bind(null, Discord, client));
            table.addRow(num, event, "Succesfully loaded!");
        }
    });
    console.log(table.toString());
}