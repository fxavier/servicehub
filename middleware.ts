import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	// Protected routes
	const protectedPaths = ['/dashboard', '/messages', '/bookings'];
	const isProtectedPath = protectedPaths.some((path) =>
		req.nextUrl.pathname.startsWith(path)
	);

	// Assuming you have another way to check for authentication
	const isAuthenticated = false; // Replace with your authentication logic

	if (isProtectedPath && !isAuthenticated) {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	return res;
}
