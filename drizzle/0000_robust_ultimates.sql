CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`bio` text,
	`birth_date` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `authors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `book_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`book_id` int NOT NULL,
	`category_id` int NOT NULL,
	CONSTRAINT `book_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category_id` int,
	`author_id` int,
	`file_path` varchar(1024) NOT NULL,
	`file_size` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`age` int,
	`username` varchar(255) NOT NULL,
	`password_hash` text NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` text NOT NULL,
	`role` varchar(50) DEFAULT 'member',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `book_categories` ADD CONSTRAINT `book_categories_book_id_books_id_fk` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `book_categories` ADD CONSTRAINT `book_categories_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_author_id_authors_id_fk` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;