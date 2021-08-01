// const profileModel = require("../../models/profile-schema");
const { welcomeMessage, getConnection, getWelcomeChannels } = require("../../backend/functions");
const Canvas = require("canvas");
const path = require("path");
const { getChannelId } = require("../../commands/moderation/setwelcome");
// const message = require("./message");

module.exports = async (Discord, client, member) => {
    const { guild } = member;

    const channelId = getWelcomeChannels().get(guild.id);
    if (!channelId) return console.log("channelId not found");

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return console.log("channel not found");

    const rulesChannel = guild.channels.cache.find(c => c.name === 'rules')
    channel.send(`Welcome ${member} to **\`${guild.name}\`**\nYou are the **\`#${guild.memberCount}th member\`**\nPlease you read the rules at **${rulesChannel}**`);

    const role = guild.roles.cache.find(r => r.name == 'Member');
    if (!role) return console.log("Member role not found");
    member.roles.add(role.id);

    const conn = await getConnection()
    conn.query(`INSERT INTO GuildMemberMessage VALUES ('${member.id}', '${guild.id}', '0', '0', '0')`).catch(err => console.error(err))
    conn.query(`INSERT INTO MemberRankCard VALUES ('${member.id}', '#00ffff', '#23272A', 'COLOR') `).catch(err => console.error(err))

    // const canvas = Canvas.createCanvas(700, 250);
    // const ctx = canvas.getContext('2d');

    // const background = await Canvas.loadImage(path.join(__dirname, "../../small background.jpg"))
    // let x = 0;
    // let y = 0;
    // ctx.shadowBlur = 10
    // ctx.drawImage(background, x, y);

    // const pfp = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true }))

    // ctx.fillStyle = '#ffffff';
    // ctx.font = '35px sans-serif';
    // let text = `Welcome ${member.user.tag}`;
    // x = canvas.width / 2 - ctx.measureText(text).width / 2;
    // ctx.fillText(text, x + 100, pfp.height - 10)

    // ctx.font = '32px sans-serif';
    // text = `Member #${guild.memberCount}th`
    // x = canvas.width / 2 - ctx.measureText(text).width / 2;
    // y = 50 + pfp.height;
    // ctx.fillText(text, x, y);

    // ctx.beginPath();
    // ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.clip();
    // ctx.drawImage(pfp, 25, 25, 200, 200);

    // const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${member.user.tag}-${guild.memberCount}.gif`)
    // const rulesChannel = guild.channels.cache.find(c => c.name === 'rules')
    // channel.send(`Welcome ${member} to **\`${guild.name}\`**\nYou are the **\`#${guild.memberCount}th member\`**\nPlease you read the rules at **${rulesChannel}**`, attachment);

    // let profile = await profileModel.create({
    //     userID: member.id,
    //     serverID: member.guild.id,
    //     coins: 500,
    //     bank: 0
    // });

    // profile.save();
}



// const welcomeChannel = member.guild.channels.cache.find(c => c.name == "welcome" && c.type == "text");
// if (!welcomeChannel) {
//     console.log("can't find welcome channel")
// }

// const canvas = Canvas.createCanvas(700, 250);
// const ctx = canvas.getContext('3d');
// const background = await Canvas.loadImage("./welcome.png");
// ctx.drawImage(background, 0, 0, canvas.width,canvas.height);

// const welcomeEmbed = new Discord.MessageEmbed()
//     .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
//     .setDescription(welcomeMessage(member))
//     .setColor("GREEN")
//     .setFooter(`${member.guild.name}`, member.guild.iconURL())

// welcomeChannel.send(welcomeEmbed);