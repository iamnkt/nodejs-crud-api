import * as dotenv from 'dotenv';
import { listenMultiNodeApp } from './model/multiNodeAppCreator';
import { listenSingleNodeApp } from './model/singleNodeAppCreator';

dotenv.config();
const { PORT } = process.env;

(process.argv.slice(2).join('') === '--multi-node')
  ? listenMultiNodeApp(parseInt(PORT, 10))
  : listenSingleNodeApp(parseInt(PORT, 10));
