<script lang="ts">
  import CourseCard from "$lib/components/CourseCard.svelte";

  export let data;
  const { courses, error } = data;

</script>
  
  <h1>Welcome to the Dashboard x</h1>


  <main>
    <h1>Available Courses</h1>
  
    {#if error}
      <div class="text-red-500">{error}</div>
    {:else if courses?.data?.length}
      {#each courses.data as course (course.id)}
        <div class="mb-4">
          <CourseCard {course} />
        </div>
      {/each}
    {:else}
      <p>No courses available at the moment.</p>
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