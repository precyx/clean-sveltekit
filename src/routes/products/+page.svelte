<script lang="ts">
    import CourseCard from "$lib/components/CourseCard.svelte";
    import { goto } from '$app/navigation';
    import type { Product } from "$lib/api/api.js";
  
    export let data;
    const { products, error } = data;
  
  
    const handleProductClick = (course:Product) => {
      goto(`/products/${course.documentId}`, {
          state: {
            documentId: course.documentId
          }
        }
      ); 
    };
  
  </script>
    
    <h1>Welcome to the Dashboard</h1>
  
  
    <main>
      <h1>Available Products</h1>
    
      {#if error}
        <div class="text-red-500">{error}</div>
      {:else if products?.data?.length}
        {#each products.data as product (product)}
          <div class="mb-4" onclick={() => handleProductClick(product)}>

          </div>
        {/each}
      {:else}
        <p>No products available at the moment.</p>
      {/if}
  
  
    </main>
    
    <style>
      main {
        padding: 40px;
      }
      h1 {
        margin-bottom: 20px;
        text-align: center;
      }
    </style>