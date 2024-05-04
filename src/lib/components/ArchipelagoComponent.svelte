<script lang="ts">
	type ArchipelagoProps = {
		size?: 'large' | 'small' | 'tiny';
		id: string;
		completed?: boolean;
	};
	const { size = 'small', completed = false, id }: ArchipelagoProps = $props();
</script>

<div class={`archipelago ${size} ${completed ? 'completed' : ''}`}>
	<p>{id}</p>
</div>

<style>
	.archipelago {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-repeat: no-repeat;
	}

	.archipelago p {
		color: white;
		font-weight: 500;
		text-shadow: black 0.125em 0.125em 0.06em;
	}

	.archipelago.completed {
		opacity: 0.4;
	}

	.archipelago.large {
		background-image: url(/archipelago_large.png);
		margin: 12px;
		height: 60px;
		width: 60px;
	}
	.archipelago.large p {
		font-size: 36px;
	}
	/* .archipelago.small {
		background-image: url(/archipelago_small.png);
    margin: 6px;
		height: 47px;
		width: 47px;
	}
	.archipelago.tiny {
		background-image: url(/archipelago_small.png);
    margin: 3px;
		height: 47px;
		width: 47px;
	} */
</style>
