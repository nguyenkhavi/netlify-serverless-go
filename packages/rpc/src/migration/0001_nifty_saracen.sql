CREATE TABLE `follow` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`followed_user_id` varchar(12) NOT NULL,
	`following_user_id` varchar(12) NOT NULL,
	`created_at` timestamp DEFAULT NOW()
);

CREATE INDEX `followed_user_id_idx` ON `follow` (`followed_user_id`);

CREATE INDEX `following_user_id_idx` ON `follow` (`following_user_id`);

ALTER TABLE
	`user_post`
ADD
	FULLTEXT INDEX `fulltext`(content);