-- migrate:up
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comment` varchar(2000),
  `posting_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT (now())
);

ALTER TABLE `comments` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);


-- migrate:down
DROP TABLE `posting_images`