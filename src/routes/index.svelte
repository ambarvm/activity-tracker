<script>
	import { onMount } from 'svelte';

	let usage = {};

	onMount(() => {
		const getUsage = async () => {
			const r = await fetch('api/usage');
			usage = await r.json();
		};
		getUsage();
		setInterval(getUsage, 1000);
	});
</script>

<ul>
	{#each Object.entries(usage) as [name, seconds]}
		<li>{name}: {seconds}</li>
	{/each}
</ul>
