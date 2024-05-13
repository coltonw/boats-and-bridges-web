<script lang="ts">
	import IconSettings from 'virtual:icons/ion/settings';
	import ArchipelagoComponent from '$lib/components/ArchipelagoComponent.svelte';
	import IntroScreen from '$lib/components/IntroScreen.svelte';
	import levelGroups from '$lib/levels/levelGroups';
	import { setPrevLevelName } from '$lib/transitioning';
	import { loadVictoryMap } from '$lib/storage';
	const victoryMap: VictoryData = $state({});
	$effect(() => {
		setPrevLevelName('');
		loadVictoryMap(victoryMap);
	});
	const numVictories = $derived(Object.values(victoryMap).filter((v) => v).length);
	const marginTop = [0, 60, -10, 40, -20, 50];
	const marginLeft = [-12, 6, -4, 26];
	const nextLockedGroup = $derived(levelGroups.find((group) => group.unlock > numVictories));
</script>

<div class="main">
	<a href="/settings" class="options"><IconSettings class="icon-button" /></a>
	<h1 class="title">Boats and Bridges</h1>
	{#if numVictories < levelGroups[0].levels.length}
		<IntroScreen {victoryMap} />
	{:else}
		{#each levelGroups.filter((group) => group.unlock <= numVictories) as levelGroup}
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
										style={`margin-top: ${marginTop[i % 6]}px; margin-left: ${i === 0 ? 0 : marginLeft[i % 4]}px;`}
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
		{#if nextLockedGroup}
			<div class="locked-group">
				<h1 class="name">{nextLockedGroup.name}</h1>
				<h3 class="locked">
					Unlocks after {nextLockedGroup.unlock - numVictories} more levels beaten
				</h3>
			</div>
		{/if}
	{/if}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
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
	@media (max-width: 1024px) {
		.level-group {
			align-items: center;
		}
	}
	.subgroups {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
	}
	.subgroup:not(:last-child) {
		margin-right: 30px;
	}
	.title {
		font-size: 60px;
		margin-bottom: 60px;
		text-align: center;
		text-wrap: balance;
	}
	.spacer {
		height: 1.17em;
	}
	.archipelagos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.archipelagos a {
		color: black;
		text-decoration: none;
	}
	.locked-group {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}
	.locked-group :not(:last-child) {
		margin-right: 30px;
	}
</style>
