ALTER TABLE `user_profile` MODIFY COLUMN `dob` datetime NOT NULL;
ALTER TABLE `otp_pending` DROP COLUMN `id`;
ALTER TABLE `otp_pending` ADD PRIMARY KEY(`type`,`uid`);