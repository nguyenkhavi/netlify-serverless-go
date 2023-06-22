CREATE TABLE `suggestion` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`user_id` varchar(52),
	`type` varchar(32),
	`detail` text);

CREATE INDEX `suggestion_user_id_idx` ON `suggestion` (`user_id`);