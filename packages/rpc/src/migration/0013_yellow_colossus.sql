ALTER TABLE `user_profile` DROP PRIMARY KEY
ALTER TABLE `user_profile` ADD PRIMARY KEY (`request_id`);
ALTER TABLE `user_profile` MODIFY COLUMN `user_id` varchar(52);
ALTER TABLE `user_profile` MODIFY COLUMN `request_id` serial AUTO_INCREMENT NOT NULL;