ALTER TABLE `session` MODIFY COLUMN `token` varchar(1000);
ALTER TABLE `session` ADD `userAgent` varchar(255);
ALTER TABLE `session` ADD `ipAddress` varchar(48);
ALTER TABLE `session` ADD `origin` varchar(255);