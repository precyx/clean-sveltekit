<script lang="ts">
    import { login } from '$lib/api/api';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/user';

    import TextInput from '$lib/components/TextInput.svelte';
  
    let identifier = '';
    let password = '';
    let error = '';
  
    const handleLogin = async () => {
      try {
        const res = await login(identifier, password);
        localStorage.setItem('token', res.jwt);
        user.set(res.user);  // Update user store with logged-in user data

        goto('/dashboard');
      } catch (err:any) {
        console.log("err", err.message);
        error = err;
      }
    };
  </script>
  
  <form
  on:submit|preventDefault={handleLogin}
  class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full"
>
  <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Login</h2>

  <div class="mb-4">
    <TextInput
      id="email"
      label="Email Address"
      type="email"
      bind:value={identifier}
      required={true}
    />
  </div>

  <div class="mb-6">
    <TextInput
      id="password"
      label="Password"
      type="password"
      bind:value={password}
      required={true}
    />
  </div>

  {#if error}
    <p class="text-red-500 text-sm mb-4">{error}</p>
  {/if}

  <button
    type="submit"
    class="w-full bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800"
  >
    Login
  </button>
</form>
  