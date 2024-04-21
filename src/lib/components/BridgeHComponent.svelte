<script lang="ts">
	export let n: number;
</script>

<div class={`bridgeH ${n === 2 ? 'double' : ''}`}></div>

<style>
	.bridgeH {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		margin-left: 30px;
		margin-top: 27px;
		width: var(--width, 0);
		height: 2px;
		border-top: solid black 2px;
	}

	.bridgeH.double {
		border-bottom: solid black 2px;
	}
</style>
