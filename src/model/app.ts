import http from 'node:http';

class App {
  public listen(port: number): void {
    const server = this.createServer();
    server.listen(port);
    console.log(`Server started on port: ${port}`)
  }

  public createServer(): http.Server {
    return http.createServer((req, res) => {
      switch(req.method) {
        case 'GET':
          // getReq(req, res);
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
        default:
          res.statusCode = 404;
          res.setHeader('Content-Tyoe', 'application/json');
          res.write(
            JSON.stringify({ message: 'Fuck this task!'})
          );
          res.end();
      }
    });    
  }
}

export { App };
