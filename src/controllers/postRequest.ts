import { IncomingMessage, ServerResponse } from 'node:http';
import { storage, User } from '../storage/storage';
import { parseBody } from '../util/bodyParser';
import crypto from 'node:crypto';
import { isValidData } from '../util/userValidator';

const postRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/users') {
    try {
      const rawBody = await parseBody(req);
      const body = JSON.parse(rawBody);

      if (body.id) {
        throw new Error();
      }
      body.id = crypto.randomUUID();

      if (isValidData(body)) {
        storage.createUser(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(body));
        res.end();
      } else {
        throw new Error();
      }
    } catch(err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Request body is not valid' }));
    }
  }
};

export { postRequest };
