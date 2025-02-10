<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
</script>

<div class="">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="mb-10">
			<Login></Login>
		</div>
		<div class="mb-10">
			<Register></Register>
		</div>
	</div>
</div>
