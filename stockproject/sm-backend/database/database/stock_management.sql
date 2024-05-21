-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 21, 2024 at 11:09 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `validate_date` date DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supplier` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `article`, `category`, `quantity`, `unit_price`, `validate_date`, `description`, `image`, `localisation`, `created_at`, `updated_at`, `supplier`) VALUES
(4, 'Perfume X', 'perfume', 22, '23.00', '2024-02-03', 'Premium fragrance with floral notes', 'C:\\fakepath\\Capture.PNG', 'Sample Location', '2024-05-20 15:14:32', '2024-05-20 15:14:32', 'Mohamed khacha');

--
-- Triggers `articles`
--
DROP TRIGGER IF EXISTS `after_article_delete`;
DELIMITER $$
CREATE TRIGGER `after_article_delete` AFTER DELETE ON `articles` FOR EACH ROW BEGIN
    -- Delete the corresponding entry from the stock table
    DELETE FROM stock WHERE article_id = OLD.id;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_article_insert`;
DELIMITER $$
CREATE TRIGGER `after_article_insert` AFTER INSERT ON `articles` FOR EACH ROW BEGIN
    DECLARE existing_quantity INT;
    
    -- Check if the article already exists in stock
    SELECT quantity INTO existing_quantity
    FROM stock
    WHERE article_id = NEW.id;
    
    IF existing_quantity IS NOT NULL THEN
        -- Update the stock quantity if the article already exists
        UPDATE stock
        SET quantity = quantity + NEW.quantity,
            unit_price = NEW.unit_price,
            updated_at = CURRENT_TIMESTAMP
        WHERE article_id = NEW.id;
    ELSE
        -- Insert new article into stock if it doesn't exist
        INSERT INTO stock (article_id, quantity, unit_price, supplier, category, validity_period, picture_url, description,article)
        VALUES (NEW.id, NEW.quantity, NEW.unit_price, NEW.supplier, NEW.category, New.validate_date, NEW.image, NEW.description,NEW.article);
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_article_update`;
DELIMITER $$
CREATE TRIGGER `after_article_update` AFTER UPDATE ON `articles` FOR EACH ROW BEGIN
    IF NEW.quantity <> OLD.quantity THEN
        -- Update the stock quantity if the article quantity is changed
        UPDATE stock
        SET quantity = quantity + (NEW.quantity - OLD.quantity),
            updated_at = CURRENT_TIMESTAMP
        WHERE article_id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Mohamed', 'Khacha', 'mohamedkhacha99@gmail.com', '0653206661', 'N° 47 cité minière', '2024-05-14 15:49:37', '2024-05-17 00:11:59'),
(6, 'Hicham', 'Imlal', 'mohamedkhacha99@gmail.com', '0653206661', 'N° 47 cité minière', '2024-05-14 20:08:28', '2024-05-15 11:43:12'),
(12, 'Mohamed', 'Hicham', 'mohamedkhacha99@gmail.com', '0653206661', 'N° 47 cité minière', '2024-05-15 11:43:22', '2024-05-15 11:43:22');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(6, '2024_05_13_160312_article', 1),
(7, '2024_05_13_160410_sale', 2),
(8, '2024_05_13_160431_order', 3),
(9, '2024_05_13_160444_stock', 4),
(10, '2024_05_13_155543_client', 5),
(11, '2024_05_16_115357_create_users_table', 6),
(12, '2024_05_16_115400_create_sessions_table', 7),
(13, '2024_05_16_115358_create_password_reset_tokens_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `article` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(8,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `supplier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `article`, `category`, `quantity`, `unit_price`, `description`, `created_at`, `updated_at`, `supplier`) VALUES
(2, 'Perfume X', 'perfume', 122, '23.00', 'des', '2024-05-20 22:54:58', '2024-05-20 22:57:18', 'Mohamed Khacha');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(215, 'App\\Models\\User', 11, 'auth-token', 'f7605ccdb7633920648100a38225517222551c147945b8e1b1878c8ec9daa310', '[\"*\"]', '2024-05-21 10:07:11', NULL, '2024-05-21 10:07:10', '2024-05-21 10:07:11'),
(210, 'App\\Models\\User', 10, 'auth-token', '5a7f1d9979e63f6bc44b46e0955c955b1f24c856f01cfb6eac492673337bd8d1', '[\"*\"]', '2024-05-19 00:06:25', NULL, '2024-05-19 00:04:44', '2024-05-19 00:06:25');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `client` varchar(255) DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  `article` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `category`, `quantity`, `unit_price`, `description`, `created_at`, `updated_at`, `client`, `article_id`, `article`) VALUES
(34, 'perfume', 22, '23.00', 'Premium fragrance with floral notes', '2024-05-21 10:08:17', '2024-05-21 10:08:17', NULL, NULL, 'Perfume X'),
(33, 'perfume', 33, '23.00', 'des', '2024-05-20 15:51:06', '2024-05-20 15:58:00', 'Mohamed Khacha', NULL, 'Test');

--
-- Triggers `sales`
--
DROP TRIGGER IF EXISTS `after_sale_insert`;
DELIMITER $$
CREATE TRIGGER `after_sale_insert` AFTER INSERT ON `sales` FOR EACH ROW BEGIN
    DECLARE error_message VARCHAR(255);

    -- Update the stock quantity using the article name
    UPDATE stock
    SET quantity = quantity - NEW.quantity
    WHERE article = NEW.article;

    -- Check for negative stock and handle accordingly (optional)
    IF (SELECT quantity FROM stock WHERE article = NEW.article) < 0 THEN
        SET error_message = CONCAT('Insufficient stock for article ', NEW.article);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_sales_insert`;
DELIMITER $$
CREATE TRIGGER `after_sales_insert` AFTER INSERT ON `sales` FOR EACH ROW BEGIN
    -- Reduce the stock quantity based on the sale
    UPDATE stock
    SET quantity = quantity - NEW.quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE article_id = NEW.article_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb3_unicode_ci,
  `payload` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('jtXmjaVWu5kMB4A3husUn9AJfvl10EK653bUBfxI', NULL, '127.0.0.1', 'PostmanRuntime/7.39.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM3M3d1NCTEoyTHBOOUV6YkFnT011OHhuQkJONUFuYXVDQzFDRXdOaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1715978565),
('eD4hbrWwV3ZXoYDhwPSxUgrtj1ypkiJTLTKEvUhM', NULL, '127.0.0.1', 'PostmanRuntime/7.39.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGt5SE1RNnRrNjhqd2wxcjlQaldnd2lER2RvZk1uanh1c3pEaElrQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1715978614),
('iM3sj1WXGr3HPjjGYkANeJKRYEQKZXKc0bUu30mQ', NULL, '127.0.0.1', 'PostmanRuntime/7.39.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSkFsNVJiOUE2OTAwSXdSeXlSTTF1WWExSHoxU2pyTE0yblUzR3ZmVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1715976628),
('8vwnxGrxHrJ6wA0nqWN3javbQhbwynxrx63jH6MJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWlsS2JPSzZHSHFuVkIySU84Q2tvdVZFQkp1MnJORUNTV09PeDdmOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1715978709);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `validity_period` date DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `article` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `article_id`, `quantity`, `unit_price`, `supplier`, `category`, `validity_period`, `picture_url`, `description`, `created_at`, `updated_at`, `article`) VALUES
(4, 4, 0, '23.00', 'Mohamed khacha', 'perfume', '2024-02-03', 'C:\\fakepath\\Capture.PNG', 'Premium fragrance with floral notes', '2024-05-20 16:14:32', '2024-05-21 11:08:17', 'Perfume X');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Mohamed', 'Khacha', 'mohamedkhacha99@gmail.com', '0653206661', 'N° 47 cité minière', '2024-05-16 22:16:25', '2024-05-16 22:16:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` tinyint(1) NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `user_role`, `email_verified_at`, `password`, `phone_number`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Doe', 'john@example.com', 0, NULL, '$2y$12$8ZTSmJdiMU3olH3IReN.QeflRb/bf7gg8zQhTtyc3R6JwuWeX1TCC', '1234567890', NULL, NULL, '2024-05-16 11:08:21', '2024-05-16 11:08:21'),
(2, 'Mohamed', 'Khacha', 'mohamedkhacha99@gmail.com', 0, NULL, '$2y$12$BQ2.xuHzh33g7haFZyK/huAmZaIaNl67UVYoxIJ5I6Q4NANPYNLZq', NULL, NULL, NULL, '2024-05-16 11:11:17', '2024-05-16 11:11:17'),
(3, 'Mohamed', 'Khacha', 'meedk9@gmail.com', 0, NULL, '$2y$12$LVmPdY5E1CBCRFD.0o7hxeoatz2tbEFm6IHUASmNDkH2d5L4Xw0n2', NULL, NULL, NULL, '2024-05-16 23:58:04', '2024-05-16 23:58:04'),
(4, 'Mohamed', 'Khacha', 'fatimaelbouazaoui@gmail.com', 0, NULL, '$2y$12$sAU6.c5yNNnGG8PVnPN9Lug4DOvTuY9SLe4xsxVdxqZWWbPFSDcSC', NULL, NULL, NULL, '2024-05-17 16:52:31', '2024-05-17 16:52:31'),
(5, 'Mohamed', 'Khacha', 'elbouazaouifatima0@gmail.com', 0, NULL, '$2y$12$9Byxrpmmu2yIi9FeR/btiONrXhIwlXemYvD.0Ealm1zWcwG4WXfMm', NULL, NULL, NULL, '2024-05-17 19:40:05', '2024-05-17 19:40:05'),
(6, 'Mohamed', 'Khacha', 'fatimaelbouazaoui@ggmail.com', 0, NULL, '$2y$12$/1/dAFT9WCB3T70niVuu/ugHYG5oUizuAW3dyBjBl9pdUGTWwDy/W', NULL, NULL, NULL, '2024-05-17 19:50:41', '2024-05-17 19:50:41'),
(7, 'med', 'kha', 'mohamedkhacha999@gmail.com', 0, NULL, '$2y$12$qY9zxxYEN4DQL0gETkkpQO8wCrv51Lcbv9AkXxXIxwgkAZtDMi0mK', NULL, NULL, NULL, '2024-05-17 19:59:41', '2024-05-17 19:59:41'),
(8, 'Josef', 'Doee', 'john.doe@example.com', 0, NULL, '$2y$12$jdpMbkuCxrsBf.I2883wTeW7PNVR4jC25EP86mxJAHGVQdAMeIJva', '1234567890', NULL, NULL, '2024-05-17 20:53:18', '2024-05-18 19:59:48'),
(9, 'Mohamed', 'Khacha', 'med@email.com', 0, NULL, '$2y$12$WydPJTeqJabo/Sj0IP25r.bSaFge.MoyPhCgkbucjN6NGd/IJ5phG', NULL, 'https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', NULL, '2024-05-18 14:14:42', '2024-05-18 14:14:42'),
(11, 'Mohamed', 'Khacha', 'med@gmail.com', 0, NULL, '$2y$12$vChVYuoBWudv79xbjJF.LOjV1IhsO0vj0k1mk4Ef1bd0g6zOECHqK', '0653206669', 'data:image/jpeg;base64,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', NULL, '2024-05-19 00:15:22', '2024-05-21 10:06:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
