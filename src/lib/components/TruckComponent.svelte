<script lang="ts">
	type TruckProps = {
		size?: 'large' | 'medium' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
		error?: boolean;
	};
	const { size = 'small', color, error }: TruckProps = $props();
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

<div class={`truck ${size} ${color || ''} ${errorClass}`}></div>

<style>
	/* TODO: support tiny and colors */
	.truck {
		position: absolute;
		z-index: 6;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
		transition: filter 0.3s;
	}
	.truck.large {
		background-image: url(/truck_large.png);
		margin-left: 16px;
		margin-top: 6px;
		width: 66px;
		height: 60px;
	}
	.truck.medium {
		background-image: url(/truck_medium.png);
		margin-left: 11px;
		margin-top: 5px;
		width: 44px;
		height: 40px;
	}
	.truck.small {
		background-image: url(/truck_small.png);
		margin-left: 7px;
		margin-top: 4px;
		width: 33px;
		height: 30px;
	}
	.truck.tiny {
		background-image: url(/truck_small.png);
		margin-left: -6px;
		margin-top: 0;
		width: 33px;
		height: 30px;
	}
	.truck.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
	}
</style>
