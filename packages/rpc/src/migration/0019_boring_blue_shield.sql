ALTER TABLE `address` ADD `second_street` varchar(64);
ALTER TABLE `user_profile` ADD `wallet` varchar(52);
CREATE INDEX `username_idx` ON `user_profile` (`email`);
CREATE INDEX `phone_idx` ON `user_profile` (`phone_code`,`phone_number`);
ALTER TABLE `address` DROP COLUMN `secondStreet`;