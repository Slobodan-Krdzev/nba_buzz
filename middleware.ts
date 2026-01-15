import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false, // Disable automatic browser language detection
});

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  
  // Explicitly redirect root to /mk
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/mk', request.url));
  }
  
  return intlMiddleware(request);
}
 
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}