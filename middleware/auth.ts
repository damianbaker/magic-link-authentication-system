export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: user, error } = await useFetch('/api/auth/me', {
    // Pass cookies to the API
    headers: useRequestHeaders(['cookie'])
  })

  // Log the error
  if (error.value) {
    console.log('Middleware Error:', error.value.statusCode, error.value.statusMessage)
  }

  if (error.value || !user.value) {
    return navigateTo('/login')
  }

  // 3. Save to global state named 'user-profile'
  const userState = useState<Record<string, unknown> | null>('user-profile', () => null)
  userState.value = user.value
})