import {spawnSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const configDir=process.env.XDG_CONFIG_HOME||join(tmpdir(),'sozvezdie-sanity-build');
await mkdir(configDir,{recursive:true});
const result=spawnSync(process.execPath,['node_modules/.bin/sanity','build','public/studio','-y'],{stdio:'inherit',env:{...process.env,XDG_CONFIG_HOME:configDir}});
process.exit(result.status??1);
