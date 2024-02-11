import * as dotenv from 'dotenv';
import { App } from './model/app';

dotenv.config();
const { PORT } = process.env;

const app = new App();
app.createServer();
app.listen(parseInt(PORT, 10));
