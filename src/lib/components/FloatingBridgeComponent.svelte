<div class="bridge">
	<div class="inner"></div>
</div>

<style>
	.bridge {
		position: absolute;
		left: var(--left, 0);
		top: var(--top, 0);
		padding-left: 14px;
		transform-origin: left center;
		transform: rotate(var(--rotate));
		width: var(--width, 0);
		height: 4px;
		pointer-events: none;
		box-sizing: border-box;
	}
	.inner {
		width: auto;
		height: 4px;
		background-image: url(/small_bridge_hor.png);
	}
</style>
