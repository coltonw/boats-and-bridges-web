import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	plugins: [ViteYaml(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
