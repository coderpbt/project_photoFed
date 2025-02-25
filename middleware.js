import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server';

let defaultLocale = 'en'
let locales = ['en', 'bn']

function getLocals(request) {
  const accpectLanguage = request.headers.get('accept-language') ?? undefined;
  const headers = { 'accept-language': accpectLanguage };
  const languages = new Negotiator({headers}).language();

  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  const pathaNameIsMissingLocal = locales.every((local) =>
    !pathname.startsWith(`/${local}`) && !pathname.startsWith(`/${local}/`)
  );

  if (pathaNameIsMissingLocal) { 
    const local = getLocals(request);
    
    return NextResponse.redirect(
      new URL(`${local}${pathname}`, request.url).toString(),
    )
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],

}