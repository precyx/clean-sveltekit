<script lang="ts">

    import type {Course} from "$lib/api/api";

    export let course: Course;
  
    function enroll(courseId: number) {
      window.location.href = `/checkout/${courseId}`;
    }
  </script>


<div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      {course.title}
    </h2>
    <p class="text-gray-600 dark:text-gray-400 mt-2">
      {course.description}
    </p>

    {#if course.fullContent}
      <div class="content-section mt-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Course Content:
        </h3>
        <div class="prose dark:prose-invert mt-2">
          {@html course.fullContent}
        </div>
      </div>
    {:else}
      <div class="public-section mt-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Course Preview:
        </h3>
        <div class="prose dark:prose-invert mt-2">
          {@html course.publicContent}
        </div>
        <p class="text-lg font-medium text-gray-900 dark:text-gray-100 mt-4">
          <strong>Price:</strong> ${course.price}
        </p>
        <button
          on:click={() => enroll(course.id)}
          class="mt-4 px-6 py-3 bg-primary-light hover:bg-primary-dark text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
        >
          Enroll Now
        </button>
      </div>
    {/if}
  </div>
</div>

<style></style>