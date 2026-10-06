import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
// Keep login credentials outside source control and build output.
const result=spawnSync(process.execPath,['node_modules/.bin/sanity',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,XDG_CONFIG_HOME:resolve('.sanity-cli')}});
process.exit(result.status??1);
