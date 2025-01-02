<script lang="ts">
    import { goto } from '$app/navigation';

    export let data;
    let {course, error, slug} = data;

    const goBack = () => {
      goto('/courses');  // Navigate back to course list
    };
  </script>
 

 <div class="mb-6">
  <button 
    on:click={goBack} 
    class="flex items-center text-blue-500 hover:underline"
  >
    <!-- Back Arrow Icon -->
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    Back to Courses
  </button>
</div>


  {#if error}
    <div class="text-red-500">{error}</div>
  {:else if course?.data}
    <div>
      <h1 class="text-3xl font-bold">{course?.data.title}</h1>
      <p class="text-3xl font-bold">{course?.data.Price}.-</p>
      <p class="mt-4">...</p>
    </div>
  {:else}
    <p>no content...</p>
  {/if}

