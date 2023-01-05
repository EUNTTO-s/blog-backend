-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(100) UNIQUE NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `password` varchar(100) NOT NULL,
  `blog_title` varchar(100),
  `profile_intro` varchar(200),
  `profile_img_url` varchar(1000)
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `categories_id` integer NOT NULL,
  `topics_id` integer NOT NULL,
  `content` varchar(150) NOT NULL,
  `thumnail_img_url` varchar(1000),
  `is_secret` tinyint DEFAULT 0 COMMENT '0: 모두 공개, 1: 맞팔 공개, 2: 비공개'
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `category_name` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `topics` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `topic_name` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `follow` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `target_users_id` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer,
  `comments_id` integer,
  `users_id` integer,
  `comment_content` varchar(1000) NOT NULL
);

CREATE UNIQUE INDEX `follow_index_0` ON `follow` (`users_id`, `target_users_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`topics_id`) REFERENCES `topics` (`id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`target_users_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

-- migrate:down

SET foreign_key_checks = 0;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE categories;
DROP TABLE topics;
DROP TABLE follow;
DROP TABLE users;


SET foreign_key_checks = 1;