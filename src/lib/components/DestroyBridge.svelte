<script lang="ts">
	import IconTrash from 'virtual:icons/ion/trash-bin';
	type DestroyProps = {
		size?: 'large' | 'medium' | 'small' | 'tiny';
	};
	const { size = 'small' }: DestroyProps = $props();
</script>

<div class={`destroy ${size}`}>
	<IconTrash class="icon-destroy" />
</div>

<style>
	.destroy {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		background-repeat: no-repeat;
		transition: filter 0.3s;
		pointer-events: none;
	}

	/* large: 22,
	medium: 15,
	small: 11,
	tiny: 6 */
	:global(.icon-destroy) {
		vertical-align: middle;
		font-size: 2em;
		color: white;
		filter: drop-shadow(0.125em 0.125em 0.06em rgba(0, 0, 0, 1));
	}

	.destroy.large {
		margin-left: 28px;
		margin-top: 24px;
		font-size: 24px;
	}
	.destroy.medium {
		margin-left: 16px;
		margin-top: 14px;
		font-size: 18px;
	}
	.destroy.small {
		margin: 10px;
		font-size: 14px;
	}
	.destroy.tiny {
		margin: 4px;
		font-size: 10px;
	}
</style>
