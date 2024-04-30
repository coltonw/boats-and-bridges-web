<script lang="ts">
	type TruckProps = {
		size?: 'large' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
	};
	const { size = 'small', color }: TruckProps = $props();
</script>

<div class={`truck ${size} ${color || ''}`}></div>

<style>
	/* TODO: support tiny and colors */
	.truck {
		position: absolute;
		z-index: 6;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
	}
	.truck.large {
		background-image: url(/truck_large.png);
		margin-left: 16px;
		margin-top: 6px;
		width: 66px;
		height: 60px;
	}
	.truck.small {
		background-image: url(/truck_small.png);
		margin-left: 7px;
		margin-top: 4px;
		width: 33px;
		height: 30px;
	}
</style>
