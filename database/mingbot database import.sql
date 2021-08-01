-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 30 jul 2021 om 18:25
-- Serverversie: 10.4.18-MariaDB
-- PHP-versie: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mingbot`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `guildconfigurable`
--

CREATE TABLE `guildconfigurable` (
  `guildId` varchar(100) NOT NULL,
  `cmdPrefix` varchar(10) DEFAULT 'm/',
  `modLogId` varchar(100) DEFAULT NULL,
  `welcomeChannelId` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `guildconfigurable`
--

INSERT INTO `guildconfigurable` (`guildId`, `cmdPrefix`, `modLogId`, `welcomeChannelId`) VALUES
('658620991647252480', 'm/', NULL, NULL),
('691287343637725205', 'm/', NULL, NULL),
('762701688540233828', 'm/', '829339861247983676', '816017642531848292');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `guildmembermessage`
--

CREATE TABLE `guildmembermessage` (
  `id` int(11) NOT NULL,
  `memberId` varchar(100) NOT NULL,
  `guildId` varchar(100) NOT NULL,
  `memberXP` int(11) DEFAULT 0,
  `memberLevel` int(11) DEFAULT 0,
  `messageCount` int(11) DEFAULT 0,
  `muteCooldown` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `guildmembermessage`
--

INSERT INTO `guildmembermessage` (`id`, `memberId`, `guildId`, `memberXP`, `memberLevel`, `messageCount`, `muteCooldown`) VALUES
(1, '149233694253645824', '762701688540233828', 3034, 7, 178, '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `guildreactionrole`
--

CREATE TABLE `guildreactionrole` (
  `id` int(11) NOT NULL,
  `guildId` varchar(100) DEFAULT NULL,
  `messageId` varchar(100) DEFAULT NULL,
  `emojiId` varchar(100) DEFAULT NULL,
  `roleId` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `guildreactionrole`
--

INSERT INTO `guildreactionrole` (`id`, `guildId`, `messageId`, `emojiId`, `roleId`) VALUES
(1, '762701688540233828', '831864946144444447', '831893445504532521', '803638975645876244'),
(2, '762701688540233828', '831864946144444447', '831894370726314004', '831863587412508712');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `guilds`
--

CREATE TABLE `guilds` (
  `guildId` varchar(100) NOT NULL,
  `guildOwnerId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `guilds`
--

INSERT INTO `guilds` (`guildId`, `guildOwnerId`) VALUES
('762701688540233828', '149233694253645824');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `membercooldowns`
--

CREATE TABLE `membercooldowns` (
  `memberId` varchar(100) NOT NULL,
  `hourlyCooldown` varchar(100) DEFAULT '',
  `dailyCooldown` varchar(100) DEFAULT '',
  `weeklyCooldown` varchar(100) DEFAULT '',
  `monthlyCooldown` varchar(100) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `membercooldowns`
--

INSERT INTO `membercooldowns` (`memberId`, `hourlyCooldown`, `dailyCooldown`, `weeklyCooldown`, `monthlyCooldown`) VALUES
('149233694253645824', '', '', '', ''),
('468457178965999626', '', '', '', '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `membereconomy`
--

CREATE TABLE `membereconomy` (
  `memberId` varchar(100) NOT NULL,
  `memberMoney` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `membereconomy`
--

INSERT INTO `membereconomy` (`memberId`, `memberMoney`) VALUES
('149233694253645824', 10000),
('468457178965999626', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `memberrankcard`
--

CREATE TABLE `memberrankcard` (
  `memberId` varchar(100) NOT NULL,
  `color` varchar(100) DEFAULT '#00ffff',
  `background` varchar(100) DEFAULT '#23272A',
  `backgroundType` varchar(100) DEFAULT 'COLOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `memberrankcard`
--

INSERT INTO `memberrankcard` (`memberId`, `color`, `background`, `backgroundType`) VALUES
('149233694253645824', '#00ffff', '#23272A', 'COLOR'),
('833736374288384050', '#00ffff', '#23272A', 'COLOR');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `guildconfigurable`
--
ALTER TABLE `guildconfigurable`
  ADD PRIMARY KEY (`guildId`);

--
-- Indexen voor tabel `guildmembermessage`
--
ALTER TABLE `guildmembermessage`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `guildreactionrole`
--
ALTER TABLE `guildreactionrole`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexen voor tabel `guilds`
--
ALTER TABLE `guilds`
  ADD PRIMARY KEY (`guildId`);

--
-- Indexen voor tabel `membercooldowns`
--
ALTER TABLE `membercooldowns`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexen voor tabel `membereconomy`
--
ALTER TABLE `membereconomy`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexen voor tabel `memberrankcard`
--
ALTER TABLE `memberrankcard`
  ADD PRIMARY KEY (`memberId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `guildmembermessage`
--
ALTER TABLE `guildmembermessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `guildreactionrole`
--
ALTER TABLE `guildreactionrole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
