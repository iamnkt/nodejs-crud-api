import { IncomingMessage } from 'node:http';

const parseBody = async (req: IncomingMessage): Promise<string> => await new Promise((resolve, reject) => {
  const chunks: Uint8Array[] = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    resolve(Buffer.concat(chunks).toString());
  });

  req.on('error', (error) => {
    reject(error);
  });
});

export { parseBody };
