-- migrate:up
CREATE TABLE IF NOT EXISTS `postings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `contents` varchar(2000),
  `created_at` datetime DEFAULT (now())
);

ALTER TABLE `postings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE `postings`