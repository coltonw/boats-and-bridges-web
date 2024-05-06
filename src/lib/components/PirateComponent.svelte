<script lang="ts">
	type PirateProps = {
		size?: 'large' | 'small' | 'tiny';
		error?: boolean;
	};
	const { size = 'small', error }: PirateProps = $props();
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

<div class={`pirate ${size} ${errorClass}`}></div>

<style>
	.pirate {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
		transition: filter 0.3s;
	}
	.pirate.large {
		background-image: url(/pirate_large.png);
		margin-left: 16px;
		margin-top: 14px;
		width: 64px;
		height: 73px;
	}
	.pirate.small {
		background-image: url(/pirate_small.png);
		margin-left: 8px;
		margin-top: 7px;
		width: 32px;
		height: 36px;
	}
	.pirate.tiny {
		background-image: url(/pirate_tiny.png);
		width: 24px;
		height: 27px;
	}
	.pirate.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
	}
</style>
