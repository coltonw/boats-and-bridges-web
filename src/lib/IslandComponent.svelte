<script lang="ts">
	export let number: number;
</script>

<div class="island">{number}</div>

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
</style>
