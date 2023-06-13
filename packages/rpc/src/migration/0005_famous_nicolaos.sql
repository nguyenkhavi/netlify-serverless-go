ALTER TABLE `session` DROP PRIMARY KEY
ALTER TABLE `session` ADD PRIMARY KEY (`token`);
ALTER TABLE `session` MODIFY COLUMN `iss` varchar(52);
ALTER TABLE `session` MODIFY COLUMN `token` varchar(1000) NOT NULL;