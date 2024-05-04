<script lang="ts">
	import IconSettings from 'virtual:icons/ion/settings';
	import ArchipelagoComponent from '$lib/components/ArchipelagoComponent.svelte';
	import levelGroups from '$lib/levels/levelGroups';
	import { setPrevLevelName } from '$lib/transitioning';
	import { loadVictoryMap } from '$lib/storage';
	const victoryMap: VictoryData = $state({});
	$effect(() => {
		setPrevLevelName('');
		loadVictoryMap(victoryMap);
	});
	const marginTop = [0, 60, -10, 40, -30, 50];
	const marginLeft = [-12, 6, -4, 26];
</script>

<div class="main">
	<a href="/settings" class="options"><IconSettings class="game-nav-icon" /></a>
	<h1 class="title">Boats and Bridges</h1>
	{#each levelGroups as levelGroup}
		<div class="level-group">
			<h1 class="name">{levelGroup.name}</h1>
			<div class="subgroups">
				{#if !!levelGroup.levels.find((lvl) => !lvl.optional)}
					<div class="subgroup">
						{#if !!levelGroup.levels.find((lvl) => lvl.optional)}
							<div class="spacer"></div>
						{/if}
						<div class="archipelagos">
							{#each levelGroup.levels.filter((lvl) => !lvl.optional) as level, i}
								<a
									href={`levels/${level.id}`}
									style={`margin-top: ${marginTop[i % 6]}px; margin-left: ${marginLeft[i % 4]}px;`}
								>
									<ArchipelagoComponent
										size="large"
										id={level.id}
										completed={victoryMap[level.id]}
									/>
								</a>
							{/each}
						</div>
					</div>
				{/if}
				{#if !!levelGroup.levels.find((lvl) => lvl.optional)}
					<div class="subgroup">
						<h3 class="subtitle">Optional</h3>
						<div class="archipelagos">
							{#each levelGroup.levels.filter((lvl) => lvl.optional) as level, i}
								<a
									href={`levels/${level.id}`}
									style={`margin-top: ${marginTop[i % 6]}px; margin-left: ${marginLeft[i % 4]}px;`}
								>
									<ArchipelagoComponent
										size="large"
										id={level.id}
										completed={victoryMap[level.id]}
									/>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		align-content: center;
	}
	.options {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.level-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 40px;
	}
	.subgroups {
		display: flex;
		flex-direction: row;
	}
	.subgroup:not(:last-child) {
		margin-right: 30px;
	}
	.title,
	.name,
	.subtitle {
		margin: 0;
		color: white;
		font-weight: 500;
		text-shadow: black 0.125em 0.125em 0.06em;
	}
	.title {
		font-size: 60px;
		margin-bottom: 60px;
	}
	.spacer {
		height: 1.17em;
	}
	.archipelagos {
		display: flex;
		flex-direction: row;
	}
	.archipelagos a {
		color: black;
		text-decoration: none;
	}

	:global(.level-select-icon-button) {
		font-size: 2em;
		color: white;
		filter: drop-shadow(0.125em 0.125em 0.06em rgba(0, 0, 0, 1));
	}
	:global(.level-select-icon-button:active) {
		font-size: 2em;
		color: lightblue;
		filter: drop-shadow(0.06em 0.06em 0.06em rgba(0, 0, 0, 1));
	}
</style>
