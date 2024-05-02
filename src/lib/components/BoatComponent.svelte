<script lang="ts">
	type BoatProps = {
		size?: 'large' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
	};
	const { size = 'small', color }: BoatProps = $props();
</script>

<div class={`boat ${size} ${color || ''}`}></div>

<style>
	.boat {
		position: absolute;
		z-index: 5;
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
	.boat.large.blue {
		background-image: url(/sailboat_large_blue.png);
	}
	.boat.large.green {
		background-image: url(/sailboat_large_green.png);
	}
	.boat.large.red {
		background-image: url(/sailboat_large_red.png);
	}
	.boat.small {
		background-image: url(/sailboat_small.png);
		margin: 15px;
		width: 26px;
		height: 29px;
	}
	.boat.small.blue {
		background-image: url(/sailboat_small_blue.png);
	}
	.boat.small.green {
		background-image: url(/sailboat_small_green.png);
	}
	.boat.small.red {
		background-image: url(/sailboat_small_red.png);
	}
	.boat.tiny {
		background-image: url(/sailboat_tiny.png);
		width: 18px;
		height: 20px;
	}
	/* .boat.large {
		animation: 4s linear 0s infinite normal bob;
	}
	@keyframes bob {
		0% {
			transform: translateY(0) rotate(0);
		}
		20% {
			transform: translateY(2px) rotate(-5deg);
		}
		40% {
			transform: translateY(4px) rotate(0);
		}
		70% {
			transform: translateY(2px) rotate(5deg);
		}
		100% {
			transform: translateY(0) rotate(0);
		}
	} */
</style>
