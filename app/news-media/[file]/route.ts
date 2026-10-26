import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {basename, join} from 'node:path';
import {NextResponse} from 'next/server';
import {NEWS_DIR} from '@/lib/news/load';

export const runtime = 'nodejs';

const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

const FALLBACK = join(process.cwd(), 'public/news-media/fallback.svg');

type Props = {params: Promise<{file: string}>};

export function generateStaticParams() {
  const files = existsSync(NEWS_DIR)
    ? readdirSync(NEWS_DIR).filter(name => Object.keys(TYPES).includes(name.slice(name.lastIndexOf('.')).toLowerCase()))
    : [];
  return [...files, 'fallback.svg'].map(file => ({file}));
}

export async function GET(_request: Request, {params}: Props) {
  const {file} = await params;
  const name = decodeURIComponent(file);
  if (!name || name !== basename(name) || name.startsWith('.')) {
    return new NextResponse('Not found', {status: 404});
  }
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
  const type = TYPES[ext];
  if (!type) return new NextResponse('Not found', {status: 404});
  const fromContent = join(NEWS_DIR, name);
  const path = existsSync(fromContent) ? fromContent : name === 'fallback.svg' && existsSync(FALLBACK) ? FALLBACK : null;
  if (!path) return new NextResponse('Not found', {status: 404});
  return new NextResponse(readFileSync(path), {
    headers: {
      'Content-Type': type,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
