<script lang="ts">
	type BridgeProps = {
		n: number;
	};
	const { n }: BridgeProps = $props();
</script>

<div class="bridgeH">
	<div class="inner"></div>
	{#if n >= 2}
		<div class="inner double"></div>
	{/if}
</div>

<style>
	.bridgeH {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		margin-left: 30px;
		margin-top: 22px;
		padding-left: 12px;
		padding-right: 14px;
		width: var(--width, 0);
		height: 12px;
		box-sizing: border-box;
		pointer-events: none;
	}

	.inner {
		width: auto;
		height: 4px;
		background-image: url(/small_bridge_hor.png);
		pointer-events: none;
	}

	.double {
		margin-top: 4px;
	}
</style>
