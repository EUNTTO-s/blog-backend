-- migrate:up
CREATE TABLE IF NOT EXISTS `posting_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `posting_id` int NOT NULL,
  `image_url` varchar(3000),
  `created_at` datetime DEFAULT (now())
);

ALTER TABLE `posting_images` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);


-- migrate:down
DROP TABLE `posting_images`