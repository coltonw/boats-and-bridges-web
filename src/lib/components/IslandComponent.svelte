<script lang="ts">
	type IslandProps = {
		b: number | null;
		n: number;
		selected?: boolean;
		size?: 'large' | 'small' | 'tiny';
		error?: boolean;
	};
	const { n, b, selected, size = 'small', error }: IslandProps = $props();
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

<div
	class={`island ${size} ${selected ? 'selected' : ''} ${n === b ? 'done' : ''} ${b !== null && n > b ? 'negative' : ''} ${errorClass}`}
>
	<p>{b === null ? '?' : b}</p>
</div>

<style>
	.island {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		transition: filter 0.3s;
	}
	.island p {
		position: relative;
		z-index: 10;
		color: black;
		text-align: center;
		text-shadow: none;
		user-select: none;
	}

	.island.large {
		background-image: url(/island_large.png);
		margin: 12px;
		height: 93px;
		width: 93px;
	}
	.island.small {
		background-image: url(/island_small.png);
		margin: 6px;
		height: 47px;
		width: 47px;
	}
	.island.tiny {
		background-image: url(/island_tiny.png);
		margin: 3px;
		height: 20px;
		width: 20px;
	}
	.island.large p {
		margin: 0;
		padding-right: 5px;
		font-size: 54px;
	}
	.island.small p {
		margin: 0;
		padding-right: 2px;
		font-size: 28px;
	}
	.island.tiny p {
		margin: 0;
		padding-right: 2px;
		font-size: 12px;
	}
	.selected:before {
		content: ' ';
		position: absolute;
		z-index: -1;
		border-radius: 100%;
	}
	.large.selected:before {
		top: -10px;
		left: -14px;
		right: -14px;
		bottom: -8px;
		border: 4px solid white;
	}
	.small.selected:before {
		top: -5px;
		left: -7px;
		right: -7px;
		bottom: -4px;
		border: 4px solid white;
	}
	.tiny.selected:before {
		top: -4px;
		left: -6px;
		right: -5px;
		bottom: -4px;
		border: 3px solid white;
	}
	.done,
	.island.done p {
		color: #df8e00;
	}
	.negative,
	.island.negative p {
		color: #cc0000;
	}
	.island.error {
		filter: opacity(0.4) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)
			drop-shadow(0 0 0 red) drop-shadow(0 0 0 red);
	}
</style>
