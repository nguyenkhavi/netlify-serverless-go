DROP INDEX `username_idx` ON `user_profile`;
CREATE INDEX `email_idx` ON `user_profile` (`email`);
CREATE INDEX `wallet_idx` ON `user_profile` (`wallet`);
CREATE INDEX `username_idx` ON `user_profile` (`username`);