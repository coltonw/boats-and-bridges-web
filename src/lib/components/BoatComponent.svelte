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
	}
	.boat.large {
		background-image: url(/sailboat_large.png);
		width: 90px;
		height: 100px;
	}
	.boat.small {
		background-image: url(/boat_small.png);
		width: 45px;
		height: 50px;
	}
	.boat.tiny {
		background-image: url(/boat_small.png);
		width: 18px;
		height: 20px;
	}
</style>
