

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `fixtures` (
  `id` int(11) NOT NULL,
  `match_date` date NOT NULL,
  `fixture` varchar(255) NOT NULL,
  `home_team` varchar(255) NOT NULL,
  `home_goal` int(11) NOT NULL,
  `away_team` varchar(255) NOT NULL,
  `away_goal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `fixtures` (`id`, `match_date`, `fixture`, `home_team`, `home_goal`, `away_team`, `away_goal`) VALUES
(1, '2024-01-01', 'Match', 'Liverpool', 4, 'Newcastle United', 2),
(2, '2024-01-02', 'Match', 'West Ham', 0, 'Brighton & Hove Albion', 0),
(3, '2024-01-12', 'Match', 'Burnley', 1, 'Luton Town', 1),
(4, '2024-01-13', 'Match', 'Chelsea', 1, 'Fulham', 0);



CREATE TABLE `leaguetable` (
  `id` int(11) NOT NULL,
  `manager_name` varchar(255) NOT NULL,
  `team_name` varchar(255) NOT NULL,
  `played` int(11) NOT NULL,
  `won` int(11) NOT NULL,
  `drawn` int(11) NOT NULL,
  `lost` int(11) NOT NULL,
  `for` int(11) NOT NULL,
  `against` int(11) NOT NULL,
  `gd` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `leaguetable` (`id`, `manager_name`, `team_name`, `played`, `won`, `drawn`, `lost`, `for`, `against`, `gd`, `points`) VALUES
(3, 'Ange Postecoglou', 'Tottenham Hotspur', 9, 5, 2, 2, 19, 14, 5, 17),
(4, 'Erik ten Hag', 'Manchester United', 9, 5, 2, 2, 18, 13, 5, 17),
(6, 'Marco Silva', 'Fulham', 10, 4, 3, 3, 18, 12, 6, 15),
(7, 'Eddie Howe', 'Newcastle United', 10, 4, 2, 4, 26, 26, 0, 14),
(8, 'Andoni Iraola', 'AFC Bournemouth', 10, 3, 4, 3, 15, 18, -3, 13),
(9, 'Julen Lopetegui', 'Wolverhampton Wanderers', 9, 4, 1, 4, 12, 15, -3, 13),
(10, 'Roberto De Zerbi', 'Brighton & Hove Albion', 10, 3, 3, 4, 13, 13, 0, 12),
(11, 'Mauricio Pochettino', 'Chelsea', 8, 3, 3, 2, 15, 16, -1, 12),
(12, 'David Moyes', 'West Ham United', 11, 2, 5, 4, 16, 24, -8, 11),
(13, 'Oliver Glasner', 'Crystal Palace', 9, 2, 3, 4, 12, 20, -8, 9),
(14, 'Thomas Frank', 'Brentford', 11, 2, 2, 7, 16, 24, -8, 8),
(15, 'Rob Edwards', 'Luton Town', 11, 1, 4, 6, 20, 25, -5, 7),
(16, 'Vincent Kompany', 'Burnley', 10, 1, 4, 5, 11, 24, -13, 7),
(17, 'Nuno Espírito Santo', 'Nottingham Forest', 10, 1, 3, 6, 12, 17, -5, 6),
(18, 'Chris Wilder', 'Sheffield United', 9, 1, 3, 5, 12, 28, -16, 6),
(19, 'Sean Dyche', 'Everton', 9, 0, 5, 4, 6, 13, -7, 5),
(20, 'Jürgen Klopp', 'Liverpool', 10, 8, 1, 1, 28, 11, 17, 25),
(21, 'Pep Guardiola', 'Manchester City', 10, 7, 3, 0, 18, 7, 11, 24),
(22, 'Mikel Arteta', 'Arsenal', 9, 8, 1, 0, 33, 4, 29, 25),
(23, 'Unai Emery', 'Aston Villa', 10, 5, 2, 3, 19, 15, 4, 17);



CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1, 'BM', 'blessed@north.com', '$2y$10$nQ4mlfEUGOmtj8zv7vZ6jewqrAT5pkaadPwJeqrLWP/D/mhMv5qgi'),
(3, 'Blessed', 'blessed@yahoo.com', '$2y$10$f18hu4BrBQm9IqMho8njg.YAgQayh2KlERYT8iu6pgKZdexxsoDt.'),
(4, 'Samuel', 'samuel@gmail.com', '$2y$10$dMI8F/SYLSWRRyC7/3vkluKKRuEYtCpQwcHUxi./5cvvyHlUFAY16'),
(5, 'Sam', 'samuel@outlook.com', '$2y$10$QfnghaoP384TSBmnsRVeFeodutyPi.ZT.rQ5BFbr1JZkmHIagrfuK');


ALTER TABLE `fixtures`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `leaguetable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fixtures`
--
ALTER TABLE `fixtures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leaguetable`
--
ALTER TABLE `leaguetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

