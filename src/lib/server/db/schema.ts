import { relations } from 'drizzle-orm';
import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  // UUID string id
  id: varchar('id', { length: 36 }).primaryKey(),
  age: int('age'),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull()
});

export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id),
  // expiration as a proper timestamp
  expiresAt: timestamp('expires_at').notNull()
});


// --- AUTHORS ---
export const authors = mysqlTable('authors', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  bio: text('bio'),
  birthDate: varchar('birth_date', { length: 50 }), // or use date if you prefer
  createdAt: timestamp('created_at').defaultNow()
});

// --- BOOKS ---
export const books = mysqlTable('books', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  categoryId: int('category_id').references(() => categories.id, { onDelete: 'set null' }),
  authorId: int('author_id').references(() => authors.id, { onDelete: 'set null' }),
  filePath: varchar('file_path', { length: 1024 }).notNull(),
  fileSize: int('file_size'),
  createdAt: timestamp('created_at').defaultNow()
});

// --- CATEGORIES ---
export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description')
});

// --- BOOK-CATEGORY (Many-to-Many) ---
export const bookCategories = mysqlTable('book_categories', {
  id: int('id').primaryKey().autoincrement(),
  bookId: int('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
  categoryId: int('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' })
});

// --- USERS (site users) ---
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 50 }).default('member'),
  createdAt: timestamp('created_at').defaultNow()
});

// --- RELATIONS ---
export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books)
}));

export const booksRelations = relations(books, ({ one, many }) => ({
  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id]
  }),
  categories: many(bookCategories)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  books: many(bookCategories)
}));

export const bookCategoriesRelations = relations(bookCategories, ({ one }) => ({
  book: one(books, {
    fields: [bookCategories.bookId],
    references: [books.id]
  }),
  category: one(categories, {
    fields: [bookCategories.categoryId],
    references: [categories.id]
  })
}));

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
