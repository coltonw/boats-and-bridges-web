<script lang="ts">
	type BridgeProps = {
		n: number;
		size?: 'large' | 'medium' | 'small' | 'tiny';
		blueprint?: boolean;
	};
	const { n, size = 'small', blueprint }: BridgeProps = $props();
</script>

<div class={`bridgeV ${size} ${blueprint ? 'blueprint' : ''}`}>
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
		height: var(--height, 0);
		box-sizing: border-box;
		pointer-events: none;
	}

	.inner {
		height: auto;
		pointer-events: none;
	}

	.blueprint .inner {
		filter: opacity(0.7);
	}

	.large {
		margin-left: 44px;
		margin-top: 54px;
		padding-top: 24px;
		padding-bottom: 24px;
		width: 24px;
	}

	.large .inner {
		width: 8px;
		background-image: url(/bridge_vert_large.png);
	}

	.large .double {
		margin-left: 8px;
	}

	.medium {
		margin-left: 27px;
		margin-top: 36px;
		padding-top: 16px;
		padding-bottom: 16px;
		width: 22px;
	}

	.medium .inner {
		width: 8px;
		background-image: url(/bridge_vert_large.png);
	}

	.medium .double {
		margin-left: 6px;
	}

	.small {
		margin-left: 22px;
		margin-top: 27px;
		padding-top: 12px;
		padding-bottom: 12px;
		width: 12px;
	}

	.small .inner {
		width: 4px;
		background-image: url(/bridge_vert_small.png);
	}

	.small .double {
		margin-left: 4px;
	}

	.tiny {
		margin-left: 13px;
		margin-top: 16px;
		padding-top: 7px;
		padding-bottom: 8px;
		width: 6px;
	}

	.tiny .inner {
		width: 2px;
		background-color: white;
	}

	.tiny .double {
		margin-left: 2px;
	}
</style>
