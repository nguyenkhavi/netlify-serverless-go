CREATE TABLE `close_account_request` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`tell_us` varchar(52) NOT NULL,
	`tell_us_more` text);

CREATE INDEX `close_account_wallet_id_idx` ON `close_account_request` (`user_id`);