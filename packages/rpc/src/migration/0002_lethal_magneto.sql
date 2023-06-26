DROP INDEX `followed_user_id_idx` ON `follow`;
DROP INDEX `following_user_id_idx` ON `follow`;
ALTER TABLE `follow` DROP COLUMN `id`;
ALTER TABLE `follow` DROP COLUMN `created_at`;
ALTER TABLE `follow` ADD PRIMARY KEY(`followed_user_id`,`following_user_id`);