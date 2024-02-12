import http from 'node:http';
import { getRequest } from '../controllers/getRequest';
import { postRequest } from '../controllers/postRequest';

class App {
  public listen(port: number): void {
    const server = this.createServer();
    server.listen(port);
    console.log(`Server started on port: ${port}`);
  }

  public createServer(): http.Server {
    return http.createServer(async (req, res) => {
      switch (req.method) {
        case 'GET':
          getRequest(req, res);
          break;
        case 'POST':
          await postRequest(req, res);
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
  function postReq(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }) {
    throw new Error('Function not implemented.');
  }

