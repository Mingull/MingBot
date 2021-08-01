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
-- Tabelstructuur voor tabel `guildmember`
--

CREATE TABLE `guildmember` (
  `id` int(11) NOT NULL,
  `guildId` varchar(100) NOT NULL,
  `memberId` varchar(100) NOT NULL,
  `memberXP` int(11) NOT NULL DEFAULT 0,
  `memberLevel` int(11) NOT NULL DEFAULT 0,
  `messageCount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `guildmember`
--

INSERT INTO `guildmember` (`id`, `guildId`, `memberId`, `memberXP`, `memberLevel`, `messageCount`) VALUES
(1, '658620991647252480', '149233694253645824', 0, 0, 0),
(2, '762701688540233828', '149233694253645824', 246, 1, 14),
(3, '762701688540233828', '468457178965999626', 0, 0, 0),
(4, '762701688540233828', '288382736899506176', 0, 0, 0),
(5, '762701688540233828', '701740972714885140', 0, 0, 0);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `guildmember`
--
ALTER TABLE `guildmember`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `guildmember`
--
ALTER TABLE `guildmember`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
