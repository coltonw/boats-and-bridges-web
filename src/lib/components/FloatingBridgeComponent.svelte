<script lang="ts">
	type FloatingBridgeProps = {
		size?: 'large' | 'medium' | 'small' | 'tiny';
	};
	const { size = 'small' }: FloatingBridgeProps = $props();
</script>

<div class={`bridge ${size}`}>
	<div class="inner"></div>
</div>

<style>
	.bridge {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		transform-origin: left center;
		transform: rotate(var(--rotate));
		width: var(--width, 0);
		pointer-events: none;
		box-sizing: border-box;
	}

	.inner {
		width: auto;
		pointer-events: none;
	}

	.large,
	.medium {
		padding-left: 28px;
		height: 8px;
	}
	.large .inner,
	.medium .inner {
		height: 8px;
		background-image: url(/bridge_hor_large.png);
	}

	.medium {
		padding-left: 18px;
	}

	.small {
		padding-left: 14px;
		height: 4px;
	}
	.small .inner {
		height: 4px;
		background-image: url(/bridge_hor_small.png);
	}

	.tiny {
		padding-left: 8px;
		height: 2px;
	}
	.tiny .inner {
		height: 2px;
		background-color: white;
	}
</style>
