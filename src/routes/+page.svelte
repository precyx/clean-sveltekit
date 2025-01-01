<script lang="ts">

	export let data;



	/*
	
	import { onMount } from 'svelte';
	import { fetchAPI } from '$lib/api/api';

	onMount(async () => {
		try {
		const response = await fetchAPI('articles');
		articles = response.data || [];
		console.log('Fetched articles:', articles);  // Debugging
		} catch (err) {
		error = 'Failed to fetch articles';
		console.error('Error fetching articles:', err);
		}

	});*/

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />


</svelte:head>

<section>

	<h1>Articles</h1>


  
	{#if data.articles && data.articles.length > 0}
	  {#each data.articles as article}
		<article>
		  <h2>{article.title}</h2>
		  <p>{article.content}</p>
		  <small>
			Category: {article.category?.data?.name || 'Uncategorized'}
		  </small>
		</article>
	  {/each}
	{:else}
	  <p>No articles found.</p>
	{/if}

</section>

<style>
</style>
