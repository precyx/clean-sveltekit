<script>
	export let type = 'submit';
	export let disabled = false;
</script>

<button
	type="submit"
	{disabled}
	class="flex items-center rounded-full bg-gradient-to-r from-[#8FC04B] to-[#2695C7] px-10 py-2 text-[16px] font-medium italic
	 text-white transition-all hover:from-[#79A838] hover:to-[#1E7BB5] disabled:cursor-not-allowed
	 disabled:from-[rgba(143,192,75,0.5)] disabled:to-[rgba(38,149,199,0.5)] dark:text-white"
>
	<slot />
</button>
