import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/api/get-url/")) return;
  const slug = req.nextUrl.pathname.split("/").pop();
  const url = `${req.nextUrl.origin}/api/get-url/${slug}`;
  const data = await (await fetch(url)).json();

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
}
