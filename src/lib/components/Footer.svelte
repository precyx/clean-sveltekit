<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import { isPersonalPage } from '$lib/utils/Utils';

	let LOGO =
		'http://localhost:1337/uploads/464160045_521706020573047_6761713450314237728_n_removebg_preview_d8777845b4.png';
	let LOGO_WHITE = 'http://localhost:1337/uploads/logo_white_snaiderclean_788d70db2a.png';

	let currentTheme: string;

	$effect(() => {
		theme.subscribe((value) => {
			currentTheme = value;
		});
	});

	// Change header background depending on the page
	let headerClasses = $state('');
	let IS_PERSONAL_PAGE = $state(false);

	$effect(() => {
		if (isPersonalPage(page.url.pathname)) {
			IS_PERSONAL_PAGE = true;
			headerClasses =
				' bg-gradient-to-r from-[#8FC04B] to-[#2695C7] dark:from-[#384520] dark:to-[#0C3B56]';
		} else {
			IS_PERSONAL_PAGE = false;
			headerClasses = '';
		}
	});
</script>

<div class={'mt-16 h-[180px] bg-blue-500 text-white dark:bg-blue-600' + headerClasses}>
	<div class="grid h-full grid-cols-3 items-center">
		<!-- Left Column -->
		<div class="text-center">
			<p>© 2025</p>
		</div>

		<!-- Center Column (Logo) -->
		<div class="flex justify-center">
			<img src={LOGO_WHITE} class="w-[90px]" alt="logo" />
		</div>

		<!-- Right Column -->
		<div class="text-center">
			<p></p>
		</div>
	</div>
</div>
