CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(100) UNIQUE NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `password` varchar(100) NOT NULL,
  `blog_title` varchar(100),
  `profile_intro` varchar(200),
  `profile_img_url` varchar(1000),
  `created_at` datetime NOT NULL DEFAULT (now())
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer NOT NULL,
  `categories_id` integer COMMENT 'ref: > cate.id',
  `topics_id` integer NOT NULL,
  `title` varchar(300) NOT NULL,
  `content` varchar(1500) NOT NULL,
  `thumnail_img_url` varchar(1000),
  `secret_type` tinyint DEFAULT 0 COMMENT '0: 모두 공개, 1: 맞팔 공개, 2: 비공개',
  `created_at` datetime NOT NULL DEFAULT (now())
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `pos` integer,
  `users_id` integer,
  `category_name` varchar(150) NOT NULL
);

CREATE TABLE `topics` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `pos` integer,
  `topic_name` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `follow` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `target_users_id` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer COMMENT 'ref: > p.id',
  `comments_id` integer COMMENT 'ref: > cmt.id',
  `users_id` integer,
  `comment_content` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now())
);

CREATE TABLE `tags` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `tag_name` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `urls` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `title` varchar(150) NOT NULL,
  `url` varchar(500)
);

CREATE TABLE `posts_tags` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer NOT NULL COMMENT 'ref: > posts.id',
  `tags_id` integer NOT NULL COMMENT 'ref: > tags.id'
);

CREATE UNIQUE INDEX `categories_index_0` ON `categories` (`users_id`, `category_name`);

CREATE UNIQUE INDEX `categories_index_1` ON `categories` (`users_id`, `pos`);

CREATE UNIQUE INDEX `follow_index_2` ON `follow` (`users_id`, `target_users_id`);

CREATE UNIQUE INDEX `urls_index_3` ON `urls` (`users_id`, `title`);

CREATE UNIQUE INDEX `posts_tags_index_4` ON `posts_tags` (`posts_id`, `tags_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`topics_id`) REFERENCES `topics` (`id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`target_users_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `urls` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `posts_tags` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `posts_tags` ADD FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;