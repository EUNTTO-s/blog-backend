-- migrate:up
CREATE TABLE `urls` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `title` varchar(150) NOT NULL,
  `url` varchar(500)
);

ALTER TABLE `urls` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
CREATE UNIQUE INDEX `urls_index_3` ON `urls` (`users_id`, `title`);

-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE urls;
SET foreign_key_checks = 1;
