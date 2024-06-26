<script lang="ts">
	import IconUndo from 'virtual:icons/ion/arrow-undo';
	import IconRefresh from 'virtual:icons/ion/refresh-circle';
	import IconBack from 'virtual:icons/ion/caret-back-circle';
	import IconForward from 'virtual:icons/ion/caret-forward-circle';
	import IconHome from 'virtual:icons/ion/home';
	import IslandComponent from '$lib/components/IslandComponent.svelte';
	import BridgeHComponent from '$lib/components/BridgeHComponent.svelte';
	import BridgeVComponent from '$lib/components/BridgeVComponent.svelte';
	import FloatingBridgeComponent from '$lib/components/FloatingBridgeComponent.svelte';
	import { xCoordToCss, yCoordToCss, coordToCss, coordToPx, setScale } from '$lib/mapping';
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
	import VictoryScreen from '$lib/components/VictoryScreen.svelte';
	import DestroyBridge from '$lib/components/DestroyBridge.svelte';

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
	let scale: { key: number; size: 'large' | 'medium' | 'small' | 'tiny' } | undefined = $state();
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

	const checkVictoryMap = (id: string): boolean => victoryMap[id] || (id === data.id && victory);
	const levelStatuses = levelGroups.flatMap((group) => group.levels);
	const beatGame = $derived(
		!levelStatuses.find((level) => !level.optional && !checkVictoryMap(level.id))
	);
	const beatAllLevels = $derived(
		!levelGroups.find((group) => !!group.levels.find((level) => !checkVictoryMap(level.id)))
	);
	const nextUnbeatenLevel = $derived(
		levelStatuses.find(
			(level) => parseInt(level.id, 10) > parseInt(data.id, 10) && !checkVictoryMap(level.id)
		)
	);
	const nextUnbeatedUri = $derived(
		nextUnbeatenLevel ? `/levels/${nextUnbeatenLevel.id}` : undefined
	);
	const nextId = $derived(data.nextUri?.slice(data.nextUri.lastIndexOf('/') + 1));
	const unlockedNextLevel = $derived(
		nextId
			? !!levelGroups.find(
					(group) => group.unlock <= levelsWon && group.levels.find((level) => level.id === nextId)
				)
			: false
	);
	const unlockedNextUnbeatenLevel = $derived(
		nextUnbeatenLevel
			? !!levelGroups.find(
					(group) =>
						group.unlock <= levelsWon &&
						group.levels.find((level) => level.id === nextUnbeatenLevel.id)
				)
			: false
	);
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
				<a href={data.previousUri}><IconBack class="icon-button" /></a>
			{:else}
				<div class="nav-spacer"></div>
			{/if}
			<a href="/"><IconHome class="icon-button" /></a>
			<button onclick={game.resetHandler}>
				<IconRefresh class="icon-button" />
			</button>
			<button onclick={game.undoHandler}>
				<IconUndo class="icon-button" />
			</button>
			{#if unlockedNextLevel && data.nextUri}
				<a href={data.nextUri}><IconForward class="icon-button" /></a>
			{:else}
				<div class="nav-spacer"></div>
			{/if}
		</div>
		<h3 class="tip">{game.level.tip}</h3>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			onclick={game.clickHandler}
			onmousedown={game.clickHandler}
			onmouseup={game.clickHandler}
			ontouchstart={game.clickHandler}
			ontouchend={game.clickHandler}
			onmousemove={game.moveHandler}
			ontouchmove={game.moveHandler}
			onmouseleave={game.leaveHandler}
			class="level-container"
			role="application"
			bind:this={appContainer}
		>
			{#if scale}
				{#key scale?.key}
					{#each game.level.islands as { x, y, b, n, selected }}
						<IslandComponent
							{b}
							{n}
							{selected}
							error={!!connectionError.find((i) => i.x === x && i.y === y)}
							size={scale?.size}
							--left={xCoordToCss(x)}
							--top={yCoordToCss(y)}
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
					{#if game.bridgeHBlueprint}
						<BridgeHComponent
							n={game.bridgeHBlueprint.n}
							size={scale?.size}
							--left={xCoordToCss(game.bridgeHBlueprint.x0)}
							--top={yCoordToCss(game.bridgeHBlueprint.y)}
							--width={coordToCss(game.bridgeHBlueprint.x1 - game.bridgeHBlueprint.x0)}
							blueprint
						/>
					{/if}
					{#if game.bridgeVBlueprint}
						<BridgeVComponent
							n={game.bridgeVBlueprint.n}
							size={scale?.size}
							--left={xCoordToCss(game.bridgeVBlueprint.x)}
							--top={yCoordToCss(game.bridgeVBlueprint.y0)}
							--height={coordToCss(game.bridgeVBlueprint.y1 - game.bridgeVBlueprint.y0)}
							blueprint
						/>
					{/if}
					{#each game.level.bridgesH as { x0, x1, y, n }}
						<BridgeHComponent
							{n}
							size={scale?.size}
							--left={xCoordToCss(x0)}
							--top={yCoordToCss(y)}
							--width={coordToCss(x1 - x0)}
						/>
					{/each}
					{#each game.level.bridgesV as { x, y0, y1, n }}
						<BridgeVComponent
							{n}
							size={scale?.size}
							--left={xCoordToCss(x)}
							--top={yCoordToCss(y0)}
							--height={coordToCss(y1 - y0)}
						/>
					{/each}
					{#if game.destroyBridge}
						<DestroyBridge
							size={scale?.size}
							--left={xCoordToCss(game.destroyBridge.x)}
							--top={yCoordToCss(game.destroyBridge.y)}
						/>
					{/if}
					{#each game.level.boats as { boat, dock }, i}
						<DockComponent
							size={scale?.size}
							color={game.level.boats.length > 1 ? colorArray[i] : undefined}
							error={boatError}
							--left={xCoordToCss(dock.x)}
							--top={yCoordToCss(dock.y)}
						/>
						<BoatComponent
							size={scale?.size}
							color={game.level.boats.length > 1 ? colorArray[i] : undefined}
							error={boatError}
							--left={xCoordToCss(boat.x, coordToPx(0.5))}
							--top={yCoordToCss(boat.y, coordToPx(0.5))}
						/>
					{/each}
					{#each game.level.pirates as { x, y }, i}
						<PirateComponent
							size={scale?.size}
							error={boatError}
							--left={xCoordToCss(x, coordToPx(0.5))}
							--top={yCoordToCss(y, coordToPx(0.5))}
						/>
					{/each}
					{#each game.level.trucks as { truck, garage }, i}
						<GarageComponent
							size={scale?.size}
							color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
							error={truckError}
							--left={xCoordToCss(garage.x)}
							--top={yCoordToCss(garage.y)}
						/>
						<TruckComponent
							size={scale?.size}
							color={game.level.trucks.length > 1 ? colorArray[i] : undefined}
							error={truckError}
							--left={xCoordToCss(truck.x)}
							--top={yCoordToCss(truck.y)}
						/>
					{/each}
				{/key}
			{/if}
		</div>
	</div>
</div>

{#if victory && !dismissed}
	<VictoryScreen
		name={data.name}
		unlockedNextArea={!!unlockedNewSection}
		{beatGame}
		{beatAllLevels}
		onDismiss={() => {
			dismissed = true;
		}}
		onReset={game.resetHandler}
		nextUri={nextUnbeatedUri}
		unlockedNextLevel={unlockedNextUnbeatenLevel}
	/>
{/if}

<style>
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 20px;
		padding-right: 20px;
	}
	@media (max-width: 480px) {
		.main {
			padding-left: 5px;
			padding-right: 5px;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

	.tip,
	.name {
		text-align: center;
		text-wrap: balance;
	}
	.tip {
		font-weight: 400;
	}
	@media (max-width: 480px) {
		.tip {
			font-size: 1em;
		}
	}

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 2.4em;
		line-height: 1em;
		margin-bottom: 1em;
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
	.level-container {
		position: relative;
		width: 100%;
		min-height: 200px;
		flex-grow: 1;

		box-sizing: border-box;
	}
</style>
