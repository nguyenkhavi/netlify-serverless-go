CREATE TABLE `session` (
	`iss` varchar(52) PRIMARY KEY NOT NULL,
	`created_at` datetime DEFAULT NOW(),
	`updated_at` datetime,
	`token` varchar(1000),
	`ext` int);

CREATE UNIQUE INDEX `token_unique_idx` ON `session` (`token`);