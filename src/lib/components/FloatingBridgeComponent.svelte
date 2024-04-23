<div class="bridge"></div>

<style>
	.bridge {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		transform-origin: left center;
		transform: rotate(var(--rotate));
		width: var(--width, 0);
		height: 2px;
		border-top: solid black 2px;
		pointer-events: none;
	}
</style>
