<script lang="ts">
	export let direction = 'bottom';
	export let classes = 'text-current';

	// Function to determine rotation based on direction
	function getRotation(direction: string) {
		switch (direction) {
			case 'top':
				return -90;
			case 'left':
				return 180;
			case 'bottom':
				return 90;
			case 'right':
			default:
				return 0;
		}
	}
</script>

<svg class={classes} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M8.79241 10.9706C8.3921 11.4906 7.6079 11.4906 7.20759 10.9706L2.31117 4.60999C1.80497 3.95242 2.27374 3 3.10358 3L12.8964 3C13.7263 3 14.195 3.95243 13.6888 4.61L8.79241 10.9706Z"
		fill="currentColor"
	/>
</svg>
