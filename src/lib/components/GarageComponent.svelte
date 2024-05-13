<script lang="ts">
	type GarageProps = {
		size?: 'large' | 'medium' | 'small' | 'tiny';
		color?: 'blue' | 'green' | 'red';
		error?: boolean;
	};
	const { size = 'small', color, error }: GarageProps = $props();
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

<div class={`garage ${size} ${color || ''} ${errorClass}`}></div>

<style>
	/* TODO: support tiny and colors */
	.garage {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
		transition: filter 0.3s;
	}
	.garage.large {
		background-image: url(/warehouse_large.png);
		margin-left: 22px;
		margin-top: 0;
		width: 72px;
		height: 62px;
	}
	.garage.medium {
		background-image: url(/warehouse_medium.png);
		margin-left: 13px;
		margin-top: 0;
		width: 48px;
		height: 42px;
	}
	.garage.small {
		background-image: url(/warehouse_small.png);
		margin-left: 12px;
		margin-top: -1px;
		width: 36px;
		height: 31px;
	}
	.garage.tiny {
		background-image: url(/warehouse_small.png);
		margin-left: 0;
		margin-top: -8px;
		width: 36px;
		height: 31px;
	}
	.garage.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
	}
</style>
