<script lang="ts">
	type DockProps = {
		size?: 'large' | 'small' | 'tiny';
	};
	const { size = 'small' }: DockProps = $props();
</script>

<div class={`dock ${size}`}></div>

<style>
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
	.dock.small,
	.dock.tiny {
		background-image: url(/dock_small.png);
		margin-left: 34px;
		margin-top: 32px;
		width: 35px;
		height: 35px;
	}
</style>
