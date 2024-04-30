<script lang="ts">
	import IslandComponent from '$lib/components/IslandComponent.svelte';
	import BridgeHComponent from '$lib/components/BridgeHComponent.svelte';
	import BridgeVComponent from '$lib/components/BridgeVComponent.svelte';
	import FloatingBridgeComponent from '$lib/components/FloatingBridgeComponent.svelte';
	import { coordToOffset, coordToPx, setScale } from '$lib/mapping';
	import { gameBuilder } from '$lib/game.svelte';
	import { checkVictory } from '$lib/utils';
	import BoatComponent from '$lib/components/BoatComponent.svelte';
	import DockComponent from '$lib/components/DockComponent.svelte';
	import GarageComponent from '$lib/components/GarageComponent.svelte';
	import TruckComponent from '$lib/components/TruckComponent.svelte';
	const { data }: { data: LevelData } = $props();
	const game = $derived(gameBuilder(data));
	const victory = $derived(checkVictory(game.level));
	let scale: { key: number; size: 'large' | 'small' | 'tiny' } | undefined = $state();
	let appContainer: HTMLDivElement;
	$effect(() => {
		scale = setScale(game.level, appContainer.offsetWidth, appContainer.offsetHeight);
	});
	const colorArray: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];
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
		onclick={game.clickHandler}
		onmousedown={game.clickHandler}
		onmouseup={game.clickHandler}
		onmousemove={game.moveHandler}
		onmouseleave={game.leaveHandler}
		class="level-container"
		role="application"
		bind:this={appContainer}
	>
		{#key scale?.key}
			{#each game.level.islands as { x, y, b, n, selected }}
				<IslandComponent
					{b}
					{n}
					{selected}
					size={scale?.size}
					--left={coordToPx(x, 0, true)}
					--top={coordToPx(y)}
				/>
			{/each}
			{#if game.floatingBridge}
				<FloatingBridgeComponent
					size={scale?.size}
					--left={`${game.floatingBridge.left}px`}
					--top={`${game.floatingBridge.top}px`}
					--width={`${game.floatingBridge.width}px`}
					--rotate={`${game.floatingBridge.rotate}rad`}
				/>
			{/if}
			{#each game.level.bridgesH as { x0, x1, y, n }}
				<BridgeHComponent
					{n}
					size={scale?.size}
					--left={coordToPx(x0, 0, true)}
					--top={coordToPx(y)}
					--width={coordToPx(x1 - x0)}
				/>
			{/each}
			{#each game.level.bridgesV as { x, y0, y1, n }}
				<BridgeVComponent
					{n}
					size={scale?.size}
					--left={coordToPx(x, 0, true)}
					--top={coordToPx(y0)}
					--height={coordToPx(y1 - y0)}
				/>
			{/each}
			{#each game.level.boats as { boat, dock }, i}
				<DockComponent
					size={scale?.size}
					color={game.level.boats.length > 1 ? colorArray[i] : undefined}
					--left={coordToPx(dock.x, 0, true)}
					--top={coordToPx(dock.y)}
				/>
				<BoatComponent
					size={scale?.size}
					color={game.level.boats.length > 1 ? colorArray[i] : undefined}
					--left={coordToPx(boat.x, coordToOffset(0.5), true)}
					--top={coordToPx(boat.y, coordToOffset(0.5))}
				/>
			{/each}
			{#each game.level.trucks as { truck, garage }, i}
				<GarageComponent
					size={scale?.size}
					color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
					--left={coordToPx(garage.x, 0, true)}
					--top={coordToPx(garage.y)}
				/>
				<TruckComponent
					size={scale?.size}
					color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
					--left={coordToPx(truck.x, 0, true)}
					--top={coordToPx(truck.y)}
				/>
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
		font-weight: 500;
		text-shadow: black 4px 4px 2px;
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
	}
</style>
