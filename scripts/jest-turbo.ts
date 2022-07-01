import spawn from 'cross-spawn';
import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  EXAMPLES: join(ROOT, './examples'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
  JEST_TURBO_CONFIG: join(ROOT, './jest.turbo.config.ts'),
  JEST_CONFIG: join(ROOT, './jest.config.ts')
} as const;

(async () => {
  await spawn.sync('jest -c ${PATHS.JEST_CONFIG}', {
    cwd: process.cwd(),
  });
})();
