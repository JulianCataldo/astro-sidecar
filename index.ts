import type { AstroIntegration } from 'astro';

import path from 'node:path';
import fs from 'node:fs';

import concurrently from 'concurrently';

/* ========================================================================== */

interface Settings {
	entryPoints: string[];

	/**
	 * @default true
	 */
	watch?: boolean;
}

/* —————————————————————————————————————————————————————————————————————————— */

// HACK: Debounce double server setup (Astro bug?)
let created = false;

export const integration = ({
	entryPoints,
	watch = true,
}: Settings): AstroIntegration => ({
	name: 'sidecar',

	hooks: {
		'astro:server:setup': async (/* { server } */) => {
			if (!Array.isArray(entryPoints))
				throw Error('Please setup the sidecar entrypoint.');

			if (created) return;
			created = true;

			process.env.NODE_NO_WARNINGS = String(1);

			const { result } = concurrently(
				entryPoints.map((entryPoint) => {
					if (!fs.statSync(entryPoint))
						throw Error(`Incorrect path: ${entryPoint}`);

					return {
						command: `tsx watch ${entryPoint}`,
						name: path.basename(entryPoint, path.extname(entryPoint)),
					};
				}),
				{
					prefix: 'name',
					killOthers: ['failure', 'success'],
					restartTries: 3,
				},
			);
			result
				.then((r) => {
					// console.log(r);
				})
				.catch((e) => {
					console.error(e);
				});

			process.env.NODE_NO_WARNINGS = String(0);
		},
	},
});

export default integration;
