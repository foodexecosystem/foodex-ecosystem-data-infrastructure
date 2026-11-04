import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url), src=JSON.parse(readFileSync(new URL('google/gtm-variables.json',root),'utf8'));
let count=0;const eq=(a,b)=>{assert.deepEqual(a,b);count++;};
function run(name,over={},doc={}) {
 const url=over['Page URL']||'https://foodexecosystem.com/';
 const vals={'Page URL':url,'Page Path':new URL(url).pathname,'Event':'gtm.linkClick','Referrer':'',...over};
 const document={title:'Page title',cookie:'',documentElement:{lang:'en'},...doc};
 function get(k){if(Object.hasOwn(vals,k))return vals[k];if(!src[k])return undefined;return Function('get','document','URL','return ('+src[k].replace(/\{\{([^}]+)\}\}/g,(_,x)=>'get('+JSON.stringify(x.trim())+')')+')();')(get,document,URL);}
 return get(name);
}
const page=(n,p)=>run('FXE | Page | '+n,{'Page URL':'https://foodexecosystem.com'+p});
for(const v of Object.values(src)){assert.doesNotThrow(()=>Function('return ('+v.replace(/\{\{[^}]+\}\}/g,'undefined')+');'));count++;}
for(const u of ['https://foodexecosystem.com/','https://www.foodexecosystem.com/contact-us'])eq(run('FXE | Page | Allowed',{'Page URL':u}),true);
for(const u of ['http://foodexecosystem.com/','https://foodexecosystem.com.evil.test/','https://foodexecosystem.ir/','https://foodexecosystem.com:3000/','https://user:secret@foodexecosystem.com/','https://foodexecosystem.com/admin','https://foodexecosystem.com/en/api/x','https://foodexecosystem.com/auth','https://foodexecosystem.com/fa/login','https://foodexecosystem.com/_next/x'])eq(run('FXE | Page | Allowed',{'Page URL':u}),false);
for(const [p,type,group] of [['/','home','corporate'],['/about-us','about','corporate'],['/contact-us/','contact','corporate'],['/faq','faq','corporate'],['/privacy','policy','policies'],['/policies','policy','policies'],['/terms','policy','policies'],['/confidentiality','policy','policies'],['/en','home','corporate'],['/fa/contact-us','contact','corporate'],['/admin','admin','admin'],['/unknown','other','other']]){eq(page('Page type',p),type);eq(page('Content group',p),group);}
eq(page('Content language','/'),'en');eq(page('Content language','/fa/about-us'),'fa');eq(page('Content language','/ar'),'ar');
eq(run('FXE | Page | Content language',{}, {documentElement:{lang:'fa-IR'}}),'fa');
eq(run('FXE | Page | Content language',{}, {documentElement:{lang:'de'}}),'other');
for(const [href,result] of [['https://foodexiran.com/en/services','consultant'],['https://foodexiran.com/services/a','consultant'],['https://foodexiran.com/','iran'],['https://www.foodexiran.com/en/blog/a','iran'],['https://foodexdigital.com/','digital'],['https://foodex.digital/','digital'],['https://foodextrade.com/','trade'],['https://foodextrade.com.evil.test/',undefined],['https://foodextrade.com:444/',undefined],['http://foodextrade.com/',undefined],['javascript:alert(1)',undefined],['/contact-us?service=foodex-consultant',undefined],['https://u:p@foodextrade.com/',undefined]])eq(run('FXE | Link | Destination group',{'Click URL':href}),result);
for(const [href,result] of [['mailto:public@example.com','email'],['tel:+123','phone'],['https://wa.me/123','whatsapp'],['https://api.whatsapp.com/send?phone=123','whatsapp'],['https://web.whatsapp.com/send','whatsapp'],['https://wa.me.evil.test/',undefined],['http://wa.me/123',undefined],['https://wa.me:3000/123',undefined],['/contact-us',undefined]])eq(run('FXE | Link | Contact method',{'Click URL':href}),result);
for(const where of ['header','footer','main','other'])eq(run('FXE | Link | Position',{'Click Element':{closest:s=>s===where?{}:null}}),where);
eq(run('FXE | Link | Position'),'other');
for(const cookie of ['fxe_staff=1','x=0; fxe_staff=1; y=2'])eq(run('FXE | Traffic | Staff marker',{}, {cookie}),'internal');
for(const cookie of ['','not_fxe_staff=1','fxe_staff=10','fxd_staff=1'])eq(run('FXE | Traffic | Staff marker',{}, {cookie}),undefined);
const message={'Event':'fx_page_ready','FXE | DLV | Page location':'https://foodexecosystem.com/','FXE | DLV | Page title':'Page title','FXE | DLV | Page referrer':''};
eq(run('FXE | Page | Message valid',message),true);
for(const change of [{'FXE | DLV | Page location':'https://evil.test/'},{'FXE | DLV | Page location':'https://foodexecosystem.com/about-us'},{'FXE | DLV | Page location':'https://foodexecosystem.com/?service=foodex-consultant'},{'FXE | DLV | Page title':''},{'FXE | DLV | Page title':'old title'},{'FXE | DLV | Page title':'x'.repeat(301)},{'FXE | DLV | Page referrer':undefined},{'FXE | DLV | Page referrer':'x'.repeat(2049)}])eq(run('FXE | Page | Message valid',{...message,...change}),false);
for(const [url,want] of [
 ['https://foodexecosystem.com/?email=a%40b.test&token=secret&utm_source=campaign#private','https://foodexecosystem.com/?utm_source=campaign'],
 ['https://foodexecosystem.com/contact-us?service=foodex-consultant&message=hello','https://foodexecosystem.com/contact-us?service=foodex-consultant'],
 ['https://foodexecosystem.com/?utm_term=name%40example.com&utm_content=989123456789','https://foodexecosystem.com/'],
 ['https://foodexecosystem.com/?utm_campaign=launch-2026&utm_medium=email','https://foodexecosystem.com/?utm_medium=email&utm_campaign=launch-2026'],
 ['https://evil.test/?utm_source=a',undefined],
 ['https://u:p@foodexecosystem.com/',undefined]
])eq(run('FXE | Page | Safe location',{'Page URL':url}),want);
eq(run('FXE | Page | Safe referrer',{'Referrer':'https://search.test/private?token=a#b'}),'https://search.test/');
eq(run('FXE | Page | Safe referrer',{'Referrer':'https://foodexecosystem.com/about-us?email=a#b'}),'https://foodexecosystem.com/about-us');
eq(run('FXE | Page | Safe referrer',{'Referrer':'javascript:alert(1)'}),'');
for(const [url,id,want] of [['https://foodexecosystem.com/','node-eoi-form',true],['https://foodexecosystem.com/contact-us','contact-form',true],['https://foodexecosystem.com/fa/contact-us/','contact-form',true],['https://foodexecosystem.com/','contact-form',false],['https://foodexecosystem.com/contact-us','node-eoi-form',false],['https://foodexecosystem.com/admin','contact-form',false],['https://evil.test/','node-eoi-form',false],['https://foodexecosystem.com/','unknown',false]])eq(run('FXE | Form | Lead allowed',{'Page URL':url,'FXE | DLV | Form ID':id}),want);
const payload=JSON.parse(readFileSync(new URL('google/gtm-foundation-import.json',root),'utf8')).containerVersion;
eq(payload.container.publicId,'GTM-WSNCPQCX');eq(payload.tag.length,5);eq(payload.trigger.length,5);eq(payload.variable.length,16);eq(payload.gtagConfig.length,2);
const known=new Set([...payload.variable.map(x=>x.name),...payload.builtInVariable.map(x=>x.name),'_event']);
for(const item of [...payload.tag,...payload.trigger,...payload.variable])for(const m of JSON.stringify(item).matchAll(/\{\{([^}]+)\}\}/g)){assert.ok(known.has(m[1]),m[1]);count++;}
const contact=payload.tag.find(t=>t.name==='FXE | GA4 | Contact click');
assert.ok(!JSON.stringify(contact).includes('Click URL'));count++;
const base=payload.tag.find(t=>t.name==='FXE | GA4 | Base');
assert.ok(JSON.stringify(base).includes('"value":"false"'));count++;
for(const v of payload.gtagConfig.find(x=>x.type==='ogt_auto_events').parameter)eq(v.value,'false');
console.log('PASS: '+count+' checks (logic, negative cases, URL privacy, allowed forms/destinations and reference integrity). Offline only; live QA still required.');

