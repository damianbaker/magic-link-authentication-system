import { jwtVerify, SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'my_super_secret')

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing token' })
  }

  try {
    // 1. Verify the Magic Link Token
    const { payload } = await jwtVerify(token as string, SECRET)
    
    // 2. Generate a new session token
    const sessionToken = await new SignJWT({ 
        email: payload.email, 
        sub: payload.sub
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // Session lasts 7 days
      .sign(SECRET)

    // 3. Set Cookie with the SESSION TOKEN
    setCookie(event, 'auth_session', sessionToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    // 4. Redirect
    return sendRedirect(event, '/dashboard')
    
  } catch (error) {
    console.error(error) // Log actual error for debugging
    return sendRedirect(event, '/login?error=invalid_token')
  }
})