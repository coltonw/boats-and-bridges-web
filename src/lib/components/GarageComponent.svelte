<script lang="ts">
	type GarageProps = {
		size?: 'large' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
	};
	const { size = 'small', color }: GarageProps = $props();
</script>

<div class={`garage ${size} ${color || ''}`}></div>

<style>
	/* TODO: support tiny and colors */
	.garage {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
	}
	.garage.large {
		background-image: url(/warehouse_large.png);
		margin-left: 22px;
		margin-top: 0;
		width: 72px;
		height: 62px;
	}
	.garage.small {
		background-image: url(/warehouse_small.png);
		margin-left: 12px;
		margin-top: -1px;
		width: 36px;
		height: 31px;
	}
</style>
