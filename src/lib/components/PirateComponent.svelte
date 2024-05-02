<script lang="ts">
	type PirateProps = {
		size?: 'large' | 'small' | 'tiny';
	};
	const { size = 'small' }: PirateProps = $props();
</script>

<div class={`pirate ${size}`}></div>

<style>
	.pirate {
		position: absolute;
		z-index: 5;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		pointer-events: none;
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
		width: 18px;
		height: 20px;
	}
</style>
