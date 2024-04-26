<script lang="ts">
	type BridgeProps = {
		n: number;
		size?: 'large' | 'small' | 'tiny';
	};
	const { n, size = 'small' }: BridgeProps = $props();
</script>

<div class={`bridgeH ${size}`}>
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
		width: var(--width, 0);
		box-sizing: border-box;
		pointer-events: none;
	}

	.inner {
		width: auto;
		pointer-events: none;
	}

	.large {
		margin-left: 57px;
		margin-top: 44px;
		padding-left: 24px;
		padding-right: 28px;
		height: 24px;
	}

	.large .inner {
		height: 8px;
		background-image: url(/large_bridge_hor.png);
	}

	.large .double {
		margin-top: 8px;
	}

	.small {
		margin-left: 30px;
		margin-top: 22px;
		padding-left: 12px;
		padding-right: 14px;
		height: 12px;
	}

	.small .inner {
		height: 4px;
		background-image: url(/small_bridge_hor.png);
	}

	.small .double {
		margin-top: 4px;
	}
</style>
