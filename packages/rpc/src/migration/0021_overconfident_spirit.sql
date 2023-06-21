CREATE TABLE `search_history` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`keyword` text NOT NULL,
	`created_at` timestamp DEFAULT NOW());

CREATE TABLE `user_post` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`getstream_id` varchar(12) NOT NULL,
	`content` text,
	`created_at` timestamp DEFAULT NOW());

ALTER TABLE `user_profile` ADD `getstream_id` varchar(12) NOT NULL;
CREATE INDEX `content_idx` ON `user_post` (`content`);
CREATE INDEX `getstream_id_idx` ON `user_post` (`content`);