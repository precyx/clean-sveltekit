<script lang="ts">
	import { user } from '$lib/stores/user';

	let currentUser = $state($user);

	$effect(() => {
		user.subscribe((value) => {
			currentUser = value;
		});
	});
</script>

<h1 class="mb-2 mt-4 text-lg font-extrabold text-blue-500 dark:text-grey-0 lg:text-xl">Perfil</h1>

<div class="text-base">
	<div class="flex">
		<div class="w-[300px] text-grey-300">Nombre:</div>
		<div class="text-blue-500 dark:text-white">
			{currentUser?.username}
		</div>
	</div>

	<div class="flex">
		<div class="w-[300px] text-grey-300">Correo electrónico:</div>
		<div class="text-blue-500 dark:text-white">
			{currentUser?.email}
		</div>
	</div>

	<div class="flex">
		<div class="w-[300px] text-grey-300">Pais:</div>
		<div class="text-blue-500 dark:text-white">
			{currentUser?.country || '-'}
		</div>
	</div>

	<div class="flex">
		<div class="w-[300px] text-grey-300">Telefono:</div>
		<div class="text-blue-500 dark:text-white">
			{currentUser?.phone || '-'}
		</div>
	</div>

	<div class="flex">
		<div class="w-[300px] text-grey-300">Verificado:</div>
		<div class="text-blue-500 dark:text-white">
			{currentUser?.confirmed ? 'Yes' : 'No'}
		</div>
	</div>
</div>
