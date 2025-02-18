<script lang="ts">
	import { user } from '$lib/stores/user';

	let currentUser = $state($user);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});
</script>

<h1 class="dark:text-grey-0 mb-2 mt-4 text-lg font-extrabold text-blue-500 lg:text-xl">Profile</h1>

<div class="dark:text-grey-0 text-base text-blue-500">
	<div>
		{currentUser?.username}
	</div>
	<div>
		{currentUser?.email}
	</div>
	<div>
		Confirmed: {currentUser?.confirmed ? 'Yes' : 'No'}
	</div>
</div>
