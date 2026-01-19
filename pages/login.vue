<script setup lang="ts">
    const email = ref('')
    const isLoading = ref(false)
    const sent = ref(false)
    const errorMessage = ref('')

    async function handleLogin() {
    // Reset states
    isLoading.value = true
    errorMessage.value = ''
    
    try {
        // Call backend API
        await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email: email.value }
        })

        sent.value = true
    } catch (err: any) {
        errorMessage.value = err.statusMessage || 'Something went wrong.'
    } finally {
        isLoading.value = false
    }
    }
</script>

<template>
  <div class="container">
    <div class="card">
      <div v-if="sent" style="text-align: center;">
        <h1 style="color: #00dc82;">Check your email!</h1>
        <p>Link sent to <strong>{{ email }}</strong>.</p>
        <p>Click the link in the email to sign in.</p>
        <button @click="sent = false" class="secondary-btn">Back</button>
      </div>

      <div v-else>
        <h1>Sign In</h1>
        <p class="subtitle">Enter your email to receive a magic link.</p>
        
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label>Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="you@example.com" 
              required 
              :disabled="isLoading"
            />
          </div>

          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'Send Link' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f3f4f6;
    font-family: sans-serif;
    }
    .card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    }
    h1 { margin: 0 0 10px; font-size: 24px; }
    .subtitle { color: #6b7280; margin-bottom: 20px; }
    .input-group { margin-bottom: 20px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; font-size: 14px; }
    input { 
    width: 100%; 
    padding: 10px; 
    border: 1px solid #d1d5db; 
    border-radius: 6px;
    box-sizing: border-box; /* Important so padding doesn't break width */
    }
    button {
    width: 100%;
    padding: 12px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    }
    button:disabled { background-color: #9ca3af; cursor: not-allowed; }
    .secondary-btn { background-color: transparent; color: #666; margin-top: 10px; }
    .error { color: #dc2626; font-size: 14px; margin-bottom: 15px; }
</style>