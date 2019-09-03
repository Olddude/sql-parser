// inversify typescript express hal api seed
import http from 'http';
import app from './src/webapi/app';

const server = http.createServer(app);

const port = process.env.PORT || 1337;
server.listen(port);

console.log('Server running at http://localhost:%d', port);
