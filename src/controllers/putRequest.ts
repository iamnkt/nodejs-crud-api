import { IncomingMessage, ServerResponse } from 'node:http';
import { storage, User } from '../storage/storage';
import { parseBody } from '../util/bodyParser';
import { isValidData } from '../util/userValidator';
import { regexV4 } from '../util/uuidRegexp';

const putRequest = async (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  const id = req.url.split('/')[3];

  if (baseUrl === '/api/users/' && !regexV4.test(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('userId is not valid'));
  } else if (baseUrl === '/api/users/' && regexV4.test(id)) {
    res.setHeader('Content-Type', 'application/json');
    const user = storage.getUser(id);

    if (user) {
      try {
        const rawBody = await parseBody(req);
        const body = JSON.parse(rawBody);

        if (body.id) {
          throw new Error();
        };

        body.id = user.id;

        if (isValidData(body)) {
          storage.updateUser(body);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(storage.getUser(id)));
          res.end();
        } else {
          throw new Error();
        }
      } catch(err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body is not valid' }));
      }
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify('User with provided userId is not found'));
      res.end();
    }
  }
};

export { putRequest };
