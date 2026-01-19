import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'my_super_secret')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  // 1. Create the signed JWT (Magic Token)
  const token = await new SignJWT({ email: body.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m') // Link expires in 10 mins
    .sign(SECRET)

  // 2. Construct the Link
  const verifyUrl = `http://localhost:3000/api/auth/verify?token=${token}`

  // 3. Send Logs with link
  console.log('----------------------------------------------')
  console.log('✨ MAGIC LINK GENERATED ✨')
  console.log('Click here to login:', verifyUrl)
  console.log('----------------------------------------------')

  // send email here
  return { success: true }
})