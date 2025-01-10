<script lang="ts">
    import CourseCard from "$lib/components/CourseCard.svelte";
    import { goto } from '$app/navigation';
    import type { Product } from "$lib/api/api.js";
  
    export let data;
    const { products, error } = data;

    let IMAGE_BASE = "http://localhost:1337";
  
  
    const handleProductClick = (course:Product) => {
      goto(`/products/${course.documentId}`, {
          state: {
            documentId: course.documentId
          }
        }
      ); 
    };
  
  </script>

  
  
    <main>
      <div class="max-w-screen-xl mx-auto p-6">
          <h1 class="text-title-1 font-extrabold mb-2 text-title-light dark:text-title-dark">Nuestros Productos</h1>
          <p class="text-title-2 italic font-bold mb-8 text-subtitle-light dark:text-subtitle-dark">Limpieza de Mano, Cocina, Baño</p>

          {#if error}
          <div class="text-red-500">{error}</div>
        {:else if products?.data?.length}




        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {#each products.data as product}
            <div class="rounded-lg">
              <!-- Full Image -->
              <div class="w-full overflow-hidden rounded-lg shadow-md">
                <img
                  src={IMAGE_BASE + product.image[0]?.url}
                  alt={product.title}
                  class="w-full h-auto object-contain"
                />
              </div>
        
              <!-- Product Details -->
              <h2 class="text-product-title-1 font-semibold mt-4 mb-1 text-productTitle-light dark:text-productTitle-dark">{product.title}</h2>
              <p class="text-product-title-2 font-semibold mb-1 text-productTitle2-light dark:text-productTitle2-dark">{product.category}</p>
              <p class="text-product-title-3 font-semibold text-productTitle3-light dark:text-productTitle3-dark">{product.description}</p>
            </div>
          {/each}
        </div>

        {:else}
          <p>No products available at the moment.</p>
        {/if}
      </div>
  
  
    </main>
    
    <style>
      main {
        padding: 40px;
      }
    </style>