import http from 'node:http';
import { getRequest } from '../controllers/getRequest';

class App {
  public listen(port: number): void {
    const server = this.createServer();
    server.listen(port);
    console.log(`Server started on port: ${port}`);
  }

  public createServer(): http.Server {
    return http.createServer((req, res) => {
      switch (req.method) {
        case 'GET':
          getRequest(req, res);
          break;
        case 'POST':
          // postReq(req, res);
          break;
        case 'PUT':
          // putReq(req, res);
          break;
        case 'DELETE':
          // deleteReq(req, res);
          break;
      }
    });
  }
}

export { App };
