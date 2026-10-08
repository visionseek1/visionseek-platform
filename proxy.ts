import {NextResponse, type NextRequest} from 'next/server';
import {archivedPaths, isArchived} from '@/lib/visibility';

/** Archived pages (/admin «الأرشيف») redirect to the home page in the same language. Nothing is deleted. */
export function proxy(request: NextRequest) {
  if (archivedPaths.length === 0) return NextResponse.next();
  const {pathname} = request.nextUrl;
  if (!isArchived(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/ar' || pathname.startsWith('/ar/') ? '/ar' : '/';
  url.search = '';
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};
