<script lang="ts">
    import { register } from '$lib/api/api';
    import { goto } from '$app/navigation';

    import TextInput from '$lib/components/TextInput.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
  
    let username = '';
    let email = '';
    let password = '';
    let error = '';

    let errors: { [key: string]: string } = {};
    let loading = false;
    let submitted = false;

    const validate = () => {
      if(!submitted) return;

      let newErrors:any = {};  // Create a new object

      if (!username) {
        newErrors.username = 'Username is required.';
      } else if (username.length < 2) {
        newErrors.username = 'Username must be at least 2 characters.';
      }

      if (!email) {
        newErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Invalid email format.';
      }

      if (!password) {
        newErrors.password = 'Password is required.';
      } else if (password.length < 2) {
        newErrors.password = 'Password must be at least 2 characters.';
      }

      errors = { ...newErrors };

      return Object.keys(errors).length === 0;
    };
  
    const handleRegister = async () => {
      submitted = true;
      if (!validate()) return;
      try {
        loading = true;
        error = "";
        await register(username, email, password);
        goto('/login');
      } catch (err:any) {
        error = err.message;
      } finally {
        loading = false;
      }
    };

    // revalidate on field change
    $: {
      username;
      email;
      password;
      validate();
    } 
  </script>


<form on:submit|preventDefault={handleRegister} novalidate
class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">

<h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Register</h2>


    <div class="mb-4">
      <TextInput
        id="username"
        label="Username"
        type="text"
        bind:value={username}
        required={true}
        error={errors.username}
      />
    </div>
  
    <div class="mb-4">
      <TextInput
        id="email"
        label="Email"
        type="email"
        bind:value={email}
        required={true}
        error={errors.email}
      />
    </div>
  
    <div class="mb-6">
      <TextInput
        id="password"
        label="Password"
        type="password"
        bind:value={password}
        required={true}
        error={errors.password}
      />
    </div>

    {#if loading}
      <p class="text-red-500 text-sm mb-4">{error}</p>
    {/if}

    {#if error}
      <p class="text-red-500 text-sm mb-4">{error}</p>
    {/if}
  
    <button type="submit" disabled={loading}
    class="w-full bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800
    flex items-center justify-center">
    {#if loading}
      <Spinner /> Registering...
    {:else}
      Register
    {/if}
    </button>

  </form>