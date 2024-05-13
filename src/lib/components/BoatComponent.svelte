<script lang="ts">
	type BoatProps = {
		size?: 'large' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
		error?: boolean;
	};
	const { size = 'small', color, error }: BoatProps = $props();
	let errorClass = $state('');
	$effect(() => {
		if (error) {
			for (let i = 0; i < 3; i++) {
				setTimeout(() => {
					errorClass = 'error';
				}, i * 800);
				setTimeout(
					() => {
						errorClass = '';
					},
					i * 800 + 300
				);
			}
		}
	});
</script>

<div class={`boat ${size} ${color || ''} ${errorClass}`}></div>

<style>
	.boat {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
		transition: filter 0.3s;
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
		margin: 4px;
		width: 18px;
		height: 20px;
	}
	.boat.tiny.blue {
		background-image: url(/sailboat_tiny_blue.png);
	}
	.boat.tiny.green {
		background-image: url(/sailboat_tiny_green.png);
	}
	.boat.tiny.red {
		background-image: url(/sailboat_tiny_red.png);
	}
	.boat.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
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
