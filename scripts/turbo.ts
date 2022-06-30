import yArgs from '@umijs/utils/compiled/yargs-parser';
import spawn from 'cross-spawn';
import { join } from 'path';

(
 async () => {
  const args = yArgs(process.argv.slice(2))
  const scope = args.scope || '!@example/*';
  const extra = (args._ || []).join(' ');

  await turbo({
    cmd: args.cmd,
    scope,
    extra,
    cache: args.cache,
    parallel: args.parallel,
  })
 }
)()

async function cmd(command:string) {
  const result = spawn.sync(command, {
    stdio: 'inherit',
    shell: true,
    cwd: join(__dirname, '../'),
  });
  if (result.status !== 0) {
    // sub package command don't stop when execute fail.
    // display exit
    console.error(`Execute command error (${command})`)
    process.exit(1);
  }
  return result;
}


async function turbo(opts:{
  scope: string;
  cmd: string;
  extra?: string;
  cache?: boolean;
  parallel?: boolean;
}) {
  const extraCmd = opts.extra ? `-- -- ${opts.extra}` : '';
  const cacheCmd = opts.cache === false ? '--no-cache --force' : '';
  const parallelCmd = opts.parallel ? '--parallel' : '';

  const options = [
    opts.cmd,
    `--cache-dir=".turbo"`,
    `--scope="${opts.scope}"`,
    `--no-deps`,
    `--include-dependencies`,
    cacheCmd,
    parallelCmd,
    extraCmd,
  ]
    .filter(Boolean)
    .join(' ');

  return cmd(`turbo run ${options}`);
}