<script lang="ts">
	import IconTriangle from '$lib/icons/IconTriangle.svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { writable } from 'svelte/store';
	import { clickOutside } from '$lib/utils/clickOutside';

	type Props = {
		id: string;
		label: string;
		selectText: string;
		searchText: string;
		value: string;
		required: boolean;
		error: string;
	};
	let { id, label, selectText, searchText, value = $bindable(), required, error }: Props = $props();

	// countries
	let countries: Country[] = $state([]);
	let filteredCountries: Country[] = $state([]);
	let search: string = $state('');
	let selectedCountry: Country | null = $state(null);
	let showPopover: boolean = $state(false);
	let inputMode: string = $state('select');

	type Country = {
		name: string;
		code: string;
	};

	onMount(async () => {
		let response = await fetch('/data/country.json');
		let _countries: Country[] = await response.json();

		countries = _countries;
		filteredCountries = _countries;
	});

	const onSearch = (e) => {
		console.log('search', e.target.value);
		filteredCountries = countries.filter((country) =>
			country.name.toLowerCase().startsWith(search)
		);
	};

	const clickCountry = (country: Country) => {
		selectedCountry = country;
		showPopover = false;
		inputMode = 'select';
		value = country.code;
		console.log('click country');
	};

	const clickSearch = () => {
		//showPopover = true;
	};

	const clickOpenCountryPicker = () => {
		showPopover = true;
		inputMode = 'search';
		console.log('click picker');
	};
</script>

<div class="relative">
	<label for={id} class="mb-1 block text-sm font-medium text-blue-500 dark:text-grey-0">
		{label}
	</label>
	<!--
    ###
    ### Search Field
    ###
    -->
	<div class="relative w-full">
		{#if inputMode == 'search'}
			<input
				{id}
				type="text"
				bind:value={search}
				placeholder={searchText}
				{required}
				oninput={onSearch}
				onclick={clickSearch}
				use:clickOutside={() => {
					showPopover = false;
					inputMode = 'select';
					console.log('outside search');
				}}
				class=" relative mt-1 block w-full rounded-md border-2 px-4 py-3 focus:ring-0
          {error
					? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
					: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 focus:border-blue-500 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0'}"
			/>
		{:else if inputMode == 'select'}
			<div class="pointer-events-none absolute left-5 top-[16px] z-10 mr-4 flex items-center">
				{#if selectedCountry}
					<img
						class=" w-[24px] rounded-sm"
						src={`img/flags/4x3/${selectedCountry?.code}.svg`}
						alt={selectedCountry?.name}
					/>
				{:else}
					<div class=" h-[20px] w-[26px] rounded-sm bg-grey-300 dark:bg-grey-700"></div>
				{/if}
			</div>

			<input
				{id}
				type="text"
				value={selectedCountry?.name}
				placeholder={selectText}
				{required}
				onclick={clickOpenCountryPicker}
				use:clickOutside={() => {
					showPopover = false;
					console.log('outside select');
					//inputMode = 'select';
				}}
				class=" relative mt-1 block w-full cursor-pointer rounded-md border-2 px-4 py-3 pl-[55px] focus:ring-0
          {error
					? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
					: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 focus:border-blue-500 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0'}"
			/>

			<IconTriangle
				classes={'absolute pointer-events-none right-5 top-[18px] w-4 text-blue-500 dark:text-grey-300'}
			></IconTriangle>
		{/if}

		{#if error}
			<p class="mt-1 text-sm font-medium text-red-400">{error}</p>
		{/if}
	</div>

	<!--
    ###
    ### Popover
    ###
    -->
	{#if showPopover}
		<div class="absolute left-0 top-[80px] z-10 w-full group-hover:block">
			<div
				class="max-h-[200px] w-full overflow-y-scroll rounded-lg border-2 border-grey-300 bg-grey-0 shadow-[0px_10px_18px_-4px_rgba(0,_0,_0,_0.25)] shadow-lg dark:border-grey-700 dark:bg-grey-900"
			>
				<div class="flex flex-col flex-wrap">
					{#if filteredCountries.length}
						{#each filteredCountries as country}
							<button
								onclick={() => {
									clickCountry(country);
								}}
								class="flex cursor-pointer items-center px-4 py-2 hover:bg-grey-50 dark:hover:bg-grey-1000"
							>
								<div class="rounded-sm">
									<img
										class="mr-4 w-[24px] rounded-sm"
										src={`img/flags/4x3/${country.code}.svg`}
										alt={country.name}
									/>
								</div>
								<div class="text-left text-blue-500 dark:text-white">{country.name}</div>
							</button>
						{/each}
					{:else}
						<div class="py-2 text-center text-grey-300">No hay resultados</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
