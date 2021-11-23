-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2021 at 01:16 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_web`
--
CREATE DATABASE IF NOT EXISTS `test_web` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test_web`;

-- --------------------------------------------------------

--
-- Table structure for table `renname_log`
--

DROP TABLE IF EXISTS `renname_log`;
CREATE TABLE `renname_log` (
  `id` int(11) NOT NULL,
  `mypokemon_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `renname_log`
--

INSERT INTO `renname_log` (`id`, `mypokemon_id`, `value`) VALUES
(45, 21, 'satu-0'),
(46, 21, 'satu-0'),
(47, 21, 'dua-1'),
(48, 21, 'tiga-1'),
(49, 21, 'tiga-2'),
(50, 21, 'emapt-3'),
(51, 21, 'lima-5'),
(52, 21, 'eam-8'),
(53, 21, 'asda-13'),
(54, 21, 'asd-21'),
(55, 21, 'asd-34'),
(56, 22, 'testtt-0'),
(57, 23, 'kapal-0'),
(58, 24, 'Naaga-0'),
(59, 25, 'burung-0'),
(60, 25, 'burung-0'),
(61, 25, 'manuk-1'),
(62, 25, 'manuk-1'),
(63, 25, 'manuk-2'),
(64, 25, 'manuk-3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 'lukmanhadi', '$2b$10$Ag0t8pZIcaAn6DkC5PF35ON6wCp2FX2KkB80OmPl3Gx1Ji9NVop.e', '', '2021-11-21 16:32:32'),
(2, 'lukman', '$2b$10$3J5cbifAYydNyjte3ivJkOYuvwxkTXUhdH3QiyPQ.7bg2hdtaVhK6', '', '2021-11-22 20:10:20'),
(3, 'kukuk', '$2b$10$RKZA9GqwMbrL3kRlXYKLBuJ52D2BpPK6xndYECpS/3SnjbVRm6PEy', '', '2021-11-22 22:56:00'),
(4, '121231', '$2b$10$ECmtyGvfvUNcX1JTzw/VROye0/Pk1JVee0E/HWUYsoOMytzc84fJu', '', '2021-11-22 23:00:03'),
(5, '121231asdas', '$2b$10$WLEDdsdgeU7mvnAvbx.kt.hBm2LAxHmed/4RfRQmtGeJe2YN3vGY2', '', '2021-11-22 23:00:47'),
(6, '121231asdasas', '$2b$10$v04bI1DtlYT4gC5MyLUrzeZepdx/BaO5spFmsJZlpJEQPTT.YOvLe', '', '2021-11-22 23:01:19'),
(7, '121231asdasasas', '$2b$10$gLZ5Sk4F/nlYHOwVuW0o7OjlA70.68nxu4BMcTwDRrFGEdim5TUgC', '', '2021-11-22 23:01:31'),
(9, 'asdad', '$2b$10$UhQweDnH.ZS1UZ942N/67uiUGlj9MC.NfU8Q8HezhvGo5f74a2KlW', '', '2021-11-22 23:02:42'),
(10, 'asdadadasd', '$2b$10$wRpogdYBu49Hto.Y1RrW4ONZiMD5MHXNebFBw26Mc6AHk8dexHkBC', '', '2021-11-22 23:03:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_pokemon`
--

DROP TABLE IF EXISTS `user_pokemon`;
CREATE TABLE `user_pokemon` (
  `id` int(11) NOT NULL,
  `pokemon_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_pokemon`
--

INSERT INTO `user_pokemon` (`id`, `pokemon_id`, `user_id`, `name`) VALUES
(2, 1, 1, 'pokedex-1597'),
(22, 266, 1, 'testtt-0'),
(23, 278, 1, 'kapal-0'),
(24, 497, 1, 'Naaga-0');

--
-- Triggers `user_pokemon`
--
DROP TRIGGER IF EXISTS `insert_trigger`;
DELIMITER $$
CREATE TRIGGER `insert_trigger` AFTER INSERT ON `user_pokemon` FOR EACH ROW insert into test_web.renname_log 
set mypokemon_id = new.id,
	value = new.name
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `rename_trigger`;
DELIMITER $$
CREATE TRIGGER `rename_trigger` AFTER UPDATE ON `user_pokemon` FOR EACH ROW insert into test_web.renname_log 
set mypokemon_id = old.id,
	value = old.name
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `renname_log`
--
ALTER TABLE `renname_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_pokemon`
--
ALTER TABLE `user_pokemon`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `renname_log`
--
ALTER TABLE `renname_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_pokemon`
--
ALTER TABLE `user_pokemon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
