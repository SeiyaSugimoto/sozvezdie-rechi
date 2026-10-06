import assert from 'node:assert/strict';
const origin=new URL(process.argv[2]||'https://sozvezdie-rechi.vercel.app');
for(const path of ['/studio','/studio/structure']){
 const response=await fetch(new URL(path,origin),{signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,200,path);
 assert.equal(response.headers.get('x-frame-options'),null,'Studio must allow Sanity iframe');
 assert(response.headers.get('content-security-policy')?.includes('https://*.sanity.io'),'Sanity frame ancestor missing');
 const html=await response.text();
 assert(html.includes('core.sanity-cdn.com/bridge.js'),'Dashboard bridge missing');
 const asset=html.match(/src="(\/studio\/static\/[^\"]+\.js)"/);
 assert(asset,'Studio asset missing');
 const js=await fetch(new URL(asset[1],origin));assert.equal(js.status,200);
 assert((await js.text()).includes('m0yruyhq'),'Wrong project');
 console.log('PASS',path,'iframe headers, bridge, project and assets');
}
const manifest=await fetch(new URL('/studio/static/create-manifest.json',origin));
assert.equal(manifest.status,200);assert(manifest.headers.get('content-type')?.includes('json'),'Manifest must be JSON');
assert((await manifest.json()).workspaces?.length,'Manifest workspaces missing');
const missing=await fetch(new URL('/studio/static/nonexistent-check.js',origin));assert.equal(missing.status,404);
const home=await fetch(origin);assert.equal(home.headers.get('content-security-policy'),"frame-ancestors 'self';");
const corsOrigin=process.argv[3]||origin.origin;
const cors=await fetch('https://m0yruyhq.api.sanity.io/v1/auth/providers',{headers:{Origin:corsOrigin}});
assert.equal(cors.headers.get('access-control-allow-origin'),corsOrigin);assert.equal(cors.headers.get('access-control-allow-credentials'),'true');
console.log('PASS manifest, missing asset 404, public-site framing policy and credentialed CORS.');
console.log('Dashboard registry and authenticated editing require separate Sanity login verification.');
