<script lang="ts">
	type BoatProps = {
		size?: 'large' | 'small' | 'tiny';
	};
	const { size = 'small' }: BoatProps = $props();
</script>

<div class={`boat ${size}`}></div>

<style>
	.boat {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
	}
	.boat.large {
		background-image: url(/sailboat_large.png);
		margin: 30px;
		width: 51px;
		height: 57px;
	}
	.boat.small {
		background-image: url(/sailboat_small.png);
		margin: 15px;
		width: 26px;
		height: 29px;
	}
	.boat.tiny {
		background-image: url(/sailboat_tiny.png);
		width: 18px;
		height: 20px;
	}
</style>
