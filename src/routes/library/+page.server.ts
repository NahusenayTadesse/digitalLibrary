import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { authors, books, categories } from '$lib/server/db/schema';

export async function load() {
  // SELECT name, address FROM books;
  const rows = await db.select({ 
    id: books.id, 
    title: books.title, 
    category: categories.name, 
    author: authors.name,
    path: books.filePath })
    .from(books)
    .leftJoin(categories, eq(books.categoryId, categories.id))
    .leftJoin(authors, eq(books.authorId, authors.id)); 

  // map to the exact shape the UI already expects
  return {
    pdfs: rows
  };
}