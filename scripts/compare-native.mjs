import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const src=JSON.parse(readFileSync(new URL('google/gtm-foundation-import.json',root))).containerVersion;
const native=JSON.parse(readFileSync(new URL('google/gtm-native-version-2-2026-11-04.json',root))).containerVersion;
const sorted=x=>JSON.stringify(normalize(x));
function normalize(x){if(Array.isArray(x))return x.map(normalize).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));if(x&&typeof x==='object')return Object.fromEntries(Object.keys(x).sort().map(k=>[k,normalize(x[k])]));return typeof x==='string'?x.trim():x;}
const triggerNames=v=>Object.fromEntries(v.trigger.map(t=>[t.triggerId,t.name]));
for(const type of ['tag','trigger','variable','builtInVariable','gtagConfig']){
 assert.equal(native[type].length,src[type].length,type+' count');
 for(const expected of src[type]){
  const match=native[type].find(x=>type==='gtagConfig'?x.type===expected.type:x.name===expected.name);
  assert.ok(match,type+' '+expected.name);
  for(const key of Object.keys(expected)){
   if(['accountId','containerId','tagId','triggerId','variableId','gtagConfigId','fingerprint'].includes(key))continue;
   if(key==='firingTriggerId'){
    assert.deepEqual(expected[key].map(id=>triggerNames(src)[id]).sort(),match[key].map(id=>triggerNames(native)[id]).sort());
   }else assert.equal(sorted(match[key]),sorted(expected[key]),type+' '+(expected.name||expected.type)+' '+key);
  }
 }
}
console.log('PASS: native GTM export matches every supplied variable, tag parameter, trigger condition and setting (IDs remapped by GTM).');


