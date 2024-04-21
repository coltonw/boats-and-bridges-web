<script lang="ts">
	import IslandComponent from '$lib/components/IslandComponent.svelte';
	import BridgeHComponent from '$lib/components/BridgeHComponent.svelte';
	import BridgeVComponent from '$lib/components/BridgeVComponent.svelte';
	import { coordToPx, islandSize, margin } from '$lib/mapping';
	import { eventHandlerBuilder } from '$lib/eventHandler';
	export let data: LevelData;
	const handler = eventHandlerBuilder(data);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<div
	on:click={handler}
	on:mousedown={handler}
	on:mouseup={handler}
	class="container"
	role="application"
>
	{#each data.bridgesH as { x0, x1, y, n }}
		<BridgeHComponent
			{n}
			--left={coordToPx(x0)}
			--top={coordToPx(y)}
			--width={coordToPx(x1 - x0)}
		/>
	{/each}
	{#each data.bridgesV as { x, y0, y1, n }}
		<BridgeVComponent
			{n}
			--left={coordToPx(x)}
			--top={coordToPx(y0)}
			--height={coordToPx(y1 - y0)}
		/>
	{/each}
	{#each data.islands as { x, y, b, n, selected }}
		<IslandComponent number={b - n} {selected} --left={coordToPx(x)} --top={coordToPx(y)} />
	{/each}
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		min-height: 200px;
	}
</style>
