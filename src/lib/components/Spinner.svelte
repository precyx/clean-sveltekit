<script>
	export let size = '18px'; // Default size, can be overridden
</script>

<div class="spinner" style="width: {size}; height: {size};"></div>

<style>
	.spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid #fff;
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
