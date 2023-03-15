import { defineConfig } from 'astro/config';
import astroSidecar from 'astro-sidecar';

// https://astro.build/config
export default defineConfig({
	server: {
		port: 5000,
	},
	integrations: [
		//
		astroSidecar({
			entryPoints: [
				//
				'./src/server/websocket.ts',
				'./src/server/mocking.ts',
			],
		}),
	],
});
