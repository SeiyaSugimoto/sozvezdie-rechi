import {spawnSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const configDir=process.env.XDG_CONFIG_HOME||join(tmpdir(),'sozvezdie-sanity-build');
await mkdir(configDir,{recursive:true});
for(const args of [['build','public/studio','-y'],['manifest','extract','--path','public/studio/static']]){
 const result=spawnSync(process.execPath,['node_modules/.bin/sanity',...args],{stdio:'inherit',env:{...process.env,XDG_CONFIG_HOME:configDir}});
 if(result.status!==0)process.exit(result.status??1);
}
