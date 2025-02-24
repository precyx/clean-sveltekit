<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import IconArrow from '$lib/icons/IconArrow.svelte';
	import { updateCart, getCart, getMyCoursesShort } from '$lib/api/api';
	import type { Product, Cart } from '$lib/api/types.ts';

	import { cart } from '$lib/stores/cart.js';
	import { user } from '$lib/stores/user.js';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import IconCheck from '$lib/icons/IconCheck.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { sleep } from '$lib/utils/Utils';

	export let data;
	let { course, error, courseId } = data;

	let isInCart: boolean = false;
	let alreadyBought: boolean = false;
	let loadingAddToCart: boolean = false;

	onMount(async () => {
		let _myCourses = await getMyCoursesShort();
		let _myCourseIds = _myCourses.data.map((course) => course.documentId);
		if (_myCourseIds.includes(courseId)) {
			alreadyBought = true;
		}
	});

	cart.subscribe((cart: Cart | null) => {
		if (!cart) return;

		let courseId = course?.data?.documentId || '';
		let cartIds = cart.courses.map((item) => item.documentId);

		if (cartIds.includes(courseId)) {
			isInCart = true;
		}
	});

	const goBack = () => {
		goto('/courses'); // Navigate back to course list
	};

	const handleProductClick = (product: Product) => {
		console.log('product', product);
		// Navigate to the product detail page
		goto(`/products/${product.documentId}`);
	};

	const _addToCart = async () => {
		if (course?.data.documentId) {
			loadingAddToCart = true;
			await sleep(200);
			await updateCart(course?.data.documentId);
			loadingAddToCart = false;
		}
	};
</script>

<div class="mb-2 text-productsm lg:mb-4 lg:text-base">
	<button onclick={goBack} class="flex items-center text-blue-500 hover:underline dark:text-grey-0">
		<!-- Back Arrow Icon -->
		<IconArrow direction="left" classes="text-blue-200 dark:text-grey-500 mr-2" />
		<div class="text-blue-500 dark:text-blue-300">Volver a los cursos</div>
	</button>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if course?.data}
	<div class="">
		<!-- Product Detail Layout -->
		<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->
			<div class="mb-8">
				<ImageDisplay
					provider={course.data.videoPreview?.provider}
					src={course.data.videoPreview?.url}
					alt={course.data.title}
					classes="aspect-square h-[260px] w-full rounded-lg object-cover"
				/>

				<div
					class="text-mid mb-2 mt-4 font-bold italic text-blue-500 dark:text-grey-0 lg:mb-4 lg:mt-6"
				>
					Productos en ese curso
				</div>

				<div class="flex">
					{#each course.data?.products as product}
						<button
							class="group mr-4 h-[100px] w-[100px] rounded-lg text-left"
							onclick={() => handleProductClick(product)}
						>
							<!-- Full Image -->
							{#if product?.images && product.images.length}
								<div class="group-hover:opacity-80">
									<ImageDisplay
										provider={product.images[0]?.provider}
										src={product.images[0]?.url}
										alt={product.title}
										classes={'h-[100px] w-[100px] shadow-lg rounded inset-0 w-full object-cover'}
									></ImageDisplay>
								</div>
							{/if}

							<!-- Product Details -->
							<h2
								class="mb-1 mt-2 text-productsm font-medium text-blue-500 group-hover:text-blue-400 dark:text-grey-0 dark:group-hover:text-blue-300"
							>
								{product.title}
							</h2>
						</button>
					{/each}
				</div>
			</div>

			<!-- Product Info -->
			<div class="">
				<!-- Product Title -->
				<p class="text-productxl font-bold text-blue-500 dark:text-grey-0">
					{course.data.title}
				</p>
				<!-- Product Category -->
				<p class="mt-2 text-productlg font-semibold text-blue-200 dark:text-blue-300">
					{course?.data?.category}
				</p>

				<p class="font-regular text-xl text-green-300 dark:text-green-100">
					$ {course.data.price}
				</p>

				<div class="mt-6">
					{#if !$user.user}
						<Button
							onclick={() => {
								goto('/login');
							}}>Inicia sesión para comprar</Button
						>
					{:else if alreadyBought}
						<div class="flex">
							<div
								class="flex rounded-full border border-green-300 px-10 py-2 text-base font-medium italic text-green-300 dark:border-green-100 dark:text-green-100"
							>
								<IconCheck classes={'w-[20px] text-green-300 dark:text-green-100 mr-2'}></IconCheck>
								<p>Ya comprado</p>
							</div>
						</div>
					{:else if isInCart}
						<Button disabled={true}>
							<IconCheck classes={'w-5 h-5 mr-2'}></IconCheck>
							Ya en el carrito
						</Button>
					{:else}
						<Button onclick={_addToCart} disabled={loadingAddToCart}>
							{#if loadingAddToCart}
								<Spinner classes="border-white" />
							{:else}
								<IconPlus classes={'w-5 h-5'}></IconPlus>
							{/if}
							<p class="ml-2">Agregar al carrito</p>
						</Button>
					{/if}
				</div>

				<!-- Time to Fabricate -->
				<p class="mt-6 text-productlg font-semibold text-grey-300 dark:text-grey-200">
					{course.data.videos.length} videos
				</p>

				<!-- Product Description -->
				<p class="mt-6 text-base font-medium text-grey-500 dark:text-grey-100">
					<RichText content={course.data.description}></RichText>
				</p>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
