<script lang="ts">
	import IconTriangle from '$lib/icons/IconTriangle.svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { writable } from 'svelte/store';
	import { clickOutside } from '$lib/utils/clickOutside';
	import IconGlobe from '$lib/icons/IconGlobe.svelte';
	import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
	import type { CountryCode } from 'libphonenumber-js';
	import { sleep } from '$lib/utils/Utils';

	type Props = {
		id?: string;
		label?: string;
		selectText?: string;
		searchText?: string;
		value?: string; // full phone number e.g. "+49123456789"
		required?: boolean;
		error?: string;
		isValid?: boolean;
	};
	let {
		id,
		label = 'Telefono',
		selectText = '00',
		searchText = 'Buscar telefono',
		value = $bindable<string>(), // full phone number e.g. "+49123456789"
		required = false,
		error = '',
		isValid = $bindable<boolean>(false)
	}: Props = $props();

	type Country = {
		name: string;
		code: string;
		phone: string;
	};
	type Phone = {
		country: Country;
		phone: string;
	};

	// ui values
	let selectedCountry: Country | null = $state(null);
	let phoneText: string = $state('');

	// data
	let sortedPhonePrefixes: string[] = $state([]);
	let countries: Country[] = $state([]);
	let filteredCountries: Country[] = $state([]);

	// search
	let search: string = $state('');
	let showPopover: boolean = $state(false);
	let inputMode: 'select' | 'search' = $state('select');

	onMount(async () => {
		let response = await fetch('/data/phone.json');
		let _countries: Country[] = await response.json();

		// get phone prefixes and sort by length
		sortedPhonePrefixes = _countries.map((country) => country.phone);
		sortedPhonePrefixes.sort((a, b) => b.length - a.length);

		countries = _countries;
		filteredCountries = _countries;

		// set initial country and phone number
		if (value) {
			let initialPhone = getInitialPhoneNumber(value.replace('+', ''));
			selectedCountry = initialPhone?.country || null;
			phoneText = initialPhone?.phone || '';

			if (phoneText) {
				validate();
			}
		}
	});

	const getInitialPhoneNumber = (phoneNumber: string): Phone | null => {
		for (const prefix of sortedPhonePrefixes) {
			// find prefix
			if (phoneNumber.startsWith(prefix)) {
				let foundCountry: Country | null = countries.find((country) => country.phone === prefix) || null; // prettier-ignore
				if (foundCountry) {
					return {
						country: foundCountry,
						phone: phoneNumber.replace(foundCountry?.phone, '')
					};
				}
			}
		}
		return null;
	};

	// Normalize and remove accents
	const removeDiacritics = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	const onSearch = (e: any) => {
		const searchQuery = removeDiacritics(e.target.value.trim().toLowerCase());

		filteredCountries = countries.filter((country) => {
			const nameNormalized = removeDiacritics(country.name.toLowerCase());
			return nameNormalized.includes(searchQuery);
		});
	};

	const clickCountry = (country: Country) => {
		selectedCountry = country;
		showPopover = false;
		inputMode = 'select';
		value = '+' + country.phone + phoneText;
		if (phoneText) validate();
	};

	const clickOpenCountryPicker = () => {
		showPopover = true;
		inputMode = 'search';
	};

	const clickPhoneInput = () => {
		if (!selectedCountry) {
			showPopover = true;
			inputMode = 'search';
		}
	};

	const onInputPhoneText = () => {
		if (selectedCountry) {
			let _fullPhoneBefore = '+' + selectedCountry?.phone + phoneText;
			let _countryCode = selectedCountry?.code.toUpperCase() as CountryCode;
			console.log('full phone before', _fullPhoneBefore);

			// set formatted phone and value
			let newPhone = new AsYouType(_countryCode);
			let _fullPhoneAfter = newPhone.input(_fullPhoneBefore);
			let _formattedPhoneAfter = _fullPhoneAfter.replace('+' + selectedCountry?.phone, ''); // prettier-ignore
			phoneText = _formattedPhoneAfter;
			value = _fullPhoneAfter;

			// validate
			validate();
			//console.log('value', value);
		}
	};

	const validate = () => {
		if (selectedCountry) {
			let _fullPhone = '+' + selectedCountry?.phone + phoneText;
			let newPhone = parsePhoneNumberFromString(_fullPhone);
			let _isValid = newPhone?.isValid();
			if (!_isValid) {
				error = 'Número de teléfono inválido';
				isValid = false;
			} else {
				error = '';
				isValid = true;
			}
		}
	};
</script>

<div class="relative">
	<label for={id} class="mb-1 block text-sm font-medium text-blue-500 dark:text-grey-0">
		{label}
	</label>

	<div class="relative w-full">
		<!--
        ###
        ### Search Field
        ###
        -->
		{#if inputMode == 'search'}
			<input
				{id}
				type="text"
				bind:value={search}
				placeholder={searchText}
				{required}
				oninput={onSearch}
				use:clickOutside={() => {
					showPopover = false;
					inputMode = 'select';
				}}
				class=" relative mt-1 block w-full rounded-md border-2 border-grey-300 bg-grey-50 px-4
                py-3 text-grey-500 placeholder-grey-300 focus:border-blue-500 focus:ring-0 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0"
			/>
		{:else if inputMode == 'select'}
			<div class="pointer-events-none absolute left-5 top-[16px] z-10 mr-4 flex items-center">
				{#if selectedCountry}
					<img
						class=" w-[24px] rounded-sm"
						src={`/img/flags/4x3/${selectedCountry?.code}.svg`}
						alt={selectedCountry?.name}
					/>
				{:else}
					<IconGlobe classes="w-5 dark:text-grey-300 text-blue-500"></IconGlobe>
				{/if}
			</div>

			<div class="mt-1 flex">
				<div class="relative">
					<!--
                    ###
                    ### Country Select
                    ###
                    -->
					<button
						onclick={clickOpenCountryPicker}
						use:clickOutside={() => {
							showPopover = false;
						}}
						class=" relative block h-full w-auto cursor-pointer whitespace-pre break-keep rounded-l-md border-0 border-b-2 border-l-2 border-t-2 px-4 py-3 pl-[50px] pr-[25px] focus:ring-0 sm:pr-[35px]
                    {error
							? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
							: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 focus:border-blue-500 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0'}"
					>
						<div class="text-[14px] sm:text-base">
							{'+' + (selectedCountry?.phone || selectText)}
						</div>
					</button>

					<IconTriangle
						classes={'absolute pointer-events-none sm:right-[12px] right-[8px] sm:top-[20px] top-[23px] text-blue-500 dark:text-grey-300 sm:w-[14px] w-[10px]'}
					></IconTriangle>
				</div>

				<div class="w-full">
					<!--
                    ###
                    ### Phone Number
                    ###
                    -->
					<input
						bind:value={phoneText}
						placeholder="00 000 000"
						type="text"
						class="relative block w-full w-full cursor-text rounded-r-md border-2 px-4 py-3 focus:ring-0
                        {error
							? 'border-red-400 bg-red-50 text-red-400  placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:bg-opacity-20 dark:placeholder-white dark:placeholder-opacity-40'
							: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 focus:border-blue-500 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0'}"
						onclick={clickPhoneInput}
						oninput={() => {
							onInputPhoneText();
						}}
					/>
				</div>
			</div>
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
										src={`/img/flags/4x3/${country.code}.svg`}
										alt={country.name}
									/>
								</div>
								<div class="text-left text-blue-500 dark:text-white">{country.name}</div>
								<div class="ml-auto text-left text-grey-300 dark:text-blue-200">
									{'+' + country.phone}
								</div>
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
