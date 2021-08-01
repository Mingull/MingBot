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
('658620991647252480', '149233694253645824'),
('691287343637725205', '149233694253645824'),
('762701688540233828', '149233694253645824');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `guilds`
--
ALTER TABLE `guilds`
  ADD PRIMARY KEY (`guildId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
