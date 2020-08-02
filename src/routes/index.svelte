<script>
	import { onMount } from 'svelte';
	import humanizeDuration from 'humanize-duration';
	import { toYYYYMMDD } from '../util/dates';

	let usage = {};
	$: totalTime = Object.values(usage).reduce((a, c) => a + c, 0);

	let date = toYYYYMMDD(new Date());

	let humanize = x => humanizeDuration(x * 1000, { largest: 2 });

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
	<h2>{humanize(totalTime)}</h2>

	<ul>
		{#each Object.entries(usage) as [name, seconds]}
			<li>{name}: {humanize(seconds)}</li>
		{/each}
	</ul>
{:else}
	<p>No data available</p>
{/if}
