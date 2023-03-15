import kleur from 'kleur';

import { Server } from 'socket.io';
import { WEB_SOCKET_DEV_PORT, WEB_SOCKET_DEV_URL } from '../../consts.js';

console.log(kleur.bold().cyan('Starting sidecar: WebSocket server…'));
console.log(kleur.cyan(WEB_SOCKET_DEV_URL));

const ioServer = new Server(WEB_SOCKET_DEV_PORT, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const sequenceNumberByClient = new Map();

ioServer.on('connection', (socket) => {
	console.info(kleur.yellow(`Client connected [id=${socket.id}]`));

	sequenceNumberByClient.set(socket, 1);

	socket.on('disconnect', () => {
		sequenceNumberByClient.delete(socket);
		console.info(`Client gone [id=${socket.id}]`);
	});
});

setInterval(() => {
	for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
		client.emit('seq-num', sequenceNumber);
		sequenceNumberByClient.set(client, sequenceNumber + 1);

		console.log(kleur.green(`Sending \`seq-num\`: ${sequenceNumber}…`));
	}
}, 2000);
