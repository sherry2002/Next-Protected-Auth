import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check if the request is to the root path
    // if (pathname === '/') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // Continue with the request if not to the root path
    return NextResponse.next();
}
