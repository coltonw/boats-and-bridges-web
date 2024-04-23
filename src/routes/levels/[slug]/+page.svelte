<script lang="ts">
	import IslandComponent from '$lib/components/IslandComponent.svelte';
	import BridgeHComponent from '$lib/components/BridgeHComponent.svelte';
	import BridgeVComponent from '$lib/components/BridgeVComponent.svelte';
	import { coordToPx, setScale } from '$lib/mapping';
	import { eventHandlerBuilder } from '$lib/eventHandler.svelte';
	import { checkVictory } from '$lib/utils';
	const { data }: { data: LevelData } = $props();
	const { level, handler } = $derived(eventHandlerBuilder(data));
	const victory = $derived(checkVictory(level));
	let renderKey: number | undefined = $state();
	let appContainer: HTMLDivElement;
	$effect(() => {
		renderKey = setScale(level, appContainer.offsetWidth, appContainer.offsetHeight);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<div class="container">
	<h1 class="name">{data.name}</h1>
	<div class="nav">
		{#if data.previousUri}
			<a href={data.previousUri}>Prev</a>
		{/if}
		{#if data.nextUri && victory}
			<a href={data.nextUri}>Next</a>
		{/if}
	</div>
	<div
		onclick={handler}
		onmousedown={handler}
		onmouseup={handler}
		class="level-container"
		role="application"
		bind:this={appContainer}
	>
		{#key renderKey}
			{#each level.bridgesH as { x0, x1, y, n }}
				<BridgeHComponent
					{n}
					--left={coordToPx(x0, 0, true)}
					--top={coordToPx(y)}
					--width={coordToPx(x1 - x0)}
				/>
			{/each}
			{#each level.bridgesV as { x, y0, y1, n }}
				<BridgeVComponent
					{n}
					--left={coordToPx(x, 0, true)}
					--top={coordToPx(y0)}
					--height={coordToPx(y1 - y0)}
				/>
			{/each}
			{#each level.islands as { x, y, b, n, selected }}
				<IslandComponent {b} {n} {selected} --left={coordToPx(x, 0, true)} --top={coordToPx(y)} />
			{/each}
		{/key}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.name {
		color: white;
		font-weight: bold;
		text-shadow: black 6px 6px 2px;
	}
	.nav {
		height: 28px;
	}
	.nav > a {
		color: white;
	}
	.level-container {
		position: relative;
		width: 100%;
		min-height: 200px;
		flex-grow: 1;

		box-sizing: border-box;
		border: 1px solid rgba(198, 242, 255, 0.5); /* turn off later in development */
	}
</style>
