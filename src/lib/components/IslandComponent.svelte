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
	.island p {
		position: relative;
		z-index: 10;
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
		background-image: url(/island_small.png);
		margin: 6px;
		height: 47px;
		width: 47px;
	}
	.island.large p {
		margin: 0;
		padding-right: 5px;
		font-size: 54px;
		text-align: center;
		user-select: none;
	}
	.island.small p {
		margin: 0;
		padding-right: 2px;
		font-size: 28px;
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
