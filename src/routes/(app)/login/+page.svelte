<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
</script>

<div class="container mx-auto px-4">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Login></Login>
		<Register></Register>
	</div>
</div>
