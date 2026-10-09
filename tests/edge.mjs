import fs from 'node:fs';import assert from 'node:assert/strict';
const code=fs.readFileSync('netlify/edge-functions/qr-indexing.js','utf8');const {default:edge}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
for(const query of ['?q=abc','?utm_source=test&q=','?q=invalid']){const res=await edge(new Request('https://qravj.netlify.app/'+query),{next:async()=>new Response('original-body',{headers:{'content-type':'text/html'}})});assert.equal(await res.text(),'original-body');assert.equal(res.headers.get('x-robots-tag'),'noindex, nofollow, nosnippet');assert.equal(res.headers.get('cache-control'),'private, no-store');}
assert.equal(await edge(new Request('https://qravj.netlify.app/?utm_source=test'),{}),undefined);
console.log('PASS: noindex query handling, unchanged body and public request bypass. Unit test; not a Netlify deployment.');
