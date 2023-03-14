import type { AstroIntegration } from 'astro';

import path from 'node:path';
import fs from 'node:fs';
// import { detect } from 'detect-package-manager';
import { execa } from 'execa';

/* ========================================================================== */

interface Settings {
	entryPoint: string;

	/**
	 * @default true
	 */
	watch?: boolean;
}

/* —————————————————————————————————————————————————————————————————————————— */

// HACK: Debounce double server setup (Astro bug?)
let created = false;

export const integration = ({
	entryPoint,
	watch = true,
}: Settings): AstroIntegration => ({
	name: 'sidecar',

	hooks: {
		'astro:server:setup': async (/* { server } */) => {
			if (!entryPoint) throw Error('Please setup the sidecar entrypoint.');
			if (!fs.statSync(entryPoint))
				throw Error(`Incorrect path: ${entryPoint}`);

			if (created) return;
			created = true;

			process.env.NODE_NO_WARNINGS = String(1);

			// const packageManagerCommand = await detect();

			execa(
				/* packageManagerCommand */ 'npx',
				[
					//
					'tsx',
					watch ? 'watch' : '',
					path.join(process.cwd(), entryPoint),
				],
				{
					all: true,
					stdio: 'inherit',
					env: { FORCE_COLOR: String(true) },
				},
			); //.pipeAll?.(process.stdout);

			process.env.NODE_NO_WARNINGS = String(0);
		},
	},
});

export default integration;
