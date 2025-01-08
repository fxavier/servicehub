// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
// 	const requestUrl = new URL(request.url);
// 	const code = requestUrl.searchParams.get('code');

// 	return NextResponse.redirect(requestUrl.origin);
// }

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	return NextResponse.redirect(requestUrl.origin);
}
