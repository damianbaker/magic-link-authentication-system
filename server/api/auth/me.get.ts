import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'my_super_secret')

export default defineEventHandler(async (event) => {
  // 1. Get the cookie (Server can see it!)
  const token = getCookie(event, 'auth_session')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not logged in' })
  }

  try {
    // 2. Verify the JWT
    const result = await jwtVerify(token, SECRET)

    const payload = result.payload

    // 3. Return the user info (email, id, etc.)
    return {
      email: payload.email,
      id: payload.sub
    }
  } catch (err: any) {
    console.log('---------------------------------')
    console.log('❌ JWT VERIFICATION FAILED:')
    console.log('Code:', err.code)
    console.log('Message:', err.message)
    console.log('---------------------------------')

    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})