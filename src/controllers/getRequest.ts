import { IncomingMessage, ServerResponse } from 'node:http';
import { storage } from '../storage/storage';
import { regexV4 } from '../util/uuidRegexp';

const getRequest = (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  const id = req.url.split('/')[3];

  if (req.url === '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(storage.getUsers()));
    res.end();
  } else if (baseUrl === '/api/users/' && !regexV4.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('userId is not valid'));
  } else if (baseUrl === '/api/users/' && regexV4.test(id)) {
    res.setHeader('Content-Type', 'application/json');
    const user = storage.getUser(id);

    if (user) {
      res.statusCode = 200;
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify('User with provided userId was not found'));
      res.end();
    }
  }
};

export { getRequest };
