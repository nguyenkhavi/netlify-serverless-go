ALTER TABLE `address` MODIFY COLUMN `apartment_number` text NOT NULL;
ALTER TABLE `otp_pending` DROP COLUMN `created_at`;