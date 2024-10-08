-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla users_db.logins
CREATE TABLE IF NOT EXISTS `logins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla users_db.logins: ~1 rows (aproximadamente)
INSERT IGNORE INTO `logins` (`id`, `token`, `user_id`, `isActive`, `createdAt`, `updatedAt`) VALUES
	('8dc353ee-791a-4264-98e2-a3fc26f24e39', 'v2uwqfzr7s', 'b3a4ef56-c030-462d-842a-c67aa17f4c57', 0, '2024-09-18 02:00:31', '2024-09-18 02:05:46');

-- Volcando estructura para tabla users_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla users_db.roles: ~3 rows (aproximadamente)
INSERT IGNORE INTO `roles` (`id`, `rol`) VALUES
	(1, 'Administrador'),
	(2, 'Empleado'),
	(3, 'Cliente');

-- Volcando estructura para tabla users_db.statuses
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla users_db.statuses: ~3 rows (aproximadamente)
INSERT IGNORE INTO `statuses` (`id`, `status_name`) VALUES
	(1, 'Activo'),
	(2, 'Inactivo'),
	(3, 'Bloqueado');

-- Volcando estructura para tabla users_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla users_db.users: ~5 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `name`, `lastname`, `address`, `phone`, `email`, `username`, `password`, `role_id`, `status_id`) VALUES
	('1ea16e5f-dd43-4be4-9db4-cf87111051ac', 'Jane', 'Smith', '456 Oak Avenue, Riverside', '555-5678', 'janesmith@example.com', 'janesmith', '$2b$10$YJRvS1Ii30fbj5QsPtu7R.lmj9uzT7fZBXc1GVjsVWPSdR/m6AFQm', 3, 1),
	('40336a14-2451-471c-8863-f64626186664', 'Michael', 'Johnson', '789 Pine Road, Lakeview', '555-9012', 'michaelj@example.com', 'michaelj', '$2b$10$AkRZBl3iJhM2zJy7Av5QVO6h77zojYOAf4jY0nFChb9gObxdIdDgy', 3, 1),
	('b3a4ef56-c030-462d-842a-c67aa17f4c57', 'John', 'Doe', '123 Maple Street, Springfield', '555-1234', 'johndoe@example.com', 'johndoe', '$2b$10$Bl0xl4hDRSOL1jOiKx3lWeRm4vnGD5tHak11PekYwxhZ7DJIBFflu', 1, 1),
	('ce9967ed-fc21-46d5-9cc7-fbcf4fc05c5d', 'David', 'Martinez', '202 Birch Boulevard, Hillside', '555-7890', 'davidm@example.com', 'davidm', '$2b$10$qf9lmRBkr/bH7lAPW0IWYeTuWks4qmL1x5BLWZjs5bGYsFrSfXauu', 2, 1),
	('ea34aaab-30b0-4281-8081-21d02e7b1e88', 'Emily', 'Davis', '101 Cedar Lane, Brookfield', '555-3456', 'emilydavis@example.com', 'emilydavis', '$2b$10$tEMkHhwoDnzphzaWIM7zgOp8Vb9g4La4G9Fha2BCKWFUYhXUY3zya', 2, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
