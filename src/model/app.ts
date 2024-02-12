import http from 'node:http';
import { deleteRequest } from '../controllers/deleteRequest';
import { getRequest } from '../controllers/getRequest';
import { postRequest } from '../controllers/postRequest';
import { putRequest } from '../controllers/putRequest';

class App {
  public listen(port: number): void {
    const server = this.createServer();
    server.listen(port);
    console.log(`Server started on port: ${port}`);
  }

  public createServer(): http.Server {
    return http.createServer(async (req, res) => {
      try {
        switch (req.method) {
          case 'GET':
            getRequest(req, res);
            break;
          case 'POST':
            await postRequest(req, res);
            break;
          case 'PUT':
            await putRequest(req, res);
            break;
          case 'DELETE':
            deleteRequest(req, res);
            break;
          default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify('Route not found'));
            res.end();
        }
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify('Something went wrong on a server'));
        res.end();
      }
    });
  }
}

export { App };
