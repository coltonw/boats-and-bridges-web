<script lang="ts">
	type DockProps = {
		size?: 'large' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
	};
	const { size = 'small', color }: DockProps = $props();
</script>

<div class={`dock ${size} ${color || ''}`}></div>

<style>
	/* TODO: support tiny */
	.dock {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
	}
	.dock.large {
		background-image: url(/dock_large.png);
		margin-left: 64px;
		margin-top: 59px;
		width: 70px;
		height: 70px;
	}
	.dock.large.blue {
		background-image: url(/dock_large_blue.png);
	}
	.dock.large.green {
		background-image: url(/dock_large_green.png);
	}
	.dock.large.red {
		background-image: url(/dock_large_red.png);
	}
	.dock.small {
		background-image: url(/dock_small.png);
		margin-left: 33px;
		margin-top: 30px;
		width: 35px;
		height: 35px;
	}
	.dock.small.blue {
		background-image: url(/dock_small_blue.png);
	}
	.dock.small.green {
		background-image: url(/dock_small_green.png);
	}
	.dock.small.red {
		background-image: url(/dock_small_red.png);
	}
</style>
