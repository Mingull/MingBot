-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 17 mrt 2021 om 20:18
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
('762701688540233828', 'm/', NULL, '816017642531848292');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `guildconfigurable`
--
ALTER TABLE `guildconfigurable`
  ADD PRIMARY KEY (`guildId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
