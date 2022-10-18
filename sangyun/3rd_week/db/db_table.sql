CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE NOT NULL,
  `nickname` varchar(50),
  `password` varchar(300) NOT NULL,
  `profile_image` varchar(3000),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `postings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `contents` varchar(2000),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `posting_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `posting_id` int NOT NULL,
  `image_url` varchar(3000),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comment` varchar(2000),
  `posting_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `likes_postings_users` (
  `user_id` int NOT NULL,
  `posting_id` int NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime default now() ON UPDATE now(),
  PRIMARY KEY (`user_id`, `posting_id`)
);

ALTER TABLE `postings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `posting_images` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `likes_postings_users` ADD FOREIGN KEY (`posting_id`) REFERENCES `postings` (`id`);

ALTER TABLE `likes_postings_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
