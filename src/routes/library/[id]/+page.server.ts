import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { authors, books, categories } from '$lib/server/db/schema'
import {eq} from 'drizzle-orm'

export async function load({ params }) {
  const rows = await db.select({
    id:      books.id,
    name:    books.title,
    category: categories.name,
    author: authors.name,
    description: books.description,
    address: books.filePath
  })
  .from(books)
   .leftJoin(categories, eq(books.categoryId, categories.id))
    .leftJoin(authors, eq(books.authorId, authors.id))
  .where(eq(books.id, params.id))
  .limit(1);

  if (!rows.length) throw error(404, 'Book not found 💔');

  // return what the page needs
  return {
    book: rows[0] // { id, name, address }
  };
}