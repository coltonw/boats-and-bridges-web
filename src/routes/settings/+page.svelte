<script lang="ts">
	import IconBack from 'virtual:icons/ion/caret-back-circle';
	let reseting = $state(false);
</script>

<div class="main">
	<h1 class="title">Settings</h1>
	<button
		onclick={() => {
			reseting = true;
		}}>Clear All Data</button
	>
	<a href="/"><IconBack class="settings-icon-button" /></a>
</div>

{#if reseting}
	<div class="overlay">
		<div class="dialog">
			<p>Are you sure you want to delete all your save data?</p>
			<div class="buttons">
				<button
					onclick={() => {
						reseting = false;
					}}>Cancel</button
				>
				<button
					onclick={() => {
						reseting = false;
						localStorage.clear();
					}}>Clear All Data</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}
	.title {
		color: white;
		font-weight: 500;
		text-shadow: black 0.125em 0.125em 0.06em;
	}
	button {
		border-radius: 10px;
		border-width: 5px;
		padding: 10px;
		background-color: transparent;
		color: white;
		text-shadow: black 0.125em 0.125em 0.06em;
		font-size: 18px;
		margin-bottom: 20px;
	}
	:global(.settings-icon-button) {
		font-size: 2em;
		color: white;
		filter: drop-shadow(0.125em 0.125em 0.06em rgba(0, 0, 0, 1));
	}
	:global(.settings-icon-button:active) {
		font-size: 2em;
		color: lightblue;
		filter: drop-shadow(0.06em 0.06em 0.06em rgba(0, 0, 0, 1));
	}
	.overlay {
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dialog {
		background-color: white;
		border-radius: 20px;
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.dialog p {
		margin: 0;
		margin-bottom: 1em;
		color: black;
		font-size: 18px;
	}
	.dialog button {
		margin: 0;
		background-image: url(/water.jpg);
	}
	.buttons {
		align-self: flex-end;
	}
</style>
