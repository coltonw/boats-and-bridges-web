<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
	let { children } = $props();
</script>

<svelte:head>
	<title>Boats and Bridges</title>
</svelte:head>

{@render children()}
