-- migrate:up
CREATE TABLE IF NOT EXISTS `likes_postings_users` (
  `user_id` int NOT NULL,
  `posting_id` int NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime default now() ON UPDATE now(),
  PRIMARY KEY (`user_id`, `posting_id`)
);

ALTER TABLE `likes_postings_users` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);
ALTER TABLE `likes_postings_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE `likes_postings_users`