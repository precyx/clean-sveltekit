<script>
	export let type = 'submit';
	export let disabled = false;
	export let onclick = () => {};
	export let classes = '';
	export let id = '';
	export let secondary = false;

	let styleClasses =
		'bg-gradient-to-r from-[#8FC04B] to-[#2695C7] hover:from-[#79A838] hover:to-[#1E7BB5] disabled:cursor-not-allowed disabled:from-[rgba(143,192,75,0.5)] disabled:to-[rgba(38,149,199,0.5)] text-white dark:text-white';
	if (secondary) {
		styleClasses = `border border-black dark:border-white dark:border-opacity-10 border-opacity-10 text-blue-500`;
	}
</script>

<button
	type="submit"
	{disabled}
	{onclick}
	{id}
	class={classes +
		` ${styleClasses} flex items-center rounded-full px-10 py-2 text-[16px] font-medium italic transition-all `}
>
	<slot></slot>
</button>
