import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname;

    // 1. Protect all /admin routes
    if (path.startsWith('/admin')) {
        // 2. Allow access to the secret login page
        if (path === '/admin/anildaspoolatt/login') {
            // Optional: If already logged in, redirect to dashboard?
            if (user) {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
            return response; // Allow access to login page
        }

        // 3. If user is NOT logged in and tries to access any other /admin route
        if (!user) {
            // Redirect to Home Page (Obscurity: pretend /admin doesn't exist)
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
