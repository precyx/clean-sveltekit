<script>
	export let direction = 'right'; // Default direction is 'right'
	export let classes = 'text-current';

	// Function to determine rotation based on direction
	function getRotation(direction) {
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

<svg
	class={`h-5 w-5 ${classes}`}
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	style="transform: rotate({getRotation(direction)}deg);"
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
</svg>
