import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

const PUBLIC_FILE = /\.(.*)$/
// /cabinet, /booking, /privacy — нелокалізовані розділи поза [locale], їх не префіксуємо.
const SKIP_PATHS = ['/admin', '/api', '/_next', '/media', '/favicon', '/robots.txt', '/sitemap.xml', '/llms.txt', '/cabinet', '/booking', '/privacy']

function getLocaleFromRequest(request: NextRequest): string {
  // 1. Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get('Accept-Language')
  if (acceptLang) {
    const preferredLangs = acceptLang
      .split(',')
      .map((lang) => {
        const [code, q] = lang.trim().split(';q=')
        return { code: code.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
      })
      .sort((a, b) => b.q - a.q)

    for (const { code } of preferredLangs) {
      if (locales.includes(code as any)) {
        return code
      }
    }
  }

  // 3. Default
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API, admin, static files, etc.
  if (
    SKIP_PATHS.some((path) => pathname.startsWith(path)) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Detect locale and redirect
  const locale = getLocaleFromRequest(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|admin|api|media|favicon|cabinet|booking|privacy|.*\\..*).*)'],
}
