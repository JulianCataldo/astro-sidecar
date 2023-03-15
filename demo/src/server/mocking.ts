import kleur from 'kleur';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { MOCK_API_DEV_PORT, MOCK_API_DEV_URL } from '../../consts.js';

console.log(kleur.bold().red('Starting sidecar: REST API mocking server…'));
console.log(kleur.cyan(MOCK_API_DEV_URL));

const fastify = Fastify({
	// logger: true,
});

await fastify.register(cors, {
	origin: '*',
	methods: ['GET', 'POST'],
});

fastify.get('/', function (request, reply) {
	console.log(
		kleur.bold().green(`REST API request from: ${JSON.stringify(request.ip)}`),
	);

	reply.send({ hello: 'world' });
});

fastify.listen({ port: MOCK_API_DEV_PORT }, function (err, _address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
