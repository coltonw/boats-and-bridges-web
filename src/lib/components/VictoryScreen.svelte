<script lang="ts">
	import IconRefresh from 'virtual:icons/ion/refresh-circle';
	import IconForward from 'virtual:icons/ion/caret-forward-circle';
	import IconUp from 'virtual:icons/ion/caret-up-circle';
	import IconDown from 'virtual:icons/ion/caret-down-circle';
	import IconCheckmark from 'virtual:icons/ion/checkmark-circle';

	type VictoryScreenProps = {
		name: string;
		unlockedNextLevel: boolean;
		unlockedNextArea: boolean;
		beatGame: boolean;
		beatAllLevels: boolean;
		onDismiss: () => void;
		onReset: () => void;
		nextUri?: string;
	};
	const {
		name,
		unlockedNextLevel,
		unlockedNextArea,
		beatGame,
		beatAllLevels,
		onDismiss,
		onReset,
		nextUri
	}: VictoryScreenProps = $props();
</script>

<div class="victory-screen">
	<div></div>
	<div class="victory-content">
		<h3 class="name">{name}</h3>
		<div class="nav">
			<button onclick={onDismiss}>
				<IconDown class="icon-button" />
			</button>
			<button onclick={onReset}>
				<IconRefresh class="icon-button" />
			</button>
			<a href="/"><IconUp class="icon-button" /></a>
			{#if unlockedNextLevel && nextUri}
				<a href={nextUri}><IconForward class="icon-button" /></a>
			{:else if beatAllLevels}
				<a href="https://www.youtube.com/watch?v=T1XgFsitnQw">
					<IconCheckmark class="icon-button" />
				</a>
			{/if}
		</div>
		{#if unlockedNextArea}
			<h4 class="tip">
				Unlocked next area<br />
				Click <IconUp class="icon-text" /> to go to level select screen
			</h4>
		{/if}
		{#if beatAllLevels}
			<h4 class="tip">
				Thank you for playing!<br /><br />
				Game by Will Colton
			</h4>
		{:else if beatGame}
			<h4 class="tip">
				You won the game!<br />
				Feel free to keep playing and try beating all the levels
			</h4>
		{/if}
	</div>
</div>

<style>
	.name,
	.tip {
		margin-bottom: 0.6em;
		text-align: center;
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
	.nav > button {
		margin: 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		font-size: inherit;
		cursor: pointer;
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
		font-size: 2.6em;
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
