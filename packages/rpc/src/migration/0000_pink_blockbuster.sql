CREATE TABLE `kyc_info` (
	`id` varchar(32),
	`persona_inquiry_id` varchar(32),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`completed_at` datetime,
	`birth_date` datetime,
	`first_name` varchar(32),
	`last_name` varchar(32),
	`street_1` varchar(32),
	`street_2` varchar(32),
	`city` varchar(32),
	`postal_code` varchar(32),
	`identification_number` varchar(32),
	`phone_number` varchar(32));

CREATE TABLE `achievement` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`total_volume` int,
	`project` int,
	`global_partner` int,
	`total_user` int);

CREATE TABLE `activity` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`type` varchar(32),
	`from_user_id` varchar(32),
	`to_user_id` varchar(32),
	`price` float,
	`transaction_hash` varchar(64),
	`quantity` int,
	`token_id` varchar(32),
	`collection_id` varchar(32),
	`item_id` varchar(32));

CREATE TABLE `address` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`country` varchar(64) NOT NULL,
	`state` varchar(64) NOT NULL,
	`street` varchar(64) NOT NULL,
	`second_street` varchar(64) NOT NULL,
	`apartment_number` varchar(10) NOT NULL,
	`postal_code` varchar(10) NOT NULL,
	`contact_number` varchar(20) NOT NULL,
	`dial_code` varchar(10) NOT NULL,
	`is_default` boolean NOT NULL,
	`additional_information` varchar(128),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime);

CREATE TABLE `bid` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`user_id` varchar(32),
	`price` float,
	`transaction_hash` varchar(64),
	`market_id` varchar(32));

CREATE TABLE `chain` (
	`id` varchar(32),
	`name` varchar(32),
	`code` varchar(32));

CREATE TABLE `collection` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`creator_id` varchar(32),
	`metadata` varchar(32),
	`name` varchar(32),
	`contract_address` varchar(32),
	`token-standard` varchar(32),
	`image` varchar(128),
	`royalty_fee_percentage` float,
	`chain_id` varchar(32));

CREATE TABLE `item` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`name` varchar(32),
	`metadata` varchar(32),
	`image` varchar(128),
	`token_id` varchar(64),
	`user_id` varchar(32),
	`contract_address` varchar(32),
	`collection_id` varchar(32));

CREATE TABLE `market_listing` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`expired_at` datetime,
	`user_id` varchar(32),
	`market_type` varchar(32),
	`price` float,
	`buyout_price` float,
	`reverse_price` float,
	`royalty_fee_percentage` float,
	`quantity` int,
	`transaction_hash` varchar(64),
	`item_id` varchar(32),
	`collection_id` varchar(32),
	`token_id` varchar(32));

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

CREATE TABLE `search_history` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`keyword` text NOT NULL,
	`created_at` timestamp DEFAULT NOW());

CREATE TABLE `security_question` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`question` varchar(64));

CREATE TABLE `session` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`iss` varchar(52) NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`token` varchar(1000) NOT NULL,
	`userAgent` varchar(255),
	`ipAddress` varchar(48),
	`origin` varchar(255),
	`location` varchar(128),
	`ext` int);

CREATE TABLE `subscriber` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`email` varchar(255));

CREATE TABLE `suggestion` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`user_id` varchar(52),
	`type` varchar(32),
	`detail` text);

CREATE TABLE `token` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`token_contract` varchar(64),
	`token_symbol` varchar(64),
	`token_name` varchar(64),
	`token_decimal` int,
	`chain_id` varchar(32));

CREATE TABLE `user_activity` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`browser` varchar(32),
	`ip_address` varchar(32),
	`location` varchar(128),
	`action` varchar(20));

CREATE TABLE `user_answer` (
	`id` varchar(12),
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`user_id` varchar(32) NOT NULL,
	`memorable_answer` varchar(256),
	`question_id` varchar(12) NOT NULL,
	PRIMARY KEY(`question_id`,`user_id`)
);

CREATE TABLE `user_post` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(52) NOT NULL,
	`post_id` varchar(52) NOT NULL,
	`getstream_id` varchar(12) NOT NULL,
	`content` varchar(3072),
	`created_at` timestamp DEFAULT NOW());

CREATE TABLE `user_profile` (
	`request_id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT NOW(),
	`user_id` varchar(52),
	`wallet` varchar(52),
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`dob` timestamp NOT NULL,
	`gender` varchar(8) NOT NULL,
	`phone_code` varchar(8) NOT NULL,
	`phone_number` varchar(16) NOT NULL,
	`getstream_id` varchar(12) NOT NULL,
	`avatar_url` tinytext,
	`cover_url` tinytext,
	`about_me` tinytext,
	`description` tinytext,
	`twitter_uid` tinytext,
	`instagram_uid` tinytext,
	`persona_inquiry_id` tinytext);

CREATE TABLE `user_wallet` (
	`user_id` varchar(12),
	`wallet` varchar(64) PRIMARY KEY NOT NULL);

CREATE UNIQUE INDEX `kyc_id_idx` ON `kyc_info` (`id`);
CREATE UNIQUE INDEX `kyc_persona_id_idx` ON `kyc_info` (`persona_inquiry_id`);
CREATE INDEX `suggestion_user_id_idx` ON `achievement` (`project`);
CREATE INDEX `collection_id_idx` ON `activity` (`id`);
CREATE INDEX `bid_id_idx` ON `bid` (`id`);
CREATE UNIQUE INDEX `kyc_id_idx` ON `chain` (`id`);
CREATE INDEX `collection_id_idx` ON `collection` (`id`);
CREATE INDEX `item_id_idx` ON `item` (`id`);
CREATE INDEX `item_user_id_idx` ON `item` (`user_id`);
CREATE INDEX `market_listing_id_idx` ON `market_listing` (`id`);
CREATE INDEX `email_idx` ON `subscriber` (`email`);
CREATE INDEX `suggestion_user_id_idx` ON `suggestion` (`user_id`);
CREATE INDEX `token_id_idx` ON `token` (`id`);
CREATE INDEX `activity_user_id_idx` ON `user_activity` (`user_id`);
CREATE INDEX `activity_action_idx` ON `user_activity` (`action`);
CREATE INDEX `content_idx` ON `user_post` (`content`);
CREATE INDEX `getstream_id_idx` ON `user_post` (`content`);
CREATE INDEX `username_idx` ON `user_profile` (`username`);
CREATE INDEX `email_idx` ON `user_profile` (`email`);
CREATE INDEX `phone_idx` ON `user_profile` (`phone_code`,`phone_number`);
CREATE INDEX `wallet_idx` ON `user_profile` (`wallet`);
CREATE INDEX `getstream_id_idx` ON `user_profile` (`getstream_id`);