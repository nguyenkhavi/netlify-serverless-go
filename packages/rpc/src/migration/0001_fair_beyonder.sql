ALTER TABLE `user_answer` DROP FOREIGN KEY `user_answer_question_id_security_question_id_fk`;

DROP INDEX `email_idx` ON `subscriber`;
CREATE INDEX `activity_user_id_idx` ON `user_activity` (`user_id`);
CREATE INDEX `activity_action_idx` ON `user_activity` (`action`);
CREATE INDEX `email_idx` ON `subscriber` (`email`);