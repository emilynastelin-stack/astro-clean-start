import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('./api-sheets.json'); // adjust if needed
  const data = fs.readFileSync(filePath, 'utf-8');

  return new Response(data, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
