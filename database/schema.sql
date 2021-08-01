CREATE DATABASE mingbot;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
    guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
    cmdPrefix VARCHAR(10) DEFAULT 'm/',
    modLogId VARCHAR(100),
    welcomeChannelId VARCHAR(100)
);

CREATE TABLE GuildMemberMessage (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    memberId VARCHAR(100) NOT NULL,
    guildId VARCHAR(100) NOT NULL,
    memberXP int(11) DEFAULT 0,
    memberLevel int(11) DEFAULT 0,
    messageCount int(11) DEFAULT 0,
    muteCooldown VARCHAR(100) NOT NULL DEFAULT ""
);

CREATE TABLE GuildReactionRole (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
    messageId VARCHAR(100) NULL,
    reaction VARCHAR(100) NULL,
    roleId VARCHAR(100) NULL
);

CREATE TABLE MemberEconomy (
    memberId VARCHAR(100) NOT NULL,
    memberMoney INT(11) DEFAULT 0
);

CREATE TABLE MemberCooldowns (
    memberId VARCHAR(100) NOT NULL PRIMARY KEY,
    hourlyCooldown VARCHAR(100) NOT NULL DEFAULT "",
    dailyCooldown VARCHAR(100) NOT NULL DEFAULT "",
    weeklyCooldown VARCHAR(100) NOT NULL DEFAULT "",
    monthlyCooldown VARCHAR(100) NOT NULL DEFAULT ""
);

CREATE TABLE MemberRankCard (
    memberId VARCHAR(100) NOT NULL PRIMARY KEY,
    color VARCHAR(100) DEFAULT '#00ffff',
    background VARCHAR(100) DEFAULT '#23272A',
    backgroundType VARCHAR(100) DEFAULT 'COLOR'
);