<script lang="ts">

  import type {Course} from "$lib/api/api";
  import CourseCard from "$lib/components/CourseCard.svelte";
  export let data:{ data: Course[]  };

  console.log("ddddd", data.data);

</script>
  
  <h1>Welcome to the Dashboard x</h1>


  <main>
    <h1>Available Courses</h1>
  
    {#each data.data as course (course.id)}
      <div class="mb-4">
        <CourseCard {course}  />
      </div>
    {:else}
      <p>No courses available at the moment.</p>
    {/each}
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