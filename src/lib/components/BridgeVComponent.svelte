<script lang="ts">
	type BridgeProps = {
		n: number;
	};
	const { n }: BridgeProps = $props();
</script>

<div class="bridgeV">
	<div class="inner"></div>
	{#if n >= 2}
		<div class="inner double"></div>
	{/if}
</div>

<style>
	.bridgeV {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		margin-left: 22px;
		margin-top: 27px;
		padding-top: 12px;
		padding-bottom: 12px;
		width: 12px;
		height: var(--height, 0);
		box-sizing: border-box;
		pointer-events: none;
	}

	.inner {
		width: 4px;
		height: auto;
		background-image: url(/small_bridge_vert.png);
		pointer-events: none;
	}

	.double {
		margin-left: 4px;
	}
</style>
