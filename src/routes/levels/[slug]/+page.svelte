<script lang="ts">
	import IslandComponent from '$lib/IslandComponent.svelte';
	import { coordToPx } from '$lib/mapping';
	import { eventHandlerBuilder } from '$lib/eventHandler';
	export let data: LevelData;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<div on:click={eventHandlerBuilder(data)} class="container" role="application">
	{#each data.islands as { x, y, b, n }}
		<IslandComponent number={b - n} --left={coordToPx(x)} --top={coordToPx(y)} />
	{/each}
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		min-height: 200px;
	}
</style>
