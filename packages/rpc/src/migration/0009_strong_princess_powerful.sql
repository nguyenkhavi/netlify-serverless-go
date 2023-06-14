CREATE TABLE `user_profile` (
	`user_id` varchar(52) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`dob` datetime NOT NULL,
	`gender` varchar(8) NOT NULL);

CREATE UNIQUE INDEX `username_idx` ON `user_profile` (`email`);