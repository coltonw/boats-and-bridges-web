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
	<h1 class="name shadow wood">{data.name}</h1>
	<div class="name-container">
		<h1 class="name wood-texture">{data.name}</h1>
	</div>
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
	}
	.name.shadow {
		position: absolute;
		z-index: 5;
		color: #e2ded3;
		text-shadow:
			#bfb69e 1px 1px 0,
			#9d8f6a 2px 2px 0,
			#696045 3px 3px 0,
			#353023 4px 4px 0,
			#042940 0 0 12px;
	}
	.name.red {
		text-shadow:
			#f4a8b4 1px 1px 0,
			#e9506a 2px 2px 0,
			#bf1834 3px 3px 0,
			#680d1c 4px 4px 0,
			black 9px 9px 2px,
			#042940 0 0 12px;
	}
	.name.sand {
		text-shadow:
			#fbdea9 1px 1px 0,
			#f7bd53 2px 2px 0,
			#e5980b 3px 3px 0,
			#8f5f07 4px 4px 0,
			black 9px 9px 2px,
			#042940 0 0 12px;
	}
	.name.blue {
		text-shadow:
			#aeddfa 1px 1px 0,
			#5ebbf6 2px 2px 0,
			#0e99f1 3px 3px 0,
			#0966a1 4px 4px 0,
			black 9px 9px 2px,
			#042940 0 0 12px;
	}
	.name-container {
		position: relative;
		z-index: 10;
		background: url(/wood.jpg) no-repeat center center;
		background-size: cover;
		color: #fff;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	.name.wood-texture {
		text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
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
