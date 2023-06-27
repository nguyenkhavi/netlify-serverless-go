ALTER TABLE `close_account_request` RENAME COLUMN `user_id` TO `wallet`;
DROP INDEX `close_account_wallet_id_idx` ON `close_account_request`;
CREATE INDEX `close_account_wallet_id_idx` ON `close_account_request` (`wallet`);