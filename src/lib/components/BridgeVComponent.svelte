<script lang="ts">
	export let n: number;
</script>

<div class={`bridgeV ${n === 2 ? 'double' : ''}`}></div>

<style>
	.bridgeV {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		margin-left: 27px;
		margin-top: 30px;
		width: 2px;
		height: var(--height, 0);
		border-left: solid black 2px;
	}

	.bridgeV.double {
		border-right: solid black 2px;
	}
</style>
