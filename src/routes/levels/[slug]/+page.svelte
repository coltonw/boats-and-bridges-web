<script lang="ts">
	import IconUndo from 'virtual:icons/ion/arrow-undo';
	import IconRefresh from 'virtual:icons/ion/refresh-circle';
	import IconBack from 'virtual:icons/ion/caret-back-circle';
	import IconForward from 'virtual:icons/ion/caret-forward-circle';
	import IconUp from 'virtual:icons/ion/caret-up-circle';
	import IconDown from 'virtual:icons/ion/caret-down-circle';
	import IconCheckmark from 'virtual:icons/ion/checkmark-circle';
	import IslandComponent from '$lib/components/IslandComponent.svelte';
	import BridgeHComponent from '$lib/components/BridgeHComponent.svelte';
	import BridgeVComponent from '$lib/components/BridgeVComponent.svelte';
	import FloatingBridgeComponent from '$lib/components/FloatingBridgeComponent.svelte';
	import { coordToOffset, coordToPx, setScale } from '$lib/mapping';
	import { gameBuilder } from '$lib/game.svelte';
	import { loadLevel, loadVictoryMap, saveVictory } from '$lib/storage';
	import { setPrevLevelName, transitioning } from '$lib/transitioning';
	import {
		checkFull,
		checkVictory,
		connectionError as connectionErrorUtil,
		truckError as truckErrorUtil
	} from '$lib/utils';
	import levelGroups from '$lib/levels/levelGroups';
	import BoatComponent from '$lib/components/BoatComponent.svelte';
	import DockComponent from '$lib/components/DockComponent.svelte';
	import GarageComponent from '$lib/components/GarageComponent.svelte';
	import TruckComponent from '$lib/components/TruckComponent.svelte';
	import PirateComponent from '$lib/components/PirateComponent.svelte';

	const { data }: { data: LevelData } = $props();
	const game = $derived(gameBuilder(data));
	const victoryMap: VictoryData = $state({});
	$effect(() => {
		if (!game.level.loaded) {
			loadLevel(game.level);
			loadVictoryMap(victoryMap);
		}
	});
	const victory = $derived(checkVictory(game.level));
	const error = $derived(!victory && checkFull(game.level));
	const connectionError: Island[] = $derived((error && connectionErrorUtil(game.level)) || []);
	const truckError: boolean = $derived(error && truckErrorUtil(game.level));
	const boatError: boolean = $derived(error && connectionError.length === 0 && !truckError); // we could actually calculate the boat error, but this is way easier and almost as good
	let dismissed = $state(false);
	$effect(() => {
		// each time you go to a new level that hasn't been beaten, reset the dismissed flag
		if (!victory) {
			dismissed = false;
		} else if (transitioning(game.level.name)) {
			// This is just a QOL thing, if you are skipping through levels, you don't want them flashing the victory screen
			dismissed = true;
		}

		// If you undo your win, it still counts as a win in level select
		if (victory) {
			saveVictory(game.level, victory);
		}
	});
	let scale: { key: number; size: 'large' | 'small' | 'tiny' } | undefined = $state();
	let appContainer: HTMLDivElement;
	$effect(() => {
		scale = setScale(game.level, appContainer.offsetWidth, appContainer.offsetHeight);
	});
	const colorArray: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];
	const previouslyWonThisLevel = $derived(victoryMap[data.id] || false);
	const levelsWon = $derived(
		Object.values(victoryMap).filter((v) => v).length + (victory && !previouslyWonThisLevel ? 1 : 0)
	);
	const unlockedNewSection = $derived(levelGroups.find((group) => group.unlock === levelsWon));
	$effect(() => {
		setPrevLevelName(game.level.name);
	});
</script>

<svelte:window onkeydown={game.keydownHandler} />

<div class="main">
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
	<div class="container">
		<h1 class="name">{data.name}</h1>
		<div class="nav">
			{#if data.previousUri}
				<a href={data.previousUri}><IconBack class="game-nav-icon" /></a>
			{:else}
				<div class="nav-spacer"></div>
			{/if}
			<button onclick={game.resetHandler}>
				<IconRefresh class="game-nav-icon" />
			</button>
			<button onclick={game.undoHandler}>
				<IconUndo class="game-nav-icon" />
			</button>
			<a href="/"><IconUp class="game-nav-icon" /></a>
			{#if data.nextUri}
				<a href={data.nextUri}><IconForward class="game-nav-icon" /></a>
			{:else}
				<div class="nav-spacer"></div>
			{/if}
		</div>
		<h3 class="tip">{game.level.tip}</h3>
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
						error={!!connectionError.find((i) => i.x === x && i.y === y)}
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
						error={boatError}
						--left={coordToPx(dock.x, 0, true)}
						--top={coordToPx(dock.y)}
					/>
					<BoatComponent
						size={scale?.size}
						color={game.level.boats.length > 1 ? colorArray[i] : undefined}
						error={boatError}
						--left={coordToPx(boat.x, coordToOffset(0.5), true)}
						--top={coordToPx(boat.y, coordToOffset(0.5))}
					/>
				{/each}
				{#each game.level.pirates as { x, y }, i}
					<PirateComponent
						size={scale?.size}
						error={boatError}
						--left={coordToPx(x, coordToOffset(0.5), true)}
						--top={coordToPx(y, coordToOffset(0.5))}
					/>
				{/each}
				{#each game.level.trucks as { truck, garage }, i}
					<GarageComponent
						size={scale?.size}
						color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
						error={truckError}
						--left={coordToPx(garage.x, 0, true)}
						--top={coordToPx(garage.y)}
					/>
					<TruckComponent
						size={scale?.size}
						color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
						error={truckError}
						--left={coordToPx(truck.x, 0, true)}
						--top={coordToPx(truck.y)}
					/>
				{/each}
			{/key}
		</div>
	</div>
</div>

{#if victory && !dismissed}
	<div class="victory-screen">
		<div></div>
		<div class="victory-content">
			<div class="name">{game.level.name}</div>
			<div class="tip">{unlockedNewSection ? 'Unlocked next area' : ''}</div>
			<div class="nav">
				<button
					onclick={() => {
						dismissed = true;
					}}
				>
					<IconDown class="game-nav-icon" />
				</button>
				<button onclick={game.resetHandler}>
					<IconRefresh class="game-nav-icon" />
				</button>
				<a href="/"><IconUp class="game-nav-icon" /></a>
				{#if data.nextUri}
					<a href={data.nextUri}><IconForward class="game-nav-icon" /></a>
				{:else}
					<a href="https://www.youtube.com/watch?v=T1XgFsitnQw">
						<IconCheckmark class="game-nav-icon" />
					</a>
				{/if}
			</div>
		</div>
	</div>
{/if}

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
		text-shadow: black 0.125em 0.125em 0.06em;
	}
	.tip {
		color: white;
		font-weight: 400;
		text-shadow: black 0.125em 0.125em 0.06em;
	}
	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 2.4em;
		line-height: 1em;
	}
	.nav > :not(:last-child) {
		margin-right: 0.5em;
	}
	.nav-spacer {
		width: 2.4em;
	}
	.nav > button {
		margin: 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		font-size: inherit;
		cursor: pointer;
	}
	:global(.game-nav-icon) {
		font-size: 2em;
		color: white;
		filter: drop-shadow(0.125em 0.125em 0.06em rgba(0, 0, 0, 1));
	}
	:global(.game-nav-icon:active) {
		font-size: 2em;
		color: lightblue;
		filter: drop-shadow(0.06em 0.06em 0.06em rgba(0, 0, 0, 1));
	}
	.level-container {
		position: relative;
		width: 100%;
		min-height: 200px;
		flex-grow: 1;

		box-sizing: border-box;
	}
	.victory-screen {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 20;
		width: 100vw;
		height: 100vh;
		background-image: url(/victory.jpg);
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: 3em;
	}
	.victory-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.victory-content .name {
		margin-bottom: 0.5em;
	}
</style>
