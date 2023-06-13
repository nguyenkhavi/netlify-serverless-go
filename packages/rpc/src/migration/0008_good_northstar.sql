ALTER TABLE `session` MODIFY COLUMN `iss` varchar(52) NOT NULL;
ALTER TABLE `session` MODIFY COLUMN `token` varchar(1000) NOT NULL;