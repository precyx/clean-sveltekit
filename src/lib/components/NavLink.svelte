<script lang="ts">
    import { page } from '$app/stores';
  
    export let href: string;
  </script>
  
  <a
    href={href}
    class="hover:text-link-active font-medium text-link-light dark:hover:text-link-dark
    aria-[current='page']:text-link-active
    aria-[current='page']:dark:text-link-dark"
    aria-current={$page.url.pathname === href ? 'page' : undefined}
  >
    <slot />
  </a>