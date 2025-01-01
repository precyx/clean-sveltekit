<script lang="ts">
    import { page } from '$app/stores';
  
    export let href: string;
  </script>
  
  <a
    href={href}
    class="hover:text-primary-light dark:hover:text-primary-dark
    aria-[current='page']:text-primary-light
    aria-[current='page']:dark:text-primary-dark"
    aria-current={$page.url.pathname === href ? 'page' : undefined}
  >
    <slot />
  </a>