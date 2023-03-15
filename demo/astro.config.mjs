import { defineConfig } from 'astro/config';
import sidecar from 'astro-sidecar';

// https://astro.build/config
export default defineConfig({
	server: {
		port: 5000,
	},

	integrations: [
		//
		sidecar({
			entryPoints: [
				//
				'./src/server/websocket.ts',
				'./src/server/mocking.ts',
			],
		}),
	],
});
