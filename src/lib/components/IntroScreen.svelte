<script lang="ts">
	import levelGroups from '$lib/levels/levelGroups';
	type IntroScreenProps = {
		victoryMap: {
			[id: string]: boolean;
		};
	};
	const { victoryMap }: IntroScreenProps = $props();
	const levelIds = levelGroups.flatMap((group) => group.levels).map((level) => level.id);
	const firstMissingLevel = $derived(levelIds.find((id) => !victoryMap[id]) || '1');
</script>

<a href={`/levels/${firstMissingLevel}`}>
	<div class="intro-archipelago">
		<p>PLAY</p>
	</div>
</a>

<style>
	.intro-archipelago {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-repeat: no-repeat;
		background-image: url(/archipelago_intro.png);
		height: 240px;
		width: 240px;
		font-size: 100px;
	}
</style>
