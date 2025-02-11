export function clickOutside(node: HTMLElement, callback: () => void) {
	let timer;

	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			callback(); // Call function if clicked outside
		}
	}

	// Delay attaching the event to avoid instant closure
	timer = setTimeout(() => {
		document.addEventListener('click', handleClick);
	}, 0);

	return {
		destroy() {
			clearTimeout(timer);
			document.removeEventListener('click', handleClick);
		}
	};
}
