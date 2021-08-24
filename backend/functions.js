const guildCommandPrefixes = new Map();
const welcomeChannels = new Map();
const cachedMessageReactions = new Map();
module.exports = {
    /**
     * Get a connection with the database
     * @returns connection
     */
    getConnection: async () => { // Connects to the database
        const connection = await require("./../database/db");
        if (!connection) throw "Could not connect to the database"
        return connection;
    },

    /**
     * Get the guild command prefixes mappings
     * @param {String} guildId get the prefix through the guildId
     * @returns guildCommandPrefixes
     */
    getGuildCommandPrefixes: (guildId) => { // gets the guildCommandPrefixes cache
        return guildCommandPrefixes.get(guildId);
    },
    /**
     * Set the guild command prefixes mappings
     * @param {String} guildId the guild id
     * @param {String} prefix the prefix to set for the guild
     */
    setGuildCommandPrefixes: (guildId, prefix) => { // sets the guildCommandPrefixes cache
        guildCommandPrefixes.set(guildId, prefix);
    },
    /**
     * Get the cached message reaction mappings
     * @returns cachedMessageReaction map
     */
    getCachedMessageReactions: (value) => {
        return cachedMessageReactions.get(value);
    },
    /**
     * Set the cached message reaction mappings
     * @param {String} messageId The message id that has the reactions
     * @param {[{emojiId: string, roleId: string}]} value Array with emojiId and roleId that 
     * @example setCachedMessageReactions('123456789', [{ emojiId: '1234', roleId: '5678' }])
     */
    setCachedMessageReactions: (messageId, value) => {
        cachedMessageReactions.set(messageId, value);
    },

    /**
     * Get the welcome channels
     * @returns welcomeChannels
     */
    getWelcomeChannels: () => { // gets the welcomeChannels cache
        return welcomeChannels
    },
    /**
     * Set the welcome channel for a guild
     * @param {string} guildId the guild id
     * @param {string} channelID the welcome channel id for the guild
     */
    setWelcomeChannels: (guildId, channelID) => { // sets the welcomeChannel cache
        welcomeChannels.set(guildId, channelID);
    },

    // getQueue: function () { // gets the queue cache for the music functions
    //     return queue;
    // },
    // setQueue: function (name, value) { // sets the queue cache for the music functions
    //     queue.set(name, value);
    // },

    /**
     * Get the member thats mention or not from the channel
     * where the message was send through
     * @param {object} message 
     * @param {string} toFind 
     * @returns 
     */
    getMember: (message, toFind = '') => {
        toFind = toFind.toLowerCase();
        let target = message.guild.members.cache.get(toFind);
        if (!target && message.mentions.members)
            target = message.mentions.members.first();
        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            });
        }
        if (!target)
            target = message.member
        return target
    },

    /**
     * returns a welcome message with the member's username
     * @param {object} member the member to get the member username from
     * @returns a random welcomeMessage
     */
    welcomeMessage: (member) => {
        const messages = [
            `\`${member.user.username}\` just joined the server - glhf!`, `\`${member.user.username}\` just joined. Everyone, look busy!`,
            `\`${member.user.username}\` just joined. Can I get a heal?`, `\`${member.user.username}\` joined your party.`,
            `\`${member.user.username}\` joined. You must construct additional pylons.`, `Ermagherd. \`${member.user.username}\` is here.`,
            `Welcome, \`${member.user.username}\`. Stay awhile and listen.`, `Welcome, \`${member.user.username}\`. We were expecting you ( ͡° ͜ʖ ͡°)`,
            `Welcome, \`${member.user.username}\`. We hope you brought pizza.`, `Welcome \`${member.user.username}\`. Leave your weapons by the door.`,
            `A wild \`${member.user.username}\` appeared.`, `Swoooosh. \`${member.user.username}\` just landed.`,
            `Brace yourselves. \`${member.user.username}\` just joined the server.`, `\`${member.user.username}\` just joined. Hide your bananas.`,
            `\`${member.user.username}\` just arrived. Seems OP - please nerf.`, `\`${member.user.username}\` just slid into the server.`,
            `A \`${member.user.username}\` has spawned in the server.`, `Big \`${member.user.username}\` showed up!`,
            `Where’s \`${member.user.username}\`? In the server!`, `\`${member.user.username}\` hopped into the server. Kangaroo!!`,
            `\`${member.user.username}\` just showed up. Hold my beer.`, `Challenger approaching - \`${member.user.username}\` has appeared!`,
            `It's a bird! It's a plane! Nevermind, it's just \`${member.user.username}\`.`, `It's \`${member.user.username}\`! Praise the sun! \\\\[T]/`,
            `Never gonna give \`${member.user.username}\` up. Never gonna let \`${member.user.username}\` down.`, `Ha! \`${member.user.username}\` has joined! You activated my trap card!`,
            `Cheers, love! \`${member.user.username}\`'s here!`, `Hey! Listen! \`${member.user.username}\` has joined!`,
            `We've been expecting you \`${member.user.username}\``, `It's dangerous to go alone, take \`${member.user.username}\`!`,
            `\`${member.user.username}\` has joined the server! It's super effective!`, `Cheers, love! \`${member.user.username}\` is here!`,
            `\`${member.user.username}\` is here, as the prophecy foretold.`, `\`${member.user.username}\` has arrived. Party's over.`,
            `Ready player \`${member.user.username}\``, `\`${member.user.username}\` is here to kick butt and chew bubblegum. And \`${member.user.username}\` is all out of gum.`,
            `Hello. Is it \`${member.user.username}\` you're looking for?`, `\`${member.user.username}\` has joined. Stay a while and listen!`,
            `Roses are red, violets are blue, \`${member.user.username}\` joined this server with you`,
        ]
        const message = messages[Math.floor(Math.random() * messages.length)]
        return message
    },

    /**
     * format a date string
     * @param {string} date 
     * @returns a formatted date string
     */
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    /**
     * make a word's first letter capitalized
     * @param {string} string 
     * @returns the capitalized word
     */
    capitalize: (string) => {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(" ");
    },

    /**
     * Calculate the date from seconds
     * @param {Number} timeInSecs the time in seconds
     * @param {"Array"|"String"} type set to Array OR String
     * @returns if type is set to Array it returns a array of number with of the time, if type set to String it will return a set string format
     */
    calculateDate: (timeInSecs, type) => {
        const secondsTotal = timeInSecs;
        const secondsInCentury = 60 * 60 * 24 * 365 * 100;
        const secondsInDecade = 60 * 60 * 24 * 365 * 10;
        const secondsInYear = 60 * 60 * 24 * 365;
        const secondsInMonth = 60 * 60 * 24 * 365 / 12;
        const secondsInWeek = 60 * 60 * 24 * 7;
        const secondsInDay = 60 * 60 * 24;
        const secondsInHour = 60 * 60;
        const secondsInMinute = 60;

        // Hele eeuw
        var entireCentury = secondsTotal / secondsInCentury;
        var secondsLeftOver = secondsTotal % secondsInCentury;

        // Hele decennium
        var entireDecade = secondsLeftOver / secondsInDecade;
        secondsLeftOver = secondsLeftOver % secondsInDecade;

        // hele jaar
        var entireYear = secondsLeftOver / secondsInYear;
        secondsLeftOver = secondsLeftOver % secondsInYear;

        // hele maand
        var entireMonth = secondsLeftOver / secondsInMonth;
        secondsLeftOver = secondsLeftOver % secondsInMonth;

        // hele week
        var entireWeek = secondsLeftOver / secondsInWeek;
        secondsLeftOver = secondsLeftOver % secondsInWeek;

        // hele dag
        var entireDay = secondsLeftOver / secondsInDay;
        secondsLeftOver = secondsLeftOver % secondsInDay;

        // hele uur
        var entireHour = secondsLeftOver / secondsInHour;
        secondsLeftOver = secondsLeftOver % secondsInHour;

        // hele minuut
        var entireMinute = secondsLeftOver / secondsInMinute;
        secondsLeftOver = secondsLeftOver % secondsInMinute;
        if (type === "Array") {
            const array = {
                centuries: Math.floor(entireCentury),
                decades: Math.floor(entireDecade),
                years: Math.floor(entireYear),
                months: Math.floor(entireMonth),
                weeks: Math.floor(entireWeek),
                days: Math.floor(entireDay),
                hours: Math.floor(entireHour),
                minutes: Math.floor(entireMinute),
                seconds: Math.floor(secondsLeftOver)
            };
            return array
        } else {
            var string = '';

            Math.floor(entireCentury) > 0 ? string += `Century: ${Math.floor(entireCentury)}\n` : '';
            Math.floor(entireDecade) > 0 ? string += `Decade(s): ${Math.floor(entireDecade)}\n` : '';
            Math.floor(entireYear) > 0 ? string += `Year(s): ${Math.floor(entireYear)}\n` : '';
            Math.floor(entireMonth) > 0 ? string += `Month(s): ${Math.floor(entireMonth)}\n` : '';
            Math.floor(entireWeek) > 0 ? string += `Week(s): ${Math.floor(entireWeek)}\n` : '';
            Math.floor(entireDay) > 0 ? string += `Day(s): ${Math.floor(entireDay)}\n` : '';
            Math.floor(entireHour) > 0 ? string += `Hour(s): ${Math.floor(entireHour)}\n` : '';
            Math.floor(entireMinute) > 0 ? string += `Minute(s): ${Math.floor(entireMinute)}\n` : '';
            Math.floor(secondsLeftOver) > 0 ? string += `Second(s): ${Math.floor(secondsLeftOver)}\n` : '';

            return string;
        }
    }
}

/* TODO!!!
[X] 1. Make the spamCheck function
[X] 2. Change the functions file into a class file with all the functions. */