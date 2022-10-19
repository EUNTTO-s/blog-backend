-- migrate:up
CREATE TABLE IF NOT EXISTS `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE NOT NULL,
  `nickname` varchar(50),
  `password` varchar(300) NOT NULL,
  `profile_image` varchar(3000),
  `created_at` datetime DEFAULT (now())
);

-- migrate:down
DROP TABLE `users`