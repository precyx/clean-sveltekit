<script lang="ts">
    import { login } from '$lib/api/api';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/user';

    import TextInput from '$lib/components/TextInput.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
  
    let email = '';
    let password = '';
    let error = '';

    let errors: { [key: string]: string } = {};
    let loading = false;
    let submitted = false;

   

    const validate = () => {
      if(!submitted) return;

      let newErrors:any = {};  // Create a new object

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
  
    const handleLogin = async () => {
      submitted = true;
      if (!validate()) return;
      try {
        loading = true;
        error = "";
        const res = await login(email, password);
        localStorage.setItem('token', res.jwt);
        user.set(res.user);  // Update user store with logged-in user data

        goto('/courses');
      } catch (err:any) {
        error = err;
      } finally {
        loading = false;
      }
    };


    // revalidate on field change
    $: {
      email;
      password;
      validate();
    } 
  </script>
  
  <form
  on:submit|preventDefault={handleLogin} novalidate
  class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full"
>
  <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Login</h2>

  <div class="mb-4">
    <TextInput
      id="email"
      label="Email Address"
      placeholder="Email"
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
      placeholder="Password"
      type="password"
      bind:value={password}
      required={true}
      error={errors.password}
    />
  </div>

  {#if error}
    <p class="text-red-500 text-sm mb-4">{error}</p>
  {/if}

  <button
    type="submit"
    disabled={loading}
    class="w-full bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-gray-800
    flex items-center justify-center"
  >
  {#if loading}
    <Spinner /> Logging in...
  {:else}
    Login
  {/if}
  </button>
</form>
  