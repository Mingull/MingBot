const canvacord = require('canvacord');
const moment = require('moment');
const { Image, createCanvas } = require("canvas");
const { getConnection } = require('../../backend/functions')

/**
 * Returns the rank image data url
 * @param {Object} user the user object data
 * @param {String} color the color for the required XP and progress bar
 * @param {"COLOR"|"IMAGE"} bgType if the background is a COLOR or a IMAGE
 * @param {String|Buffer} bgData the background color or image
 * @returns data url
 */
async function rankCard(user, color, bgType, bgData) {
    if (!user) throw "There is no user object data"
    if (!color) color = "#00ffff"
    if (!bgType) bgType = 'COLOR'
    if (!bgData) bgData = "#23272A"

    const rank = new canvacord.Rank()
        .setCurrentXP(0)
        .setLevel(0)
        .setRequiredXP(100, color)
        .setStatus('online')
        .setProgressBar(color, "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setAvatar(user.avatarUrl())
        .setBackground(bgType, bgData)
    const data = await rank.build();

    const canvas = createCanvas(934, 282)
    const ctx = canvas.getContext('2d');

    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.onerror = err => { throw err }
    img.src = data

    return canvas.toDataURL()
}

module.exports.rankCard = rankCard;

/**
 * 
 * @param {Object} user 
 * @param {"hourly"|"daily"|"weekly"|"monthly"} cooldown 
 * @returns 
 */
async function cooldownFormatter(user, cooldown) {
    const conn = await getConnection();
    const cooldownData = await conn.query(`SELECT * FROM MemberCooldowns WHERE memberId = '${user.id}'`);
    let currentDate = moment();
    let prevDate;
    if (cooldownData[0].length == 0 || cooldownData[0][0] == undefined) {
        conn.query(`INSERT INTO MemberCooldowns (memberId, hourlyCooldown, dailyCooldown, weeklyCooldown, monthlyCooldown) VALUES ('${user.id}', "", "", "", "")`);
        return 'no data'
    } else {
        let amountOfMillisecondsLeft;
        let amountOfWeeks;
        let amountOfDays;
        let amountOfHours;
        let amountOfMinutes;
        let amountOfSeconds;
        let cooldownType;
        if (cooldown === 'hourly') {
            cooldownType = cooldownData[0][0].hourlyCooldown
        } else if (cooldown === 'daily') {
            cooldownType = cooldownData[0][0].dailyCooldown
        } else if (cooldown === 'weekly') {
            cooldownType = cooldownData[0][0].weeklyCooldown
        } else if (cooldown === 'monthly') {
            cooldownType = cooldownData[0][0].monthlyCooldown
        } else {
            return "no data"
        }
        if (cooldownType != '') {
            let enddate = cooldownType.split(' ');
            let enddates = enddate[1].split('/');

            let endtimes = enddate[0].split(':');

            let day = enddates[0];
            let month = enddates[1];
            let year = enddates[2];

            let hours = endtimes[0];
            let minutes = endtimes[1];
            let seconds = endtimes[2];
            let milliseconds = endtimes[3];

            prevDate = moment([year, month, day, hours, minutes, seconds, milliseconds], 'YYYYMD HH:mm:ss:SSS');

            amountOfMillisecondsLeft = prevDate.diff(currentDate);
            amountOfWeeks = prevDate.diff(currentDate, 'weeks');
            amountOfDays = prevDate.diff(currentDate, 'days');
            amountOfHours = prevDate.diff(currentDate, 'hours');
            amountOfMinutes = prevDate.diff(currentDate, 'minutes');
            amountOfSeconds = prevDate.diff(currentDate, 'seconds');
        }

        if (cooldownType == '') amountOfMillisecondsLeft = 0;

        if (!amountOfMillisecondsLeft <= 0) {
            let days = amountOfDays - (amountOfWeeks * 7);
            let hours = amountOfHours - (amountOfDays * 24)
            let minutes = amountOfMinutes - (amountOfHours * 60);
            let seconds = amountOfSeconds - (amountOfMinutes * 60);

            const arr = { weeks: amountOfWeeks, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: amountOfMillisecondsLeft }

            return arr;
        } else {
            return 'no data'
        }
    }
}

module.exports.cooldownFormatter = cooldownFormatter;