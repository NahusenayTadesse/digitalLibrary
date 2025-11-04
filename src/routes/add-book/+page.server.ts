
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { env } from '$env/dynamic/private';


const FILES_DIR: string = env.FILES_DIR ?? '.tempFiles';

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

import { db } from "$lib/server/db";
import { authors, books, categories  } from "$lib/server/db/schema";
import type { Actions } from "./$types";
import { fail } from '@sveltejs/kit';

export const load = async () => {
  

    const categoryList = await db.select(
     { value: categories.id,
      name: categories.name,
      description: categories.description}

    ).from(categories);

    return {
      categories: categoryList
    }
}



export const actions: Actions = {
  default: async ({request}) => {

   
 
const form = await request.formData();


    const title = form.get('title')?.toString().trim();
    const category = form.get('category');
    const author = form.get('author')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const file     = form.get('book') as File;        // File object

    // basic checks
    if (!title)        return fail(400, { title, missingName: true });
    if (!file?.name)      return fail(400, { title, missingFile: true });
    if (file.type !== 'application/pdf')
                          return fail(400, { title, invalidType: true });

   try{

     const filePath = `${alphaNumUUID()}${path.extname(file.name)}`;;

const file_path: string = path.normalize(
  path.join(FILES_DIR, filePath));    		

    const nodejs_wstream = fs.createWriteStream(file_path);
    const web_rstream = file.stream();
    const nodejs_rstream = Readable.fromWeb(web_rstream);
    await pipeline(nodejs_rstream, nodejs_wstream).catch(() => {
      return fail(500);
    });


const [authorId] = await db.insert(authors).values({ name: author }).$returningId();

         await db.insert(books).values({
            title,
            authorId: authorId.id,
            categoryId: category,
            description,
            filePath,
            fileSize: file.size
         });

        return { success: true, title };

        

       
} catch(err){
         
        console.error('Error adding book:', err);
        return fail(500, { message: 'Failed to add book.' });
    }

  },

  
}


import { webcrypto as crypto } from 'crypto';

function alphaNumUUID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const getRandomChar = () => {
    const randomValue = crypto.getRandomValues(new Uint8Array(1))[0];
    return chars.charAt(randomValue % chars.length);
  };
  const sections = [8, 4, 4, 4, 12];
  return sections.map(len => Array.from({ length: len }, getRandomChar).join('')).join('-');
}


