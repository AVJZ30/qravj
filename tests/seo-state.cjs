const fs=require('fs'),vm=require('vm'),assert=require('assert');
function test(search='',hash=''){
 const state={robots:{content:''},canonical:{removed:false,remove(){this.removed=true}},json:{removed:false,remove(){this.removed=true}},classes:[]};
 const context={location:{search,hash},URLSearchParams,window:{},document:{documentElement:{classList:{add:x=>state.classes.push(x)}},querySelector:s=>s.includes('robots')?state.robots:s.includes('canonical')?state.canonical:state.json}};
 vm.runInNewContext(fs.readFileSync('public/seo-state.js','utf8'),context);return {state,update:context.window.avjIndexingState};
}
let t=test();assert(t.state.robots.content.startsWith('index'));t.update(true);assert(t.state.robots.content.startsWith('noindex'));t.update(false);assert(t.state.robots.content.startsWith('index'));
t=test('?q=');assert(t.state.robots.content.startsWith('noindex'));assert(t.state.canonical.removed);assert(t.state.json.removed);assert(t.state.classes.includes('qr-redirect'));t.update(false);assert(t.state.robots.content.startsWith('noindex'));
t=test('','#access_token=test');assert(t.state.robots.content.startsWith('noindex'));
const qrcode=require('../public/vendor/qrcode.js');for(const url of ['https://example.com/catalogo','https://qravj.netlify.app/?q='+'a'.repeat(32)]){const qr=qrcode(0,'M');qr.addData(url,'Byte');qr.make();assert(qr.getModuleCount()>20);assert(qr.createSvgTag({cellSize:6,margin:24,scalable:true}).includes('<svg'));}
console.log('PASS: public/session/logout/callback/query robots transitions; real QR library generates static and dynamic SVG matrices. No browser or Supabase E2E claim.');
