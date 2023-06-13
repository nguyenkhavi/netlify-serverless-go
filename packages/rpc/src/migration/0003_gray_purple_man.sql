ALTER TABLE `session` MODIFY COLUMN `token` varchar(255);
ALTER TABLE `session` DROP COLUMN `updated_at`;