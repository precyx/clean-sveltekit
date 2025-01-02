<script lang="ts">
    import { register } from '$lib/api/api';
    import { goto } from '$app/navigation';

    import TextInput from '$lib/components/TextInput.svelte';
  
    let username = '';
    let email = '';
    let password = '';
    let error = '';
  
    const handleRegister = async () => {
      try {
        await register(username, email, password);
        goto('/login');
      } catch (err) {
        error = err.message;
      }
    };
  </script>


<form on:submit|preventDefault={handleRegister}
class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">

<h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Register</h2>


    <div class="mb-4">
      <TextInput
        id="username"
        label="Username"
        type="text"
        bind:value={username}
        required={true}
      />
    </div>
  
    <div class="mb-4">
      <TextInput
        id="email"
        label="Email"
        type="email"
        bind:value={email}
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
  
    <button type="submit"
    class="w-full bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800">
      Register
    </button>

  </form>
  