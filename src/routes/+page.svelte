<script lang="ts">

	export let data;
	const {articles, error} = data;

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />


</svelte:head>

<section>

	<h1>Articles</h1>
	{#if error}
		<div class="text-red-500">{error}</div>
	{:else if articles?.data?.length}
		{#each articles.data as article}
		<article>
			<h2>{article.title}</h2>
			<p>{article.content}</p>
			<small>
			Category: {article.category || 'Uncategorized'}
			</small>
		</article>
		{/each}
	{:else}
		<p>No articles available.</p>
	{/if}
  


</section>

<style>
</style>
