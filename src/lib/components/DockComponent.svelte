<script lang="ts">
	type DockProps = {
		size?: 'large' | 'medium' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
		error?: boolean;
	};
	const { size = 'small', color, error }: DockProps = $props();
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

<div class={`dock ${size} ${color || ''} ${errorClass}`}></div>

<style>
	.dock {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
		transition: filter 0.3s;
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
	.dock.medium {
		background-image: url(/dock_medium.png);
		margin-left: 42px;
		margin-top: 39px;
		width: 47px;
		height: 47px;
	}
	.dock.medium.blue {
		background-image: url(/dock_medium_blue.png);
	}
	.dock.medium.green {
		background-image: url(/dock_medium_green.png);
	}
	.dock.medium.red {
		background-image: url(/dock_medium_red.png);
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
	.dock.tiny {
		background-image: url(/dock_tiny.png);
		margin-left: 19px;
		margin-top: 15px;
		width: 25px;
		height: 25px;
	}
	.dock.tiny.blue {
		background-image: url(/dock_tiny_blue.png);
	}
	.dock.tiny.green {
		background-image: url(/dock_tiny_green.png);
	}
	.dock.tiny.red {
		background-image: url(/dock_tiny_red.png);
	}
	.red {
		filter: hue-rotate(-40deg);
	}
	.dock.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
	}
</style>
