import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    if (path.startsWith('/api')) return NextResponse.next();
    const authPath = path === '/login' || path === '/signup';
    const userPath = path === '/profileEdit' || path === '/message' || path === '/blog/createBlog' || path === '/logout';
    const token = request.cookies.get('token');
    if (authPath && token) return NextResponse.redirect(new URL('/', request.url));
    if (userPath && !token) return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/profileEdit',
        '/message',
        '/blog/createBlog',
        '/logout',
        '/login',
        '/signup',
    ],
}