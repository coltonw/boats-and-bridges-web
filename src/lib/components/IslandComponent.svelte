<script lang="ts">
	type IslandProps = {
		b: number | null;
		n: number;
		selected?: boolean;
	};
	const { n, b, selected }: IslandProps = $props();
</script>

<div
	class={`island ${selected ? 'selected' : ''} ${n === b ? 'done' : ''} ${b !== null && n > b ? 'negative' : ''}`}
>
	{b === null ? '?' : b}
</div>

<style>
	.island {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		background-color: #d8bd6d;
		border: 3px solid #96fffa;
		border-top-width: 1px;
		border-bottom-width: 4px;
		height: 30px;
		width: 30px;
		margin: 14px 12px 11px;
		text-align: center;
		font-size: 26px;
		user-select: none;
		border-radius: 100%;
	}
	.selected:before {
		content: ' ';
		position: absolute;
		z-index: -1;
		top: -8px;
		left: -10px;
		right: -10px;
		bottom: -11px;
		border: 3px solid white;
		border-radius: 100%;
	}
	.done {
		color: #a7882d;
	}
	.negative {
		color: #cc0000;
	}
</style>
