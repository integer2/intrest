-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2022 at 04:41 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intrest`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`intrest`@`localhost` PROCEDURE `createNewUser` (IN `in_username` VARCHAR(24), IN `in_email` VARCHAR(24), IN `in_password` VARCHAR(16))  BEGIN
  IF (SELECT isUsernameExist(in_username)) = FALSE THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username already exist';
  END IF;
  IF (SELECT isEmailValid(in_email)) = FALSE THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email is not valid';
  END IF;
  IF (SELECT isEmailExist(in_email)) = FALSE THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already exist';
  END IF;
  INSERT INTO user (username, email, password) VALUES (in_username, in_email, in_password);
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `createNewUserProfile` (IN `in_user_id` INT)  BEGIN
  INSERT INTO user_profile (id) VALUES (in_user_id);
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `loginUser` (IN `in_email` VARCHAR(24), IN `in_password` VARCHAR(16))  BEGIN
  IF (SELECT COUNT(*) FROM user WHERE email = in_email AND password = in_password) = 1 THEN
    SELECT id, email FROM user WHERE email = in_email AND password = in_password;
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email or password is incorrect';
  END IF;
END$$

--
-- Functions
--
CREATE DEFINER=`intrest`@`localhost` FUNCTION `isEmailExist` (`in_email` VARCHAR(24)) RETURNS TINYINT(1) BEGIN
  DECLARE valid_email BOOLEAN;
  SET valid_email = FALSE;
  IF (SELECT COUNT(*) FROM user WHERE email = in_email) = 0 THEN
    SET valid_email = TRUE;
  END IF;
  RETURN valid_email;
END$$

CREATE DEFINER=`intrest`@`localhost` FUNCTION `isEmailValid` (`email` VARCHAR(24)) RETURNS TINYINT(1) BEGIN
  DECLARE valid_email BOOLEAN;
  SET valid_email = FALSE;
  IF (email REGEXP '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$') THEN
    SET valid_email = TRUE;
  END IF;
  RETURN valid_email;
END$$

CREATE DEFINER=`intrest`@`localhost` FUNCTION `isUsernameExist` (`in_username` VARCHAR(24)) RETURNS TINYINT(1) BEGIN
  DECLARE valid_username BOOLEAN;
  SET valid_username = FALSE;
  IF (SELECT COUNT(*) FROM user WHERE username = in_username) = 0 THEN
    SET valid_username = TRUE;
  END IF;
  RETURN valid_username;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(150) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `like`
--

CREATE TABLE `like` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(24) NOT NULL,
  `username` varchar(24) NOT NULL,
  `password` varchar(16) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `user_profile_insert` AFTER INSERT ON `user` FOR EACH ROW BEGIN
  CALL createNewUserProfile(NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `bio` varchar(150) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD KEY `comment` (`user_id`),
  ADD KEY `comment_post_id_fk` (`post_id`);

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_user_profile_id_fk` (`follower_id`),
  ADD KEY `followed_user_profile_id_fk` (`user_id`);

--
-- Indexes for table `like`
--
ALTER TABLE `like`
  ADD KEY `like_post_id_fk` (`post_id`),
  ADD KEY `like_user_profile_id_fk` (`user_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post` (`author_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_uindex` (`email`),
  ADD UNIQUE KEY `user_username_uindex` (`username`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follower`
--
ALTER TABLE `follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `followed_user_profile_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follower_user_profile_id_fk` FOREIGN KEY (`follower_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `like_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `like_user_profile_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post` FOREIGN KEY (`author_id`) REFERENCES `user_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
