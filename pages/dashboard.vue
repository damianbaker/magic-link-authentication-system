<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })

  const user = useState('user-profile')

  function logout() {
    // Clear the state
    user.value = null
    
    navigateTo('/login')
  }
</script>

<template>
  <header style="padding: 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;">
    <strong>My Authentication App</strong>
    
    <div v-if="user">
      <span>Welcome, {{ user.email }}!</span>
      <button @click="logout" style="margin-left: 10px;">Logout</button>
    </div>
    
    <div v-else>
      <NuxtLink to="/login">Sign In</NuxtLink>
    </div>
  </header>

  <NuxtPage />
</template>