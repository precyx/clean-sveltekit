<script lang="ts">
    import { register } from '$lib/api/api';
    import { goto } from '$app/navigation';
  
    let username = '';
    let email = '';
    let password = '';
    let error = '';
  
    const handleRegister = async () => {
      try {
        await register(username, email, password);
        goto('/login');
      } catch (err) {
        error = 'Registration failed';
      }
    };
  </script>
  
  <form on:submit|preventDefault={handleRegister}>
    <label>Username:</label>
    <input type="text" bind:value={username} required />
  
    <label>Email:</label>
    <input type="email" bind:value={email} required />
  
    <label>Password:</label>
    <input type="password" bind:value={password} required />
  
    <button type="submit">Register</button>
    {#if error}
      <p>{error}</p>
    {/if}
  </form>
  