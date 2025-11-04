import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { FILES_DIR } from '$env/static/private';

export async function GET({ params }) {
  const fileName = decodeURIComponent(params.name);
  const filePath = path.join(process.cwd(), FILES_DIR, fileName);

  try {
    const stats = await stat(filePath);
    const stream = createReadStream(filePath);

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': stats.size,
        // NO Content-Disposition → browser will preview, not download
      }
    });
  } catch {
    return new Response('PDF Not Found 💔', { status: 404 });
  }
}