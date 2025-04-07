import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const isLoggedIn = Boolean(cookies.user); // Check if user is logged in

  const { pathname } = req.nextUrl;

  // Protect all routes except sign-in
  if (!isLoggedIn && pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/**'], // Protect all routes
};
