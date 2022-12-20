-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `password` varchar(100) NOT NULL
);

CREATE TABLE `companies` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL
);

CREATE TABLE `company_posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `companies_id` integer NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `level_2_categories_id` integer NOT NULL,
  `company_img_url` varchar(100) NOT NULL,
  `company_short_desc` varchar(100) NOT NULL,
  `homepage_url` varchar(100),
  `main_bussiness_tags` varchar(300) NOT NULL,
  `company_long_desc` varchar(1000),
  `fastfive_benefit_desc` varchar(100),
  `company_contact_address` varchar(100) NOT NULL,
  `company_info_url` varchar(100),
  `fastfive_branches_id` integer NOT NULL,
  `users_id` integer NOT NULL
);

CREATE TABLE `company_post_forms` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `companies_id` integer NOT NULL,
  `company_name` varchar(100),
  `level_2_categories_id` integer,
  `company_img_url` varchar(100),
  `company_short_desc` varchar(100),
  `homepage_url` varchar(100),
  `main_bussiness_tags` varchar(300),
  `company_long_desc` varchar(1000),
  `fastfive_benefit_desc` varchar(100),
  `company_contact_address` varchar(100),
  `company_info_url` varchar(100),
  `fastfive_branches_id` integer,
  `updated_at` datetime default now() ON UPDATE now() NOT NULL,
  `users_id` integer
);

CREATE TABLE `level_1_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `img_url` varchar(500) NOT NULL,
  `category_name` varchar(150) UNIQUE NOT NULL,
  `description` varchar(150)
);

CREATE TABLE `level_2_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `level_1_categories_id` integer,
  `category_name` varchar(150) NOT NULL,
  `description` varchar(150)
);

CREATE TABLE `company_members` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `companies_id` integer,
  `users_id` integer,
  `is_main_member` tinyint DEFAULT 0
);

CREATE TABLE `fastfive_branches` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `branch_name` varchar(150) NOT NULL,
  `locations_id` integer
);

CREATE TABLE `company_residences` (
  `companies_id` integer PRIMARY KEY,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `created_at` datetime default now() NOT NULL
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `comments_id` integer,
  `users_id` integer,
  `company_posts_id` integer,
  `comment_content` varchar(1000) NOT NULL,
  `is_secret` tinyint DEFAULT 0,
  `depth` integer,
  `sequence` integer,
  `created_at` datetime default now() NOT NULL
);

CREATE TABLE `banners` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `banner_url` varchar(200) NOT NULL
);

CREATE TABLE `locations` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL
);

CREATE TABLE `admins` (
  `users_id` integer
);

CREATE TABLE `company_request` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `company_name` varchar(100) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
);

CREATE TABLE `member_join_request` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `companies_id` integer,
  `created_at` datetime default now() NOT NULL
);

CREATE UNIQUE INDEX `company_members_index_0` ON `company_members` (`companies_id`, `users_id`);

ALTER TABLE `company_posts` ADD FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

ALTER TABLE `company_posts` ADD FOREIGN KEY (`level_2_categories_id`) REFERENCES `level_2_categories` (`id`);

ALTER TABLE `company_posts` ADD FOREIGN KEY (`fastfive_branches_id`) REFERENCES `fastfive_branches` (`id`);

ALTER TABLE `company_posts` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `company_post_forms` ADD FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

ALTER TABLE `company_post_forms` ADD FOREIGN KEY (`level_2_categories_id`) REFERENCES `level_2_categories` (`id`);

ALTER TABLE `company_post_forms` ADD FOREIGN KEY (`fastfive_branches_id`) REFERENCES `fastfive_branches` (`id`);

ALTER TABLE `company_post_forms` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `level_2_categories` ADD FOREIGN KEY (`level_1_categories_id`) REFERENCES `level_1_categories` (`id`);

ALTER TABLE `company_members` ADD FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

ALTER TABLE `company_members` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `fastfive_branches` ADD FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`);

ALTER TABLE `company_residences` ADD FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`company_posts_id`) REFERENCES `company_posts` (`id`);

ALTER TABLE `admins` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `company_request` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `member_join_request` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `member_join_request` ADD FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

-- migrate:down

SET foreign_key_checks = 0;

DROP TABLE users;
DROP TABLE companies;
DROP TABLE company_posts;
DROP TABLE company_post_forms;
DROP TABLE level_1_categories;
DROP TABLE level_2_categories;
DROP TABLE company_members;
DROP TABLE fastfive_branches;
DROP TABLE company_residences;
DROP TABLE comments;
DROP TABLE banners;
DROP TABLE locations;
DROP TABLE admins;
DROP TABLE company_request;
DROP TABLE member_join_request;

SET foreign_key_checks = 1;