import { cpus } from 'node:os';
import cluster from 'node:cluster';
import http from 'node:http';
import { listenSingleNodeApp } from './singleNodeAppCreator';

const cpuCount = cpus().length;
let requestIteration = 0;

const getNextPort = (port: number) => {
  requestIteration = requestIteration === cpuCount ? 1 : requestIteration + 1;

  return port + requestIteration;
};

const createBalanceServer = (port: number) => {
  http.createServer((req, res) => {
    const nextPortForRequest = getNextPort(port);

    const options = {
      hostname: 'localhost',
      port: nextPortForRequest,
      path: req.url,
      headers: req.headers,
      method: req.method,
    };

    req.pipe(
      http.request(options, (response) => {
        res.writeHead(response.statusCode!, response.headers);
        response.pipe(res);
      }),
    );
  }).listen(port);
};

const listenMultiNodeApp = (port: number) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    createBalanceServer(port);
    console.log(`Balance server started on port ${port}`);
  } else {
    const workerPort = port + cluster.worker!.id;
    listenSingleNodeApp(workerPort);
  }
};

export { listenMultiNodeApp };
