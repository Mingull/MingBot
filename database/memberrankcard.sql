-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 28 mrt 2021 om 23:10
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
('149233694253645824', '#004d4d', './dashboard/assets/img/rankCardBackgrounds/2.jpg', 'IMAGE'),
('288382736899506176', '#00ffff', '#23272A', 'COLOR'),
('468457178965999626', '#00ffff', '#23272A', 'COLOR'),
('701740972714885140', '#00ffff', '#23272A', 'COLOR');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `memberrankcard`
--
ALTER TABLE `memberrankcard`
  ADD PRIMARY KEY (`memberId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
