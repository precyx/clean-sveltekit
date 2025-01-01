<script lang="ts">
    import { login } from '$lib/api/api';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/user';
  
    let identifier = '';
    let password = '';
    let error = '';
  
    const handleLogin = async () => {
      try {
        const res = await login(identifier, password);
        localStorage.setItem('token', res.jwt);
        user.set(res.user);  // Update user store with logged-in user data

        goto('/dashboard');
      } catch (err) {
        error = 'Invalid login credentials';
      }
    };
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <label>Email:</label>
    <input type="email" bind:value={identifier} required />
  
    <label>Password:</label>
    <input type="password" bind:value={password} required />
  
    <button type="submit">Login</button>
    {#if error}
      <p>{error}</p>
    {/if}
  </form>
  