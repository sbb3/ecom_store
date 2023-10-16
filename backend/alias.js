import moduleAlias from 'module-alias';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(new URL(import.meta.url).pathname);

moduleAlias.addAlias('@root', __dirname);
