<script>
	export let size = '18px';
	export let color = '#fff';
	export let classes = '';
</script>

<div
	class={`spinner border-2 ${classes} border-t-transparent dark:border-t-transparent`}
	style="width: {size}; height: {size};"
></div>

<style>
	.spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 0.6s linear infinite;
		margin-right: 8px;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
