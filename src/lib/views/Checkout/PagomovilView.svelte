<script lang="ts">
	import { onMount } from 'svelte';
	import { getPagomovilBankInfo, captureOrderPagomovil, getCart } from '$lib/api/api.js';
	import type { PagoMovilBankInfo } from '$lib/api/types.ts';
	import { goto } from '$app/navigation';

	import IconCopy from '$lib/icons/IconCopy.svelte';
	import PhonePicker from '$lib/components/PhonePicker.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { user } from '$lib/stores/user';
	import { sleep } from '$lib/utils/Utils';

	let pagomovilData: PagoMovilBankInfo | null = $state(null);
	let phone = $state('+584241234567');
	let phoneIsValid = $state(false);
	let referencia = $state('');

	let data_loading = $state(true);
	let data_error = $state('');

	let payment_loading = $state(false);
	let payment_error = $state('');
	let errors: { [key: string]: string } = $state({});

	/**
	 * User
	 */

	$effect(() => {
		user.subscribe((value) => {
			if (value && value.user) {
				phone = value.user.phone;
			}
		});
	});

	/**
	 * Payment
	 */

	let copied = $state(false);
	const copyText = async (textToCopy: string) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			copied = true;
			setTimeout(() => (copied = false), 600);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const clickPagoMovilPay = async () => {
		// validate input fields
		if (!validate()) return;
		payment_loading = true;

		// payment details
		const paymentDetails = {
			type: 'pagomovil',
			senderPhone: phone,
			bankReference: referencia
		} as const;

		let newOrder;
		try {
			newOrder = await captureOrderPagomovil(paymentDetails);
			console.log('Response Pagomovil', newOrder);
		} catch (err: any) {
			payment_loading = false;
			console.error('Error Pagomovil', err);
			payment_error = err.message;
			return;
		}

		// load cart
		await getCart();
		payment_loading = false;

		// redirect to success
		goto(`/cart/success?orderId=${newOrder?.documentId}`);
	};

	const validate = () => {
		let newErrors: any = {}; // Create a new object

		if (!referencia) {
			newErrors.referencia = 'La referencia es obligatorio.';
		}
		if (!phoneIsValid) {
			newErrors.phone = 'El telefono es obligatorio.';
		}

		errors = { ...newErrors };

		//console.log('err', errors);
		console.log('fields', errors, referencia, phone);
		return Object.keys(errors).length === 0;
	};

	/**
	 * On Mount
	 */

	onMount(async () => {
		try {
			pagomovilData = await getPagomovilBankInfo();
			console.log('pago movil', pagomovilData);
		} catch (err: any) {
			data_error = err.message;
		} finally {
			data_loading = false;
		}
	});
</script>

{#if data_error}
	<div>
		<div class="text-blue-500 dark:text-white">Pagomovil View</div>
		<div class="text-red-500">{data_error}</div>
	</div>
{:else if data_loading}
	<div></div>
{:else}
	<div class="xxx">
		<div class:opacity-50={payment_loading} class:pointer-events-none={payment_loading}>
			<!--prettier-ignore-->
			{#each [
            { value: pagomovilData?.bank, label: 'Banco' }, 
            { value: pagomovilData?.phoneNumber, label: 'Numero de telefono' }, 
            { value: pagomovilData?.identityDocument, label: 'Documento de Identidad' }, 
            { value: 'Pago de Cursos', label: 'Concepto' },
        ] as item} 
            <div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
                <div class="w-[300px] text-grey-300">{item.label}:</div>
                <div class="flex items-center text-blue-500 dark:text-white">
                    {item.value}
                    <button
                        onclick={() => copyText(item.value + "")}
                        class="cursor-pointer"
                        class:opacity-50={copied}
                    >
                        <IconCopy classes="w-[20px] ml-3 text-blue-400"></IconCopy>
                    </button>
                </div>
            </div>
        {/each}
			<!--
			Monto a pagar
			-->
			<div class="mb-4 flex flex-col sm:mb-1 sm:flex-row">
				<div class="w-[300px] text-grey-300">Monto a pagar:</div>
				<div
					class="flex-start items-left flex flex-col font-semibold text-green-300 dark:text-green-100"
				>
					<div class="flex items-center">
						{pagomovilData?.amount} VES
						<button
							onclick={() => copyText(pagomovilData?.amount + '')}
							class="cursor-pointer"
							class:opacity-50={copied}
						>
							<IconCopy classes="w-[20px] ml-3 text-blue-400"></IconCopy>
						</button>
					</div>
					<div class="mt-2 inline-flex flex-row">
						<div
							class="rounded-full bg-orange-200 bg-opacity-30 px-4 font-normal text-orange-400 dark:text-orange-300"
						>
							Transferir Monto exacto!
						</div>
					</div>
				</div>
			</div>

			<div class=" mt-10 max-w-[450px]">
				<div class="mb-4">
					<PhonePicker
						id="pagomovil-phone"
						bind:value={phone}
						bind:isValid={phoneIsValid}
						error={errors.phone}
						label="Numero de telefono del Pagador *"
					></PhonePicker>
				</div>

				<div class="mb-4">
					<TextInput
						bind:value={referencia}
						id="pagomovil-bank-reference"
						label="Referencia bancaria *"
						placeholder="Emitido por su banco"
						error={errors.referencia}
						required={true}
						oninput={validate}
					></TextInput>
				</div>
			</div>
		</div>

		<div class="mb-12 mt-12 flex items-center justify-center">
			<div class="ml-4 flex flex-col items-center justify-center">
				<Button
					disabled={payment_loading}
					onclick={() => {
						clickPagoMovilPay();
					}}
				>
					{#if payment_loading}
						<div class=" mr-[5px] flex">
							<Spinner classes="border-white"></Spinner>
						</div>
					{/if}
					<div>Pagar con Pago Movil</div>
				</Button>

				{#if payment_error}
					<div class="mt-4 text-red-500">{payment_error}</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
