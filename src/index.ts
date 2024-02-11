import * as dotenv from 'dotenv';
import { App } from './model/app';
import { DataStorage } from './storage/storage';

dotenv.config();
const PORT = process.env.PORT;

export const storage = new DataStorage();

const app = new App();
app.listen(parseInt(PORT));
