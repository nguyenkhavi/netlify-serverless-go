CREATE TABLE `otp_pending` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`uid` varchar(52) NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`type` varchar(20) NOT NULL,
	`value` tinytext NOT NULL,
	`ext` int NOT NULL);

ALTER TABLE `user_profile` ADD `totp_secret` tinytext;
CREATE UNIQUE INDEX `uid_type_idx` ON `otp_pending` (`uid`,`type`);