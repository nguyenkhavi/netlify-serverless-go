ALTER TABLE `user_activity` MODIFY COLUMN `user_id` varchar(52) NOT NULL;
ALTER TABLE `session` ADD `location` varchar(128);
ALTER TABLE `user_activity` DROP COLUMN `updated_at`;