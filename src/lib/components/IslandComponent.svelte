<script lang="ts">
	type IslandProps = {
		b: number | null;
		n: number;
		selected?: boolean;
		size?: 'large' | 'small' | 'tiny';
	};
	const { n, b, selected, size = 'small' }: IslandProps = $props();
</script>

<div
	class={`island ${size} ${selected ? 'selected' : ''} ${n === b ? 'done' : ''} ${b !== null && n > b ? 'negative' : ''}`}
>
	<p>{b === null ? '?' : b}</p>
</div>

<style>
	.island {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
	}
	.island.large {
		background-image: url(/large_island.png);
		margin: 12px;
		height: 93px;
		width: 93px;
	}
	.island.small {
		background-image: url(/small_island.png);
		margin: 6px;
		height: 47px;
		width: 47px;
	}
	.island.tiny {
		background-image: url(/small_island.png);
		margin: 6px;
		height: 47px;
		width: 47px;
	}
	.island.large p {
		margin: 0;
		padding-top: 12px;
		padding-right: 3px;
		font-size: 50px;
		text-align: center;
		user-select: none;
	}
	.island.small p {
		margin: 0;
		padding-top: 5px;
		padding-right: 2px;
		font-size: 26px;
		text-align: center;
		user-select: none;
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
	.done {
		color: #df8e00;
	}
	.negative {
		color: #cc0000;
	}
</style>
