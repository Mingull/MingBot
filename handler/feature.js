// const fs = require('fs');
// const ascii = require('ascii-table');
// const table = new ascii().setHeading('#', 'feature', 'Load status');
// module.exports = (client, Discord) => {
//     fs.readdirSync("./features/").forEach(dir => {
//         const features = fs.readdirSync(`./features/${dir}`).filter(f => f.endsWith(".js"));
//         var num = 0;
//         for (const feature of features) {
//             const pull = require(`../features/${dir}/${feature}`);
//             const pullName = feature.split('.')[0]
//             num++;
//             pull.bind(null, Discord, client)
//             client.features.set(pullName, pull)
//             table.addRow(num, feature, "✔ -> Succesfully loaded!")
//         }
//     })
//     console.log(table.toString());
// }