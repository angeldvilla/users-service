-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para users_db
CREATE DATABASE IF NOT EXISTS `users_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `users_db`;

-- Volcando estructura para tabla users_db.logins
CREATE TABLE IF NOT EXISTS `logins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) DEFAULT NULL,
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
	('f5a59002-7954-4474-89fa-7bafcbd24867', '', '7cea2b3f-525a-4f62-8ca4-3bf59d95e366', 0, '2024-11-06 16:25:19', '2024-11-06 17:44:48');

-- Volcando estructura para tabla users_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla users_db.roles: ~2 rows (aproximadamente)
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

-- Volcando datos para la tabla users_db.statuses: ~2 rows (aproximadamente)
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

-- Volcando datos para la tabla users_db.users: ~4 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `name`, `lastname`, `address`, `phone`, `email`, `username`, `password`, `role_id`, `status_id`) VALUES
	('606065aa-4f7a-48fd-bb16-8b86976423b7', 'Michael', 'Johnson', '789 Pine Road, Lakeview', '555-9012', 'michaelj@example.com', 'michaelj', '$2b$10$K/SMtFhT5k0AeCoN6Gij3.pcsHU9/C0vZuYcDC4W/ejcihG35Gmfe', 3, 1),
	('7cea2b3f-525a-4f62-8ca4-3bf59d95e366', 'John', 'Doe', '123 Maple Street, Springfield', '555-1234', 'johndoe@example.com', 'johndoe', '$2b$10$HFDP1lquzZTtJWjTsUoE6uvch1LYAuPV3sf3FNrzDzMpTO6fbh112', 1, 1),
	('b32687a7-f041-496f-ac6d-01a975728f8f', 'Emily', 'Davis', '101 Cedar Lane, Brookfield', '555-3456', 'emilydavis@example.com', 'emilydavis', '$2b$10$uAyGp3POgu9OTdXWPf.h8ec3cLRFajtw8WA9rsfZmkC7PkE/zhcxu', 2, 1),
	('ced51417-496b-4893-b553-c7c0de4fc8e7', 'Jane', 'Smith', '456 Oak Avenue, Riverside', '555-5678', 'janesmith@example.com', 'janesmith', '$2b$10$lmFlbuJ0YxnnpIPrTXwWkejY9PWb9TK4tkUuEbeKtzj0Noaw95dcq', 3, 1),
	('f80c2d9a-8bee-46a8-ab22-5bb495f6531c', 'David', 'Martinez', '202 Birch Boulevard, Hillside', '555-7890', 'davidm@example.com', 'davidm', '$2b$10$7eDfayA.o5Iq9W9t9aATMuxZBpc48tnqbKJenVK03uTHSCuFNReha', 2, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
