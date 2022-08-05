-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2022 at 04:39 PM
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

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `createPost` (IN `in_author_id` INT, IN `in_img_url` VARCHAR(255), IN `in_desc` TEXT)  BEGIN
  INSERT INTO post (author_id, img_url, `desc`) VALUES (in_author_id, in_img_url, in_desc);
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `deletePost` (IN `in_post_id` INT)  BEGIN
DELETE FROM post WHERE post.id = in_post_id;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `getAllNotFollowed` (IN `in_user_id` INT)  BEGIN
    SELECT user_info.* FROM user_info JOIN user ON user_info.id = user.id WHERE user.id NOT IN (SELECT user_id FROM user JOIN follower WHERE user.id = follower.user_id AND follower_id = in_user_id AND follower.user_id) AND user.id <> in_user_id;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `getPost` (IN `in_post_id` INT)  BEGIN
SELECT * FROM `user_post` WHERE id = in_post_id LIMIT 1;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `getUserInfo` (IN `in_user_id` INT, IN `in_email` VARCHAR(24))  BEGIN
  SELECT * FROM user_info WHERE id = in_user_id AND email = in_email;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `loginUser` (IN `in_email` VARCHAR(24), IN `in_password` VARCHAR(16))  BEGIN
  IF (SELECT COUNT(*) FROM user WHERE email = in_email AND password = in_password) = 1 THEN
    SELECT id, email FROM user WHERE email = in_email AND password = in_password;
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email or password is incorrect';
  END IF;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `updatePost` (IN `in_id` INT, IN `in_desc` TEXT)  BEGIN
UPDATE post SET `post`.`desc` = in_desc, `post`.`updated_at`= now() WHERE `post`.`id` = in_id;
END$$

CREATE DEFINER=`intrest`@`localhost` PROCEDURE `updateUserInfo` (IN `in_user_id` INT, IN `in_email` VARCHAR(24), IN `in_username` VARCHAR(24), IN `in_name` VARCHAR(30), IN `in_birthday` DATE, IN `in_gender` ENUM('male','female','unknown',''), IN `in_bio` TEXT, IN `in_img_url` VARCHAR(255))  BEGIN
	UPDATE `user` SET email = in_email, username = in_username, updated_at = CURRENT_TIMESTAMP() WHERE id = in_user_id;
    UPDATE `user_profile` SET name = in_name, birthday = in_birthday, gender = in_gender, bio = in_bio, img_url = in_img_url WHERE id = in_user_id;
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

CREATE DEFINER=`intrest`@`localhost` FUNCTION `isFollowed` (`in_follower_id` INT, `in_user_id` INT) RETURNS TINYINT(1) BEGIN
    DECLARE followed_value BOOLEAN;
    SET followed_value = FALSE;
    IF (SELECT COUNT(DISTINCT follower_id, user_id) FROM follower WHERE follower_id = in_follower_id AND user_id = in_user_id) = 1 THEN
        SET followed_value = TRUE;
    END IF;
    RETURN followed_value;
end$$

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
-- Stand-in structure for view `all_post`
-- (See below for the actual view)
--
CREATE TABLE `all_post` (
`user_id` int(11)
,`username` varchar(24)
,`profile_img` varchar(255)
,`post_id` int(11)
,`post_img` varchar(255)
,`desc` text
,`created_at` datetime
,`updated_at` datetime
);

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
-- Stand-in structure for view `counter_followed`
-- (See below for the actual view)
--
CREATE TABLE `counter_followed` (
`id` int(11)
,`username` varchar(24)
,`total_followed` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `counter_follower`
-- (See below for the actual view)
--
CREATE TABLE `counter_follower` (
`id` int(11)
,`username` varchar(24)
,`total_follower` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `counter_post`
-- (See below for the actual view)
--
CREATE TABLE `counter_post` (
`id` int(11)
,`username` varchar(24)
,`total_post` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `counter_subscription`
-- (See below for the actual view)
--
CREATE TABLE `counter_subscription` (
`id` int(11)
,`username` varchar(24)
,`total_followed` bigint(21)
,`total_follower` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
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
-- Stand-in structure for view `profile_info`
-- (See below for the actual view)
--
CREATE TABLE `profile_info` (
`id` int(11)
,`username` varchar(24)
,`total_followed` bigint(21)
,`total_follower` bigint(21)
,`total_post` bigint(21)
,`img_url` varchar(255)
,`bio` text
);

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
-- Stand-in structure for view `user_info`
-- (See below for the actual view)
--
CREATE TABLE `user_info` (
`id` int(11)
,`email` varchar(24)
,`username` varchar(24)
,`name` varchar(30)
,`birthday` date
,`gender` enum('male','female','unknown','')
,`bio` text
,`img_url` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_post`
-- (See below for the actual view)
--
CREATE TABLE `user_post` (
`username` varchar(24)
,`id` int(11)
,`img_url` varchar(255)
,`desc` text
,`created_at` datetime
,`updated_at` datetime
,`author_id` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female','unknown','') NOT NULL DEFAULT 'unknown',
  `bio` text DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure for view `all_post`
--
DROP TABLE IF EXISTS `all_post`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `all_post`  AS SELECT `user_info`.`id` AS `user_id`, `user_info`.`username` AS `username`, `user_info`.`img_url` AS `profile_img`, `post`.`id` AS `post_id`, `post`.`img_url` AS `post_img`, `post`.`desc` AS `desc`, `post`.`created_at` AS `created_at`, `post`.`updated_at` AS `updated_at` FROM (`user_info` join `post` on(`user_info`.`id` = `post`.`author_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `counter_followed`
--
DROP TABLE IF EXISTS `counter_followed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `counter_followed`  AS SELECT `user`.`id` AS `id`, `user`.`username` AS `username`, count(distinct `f`.`user_id`) AS `total_followed` FROM (`user` left join `follower` `f` on(`user`.`id` = `f`.`follower_id`)) GROUP BY `user`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `counter_follower`
--
DROP TABLE IF EXISTS `counter_follower`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `counter_follower`  AS SELECT `user`.`id` AS `id`, `user`.`username` AS `username`, count(distinct `f`.`follower_id`) AS `total_follower` FROM (`user` left join `follower` `f` on(`user`.`id` = `f`.`user_id`)) GROUP BY `user`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `counter_post`
--
DROP TABLE IF EXISTS `counter_post`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `counter_post`  AS SELECT `user`.`id` AS `id`, `user`.`username` AS `username`, count(`post`.`author_id`) AS `total_post` FROM (`user` left join `post` on(`user`.`id` = `post`.`author_id`)) GROUP BY `user`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `counter_subscription`
--
DROP TABLE IF EXISTS `counter_subscription`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `counter_subscription`  AS SELECT `counter_followed`.`id` AS `id`, `counter_followed`.`username` AS `username`, `counter_followed`.`total_followed` AS `total_followed`, `counter_follower`.`total_follower` AS `total_follower` FROM (`counter_followed` join `counter_follower` on(`counter_followed`.`id` = `counter_follower`.`id` and `counter_followed`.`username` = `counter_follower`.`username`)) ;

-- --------------------------------------------------------

--
-- Structure for view `profile_info`
--
DROP TABLE IF EXISTS `profile_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `profile_info`  AS SELECT `counter`.`id` AS `id`, `counter`.`username` AS `username`, `counter`.`total_followed` AS `total_followed`, `counter`.`total_follower` AS `total_follower`, `counter`.`total_post` AS `total_post`, `user_info`.`img_url` AS `img_url`, `user_info`.`bio` AS `bio` FROM (`user_info` join (select `counter_subscription`.`id` AS `id`,`counter_subscription`.`username` AS `username`,`counter_subscription`.`total_followed` AS `total_followed`,`counter_subscription`.`total_follower` AS `total_follower`,`counter_post`.`total_post` AS `total_post` from (`counter_subscription` join `counter_post` on(`counter_subscription`.`id` = `counter_post`.`id` and `counter_subscription`.`username` = `counter_post`.`username`))) `counter` on(`user_info`.`id` = `counter`.`id` and `user_info`.`username` = `counter`.`username`)) ;

-- --------------------------------------------------------

--
-- Structure for view `user_info`
--
DROP TABLE IF EXISTS `user_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_info`  AS SELECT `user`.`id` AS `id`, `user`.`email` AS `email`, `user`.`username` AS `username`, `user_profile`.`name` AS `name`, `user_profile`.`birthday` AS `birthday`, `user_profile`.`gender` AS `gender`, `user_profile`.`bio` AS `bio`, `user_profile`.`img_url` AS `img_url` FROM (`user` join `user_profile` on(`user`.`id` = `user_profile`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `user_post`
--
DROP TABLE IF EXISTS `user_post`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_post`  AS SELECT `user`.`username` AS `username`, `post`.`id` AS `id`, `post`.`img_url` AS `img_url`, `post`.`desc` AS `desc`, `post`.`created_at` AS `created_at`, `post`.`updated_at` AS `updated_at`, `post`.`author_id` AS `author_id` FROM (`user` join `post`) WHERE `user`.`id` = `post`.`author_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD KEY `comment_post_id_fk` (`post_id`),
  ADD KEY `comment` (`user_id`);

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD KEY `follower_user_id_fk` (`follower_id`),
  ADD KEY `followed_user_profile_id_fk` (`user_id`);

--
-- Indexes for table `like`
--
ALTER TABLE `like`
  ADD KEY `like_post_id_fk` (`post_id`),
  ADD KEY `like_user_id_fk` (`user_id`);

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
  ADD CONSTRAINT `comment` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `followed_user_profile_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follower_user_id_fk` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `like_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `like_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
