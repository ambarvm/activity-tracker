<script>
	import { onMount } from 'svelte';
	import humanizeDuration from 'humanize-duration';
	import { toYYYYMMDD } from '../util/dates';

	let usage = {};
	let date = toYYYYMMDD(new Date());

	onMount(() => {
		const getUsage = async () => {
			const r = await fetch(`api/usage?date=${date}`);
			try {
				usage = await r.json();
			} catch {
				usage = null;
			}
		};
		getUsage();
		setInterval(getUsage, 1000);
	});
</script>

<input type="date" bind:value={date} />

{#if usage}
	<ul>
		{#each Object.entries(usage) as [name, seconds]}
			<li>{name}: {humanizeDuration(seconds * 1000, { largest: 2 })}</li>
		{/each}
	</ul>
{:else}
	<p>No data available</p>
{/if}
