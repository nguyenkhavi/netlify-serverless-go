CREATE TABLE `address` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`user_id` varchar(32),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`country` varchar(64),
	`state` varchar(64),
	`street` varchar(64),
	`secondStreet` varchar(64),
	`apartment_number` varchar(10),
	`postal_code` varchar(10),
	`contact_number` varchar(20),
	`is_default` boolean);

CREATE TABLE `notification_setting` (
	`user_id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`item_sold` boolean,
	`bid_activity` boolean,
	`price-change` boolean,
	`auction_expiration` boolean,
	`item_suggestion` boolean,
	`out_bid` boolean,
	`owned_item_update` boolean,
	`successful_purchase` boolean,
	`fleamint_newsletter` boolean,
	`mentioned` boolean,
	`replied` boolean,
	`messaged` boolean);

CREATE TABLE `security_question` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`question` varchar(64));

CREATE TABLE `subscriber` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`email` varchar(255));

CREATE TABLE `user_activity` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`user_id` varchar(32),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`browser` varchar(32),
	`ip_address` varchar(32),
	`location` varchar(128),
	`action` varchar(20));

CREATE TABLE `user_answer` (
	`id` varchar(12),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`user_id` varchar(32) NOT NULL,
	`question_id` varchar(12) NOT NULL,
	`memorable_answer` varchar(256),
	PRIMARY KEY(`question_id`,`user_id`)
);

CREATE TABLE `user_wallet` (
	`user_id` varchar(12),
	`wallet` varchar(64) PRIMARY KEY NOT NULL);

CREATE UNIQUE INDEX `email_idx` ON `subscriber` (`email`);
ALTER TABLE `user_answer` ADD CONSTRAINT `user_answer_question_id_security_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `security_question`(`id`) ON DELETE no action ON UPDATE no action;