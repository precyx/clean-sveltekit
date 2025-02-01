<script lang="ts">
	import type { RichText } from '$lib/api/types.ts';
	export let content: RichText[];
</script>

<div>
	{#each content as block (block)}
		{#if block.type === 'paragraph'}
			<div>
				{#if block.children}
					{#each block.children as child (child)}
						{#if child.type === 'text'}
							<!-- Split by double newlines for sections -->
							{#each child.text.split('\n\n') as section (section)}
								<!-- Check if the section contains a list -->
								{#if section.trim().includes('•')}
									<!-- Render as a list -->
									<ul class="list-inside list-disc space-y-1 pl-5">
										{#each section.split('\n') as line (line)}
											{#if line.trim().startsWith('•')}
												<li>{line.replace('•', '').trim()}</li>
											{/if}
										{/each}
									</ul>
								{:else}
									<!-- Render as a paragraph -->
									<p class="mb-4 mt-4">{section.trim()}</p>
								{/if}
							{/each}
						{/if}
					{/each}
				{/if}
			</div>
		{/if}
	{/each}
</div>
