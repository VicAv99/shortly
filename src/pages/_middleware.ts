import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/favicon.ico" || pathname === "/" || !pathname) return;
  if (pathname.startsWith("/api/get-url/")) return;

  const slug = pathname.split("/").pop();
  const url = `${origin}/api/get-url/${slug}`;
  const data = await (await fetch(url)).json();

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
}
