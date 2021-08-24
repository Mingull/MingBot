const fs = require('fs');
// const ascii = require('ascii-table');
const chalk = require("chalk");

// const table = new ascii().setHeading(chalk.blue('#'), chalk.yellow('Category'),
//     chalk.blue('Command'),
//     chalk.green('status')).removeBorder().setHeadingAlign(ascii.LEFT);

// module.exports = (client, Discord) => {
//     let num = 0;
//     fs.readdirSync("./commands/").filter(dir => !dir.endsWith(".json")).forEach(dir => {
//         const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
//         for (const command of commands) {
//             const pull = require(`../commands/${dir}/${command}`);
//             num++;
//             if (pull.name) {
//                 client.commands.set(pull.name, pull);
//                 table.addRow(chalk.blue(num),
//                     chalk.yellow(pull.category),
//                     chalk.blue(command),
//                     chalk.green("Success!"));
//             } else {
//                 table.addRow(chalk.blue(num),
//                     chalk.green("No category?"),
//                     chalk.blue(command),
//                     chalk.red("Failed!"));
//                 continue;
//             }

//             if (pull.aliases && Array.isArray(pull.aliases))
//                 pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
//         }
//     });
//     console.log(table.toString());
//     module.exports.commands = client.commands;
// }
module.exports = (client, Discord) => {
    let num = 0;
    const table = [];
    fs.readdirSync("./commands/").filter(dir => !dir.endsWith(".json")).forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
        for (const command of commands) {
            const pull = require(`../commands/${dir}/${command}`);
            num++;
            if (pull.name && pull.category) {
                client.commands.set(pull.name, pull);
                table.push({ "name": command, "category": pull.category, "status": "Success!" });
            } else {
                table.push({ "name": command, "category": `${pull.category ? pull.category : "No category?"}`, "status": "Failed!" });
                continue;
            }
            if (!pull.category) { }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.table(table);
    module.exports.commands = client.commands;
}