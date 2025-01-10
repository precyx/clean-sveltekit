<script>
	export let type = 'submit';
	export let loading = false;
	export let disabled = false;
</script>

<button
	{type}
	disabled={loading}
	class="rounded-full bg-gradient-to-r from-[#8FC04B] to-[#2695C7] px-10 py-2 text-[16px] font-medium italic text-white transition-all hover:from-[#79A838] hover:to-[#1E7BB5] disabled:cursor-not-allowed disabled:opacity-50 dark:from-[#6B8F37] dark:to-[#1B6793] dark:hover:from-[#56752C] dark:hover:to-[#16557A]"
>
	<slot />
</button>
