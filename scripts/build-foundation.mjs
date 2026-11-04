import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const accountId='6402453283', containerId='285168513', publicId='GTM-WSNCPQCX';
const destination='G-E667121MXL';
const code=JSON.parse(readFileSync(new URL('google/gtm-variables.json',root),'utf8'));
const p=(key,value,type='TEMPLATE')=>({type,key,value:String(value)});
const list=(key,values)=>({type:'LIST',key,list:Object.entries(values).map(([parameter,parameterValue])=>({type:'MAP',map:[p('parameter',parameter),p('parameterValue',parameterValue)]}))});
const condition=(variable,value,type='EQUALS')=>({type,parameter:[p('arg0',variable),p('arg1',value)]});
const scoped=[condition('{{FXE | Page | Allowed}}','true')];
const entity=(id,name,type,extra={})=>({accountId,containerId,name,type,...extra});
const variable=[];
for(const [name,src] of Object.entries(code))variable.push({...entity('',name,'jsm'),variableId:String(100+variable.length),parameter:[p('javascript',src)]});
for(const [name,key] of [['Page location','fx_page_location'],['Page title','fx_page_title'],['Page referrer','fx_page_referrer'],['Form ID','form_id']])variable.push({...entity('','FXE | DLV | '+name,'v'),variableId:String(100+variable.length),parameter:[p('dataLayerVersion',2,'INTEGER'),p('setDefaultValue',false,'BOOLEAN'),p('name',key)]});
const trigger=[
 {...entity('','FXE | Init | Public site','INIT'),triggerId:'200',filter:scoped},
 {...entity('','FXE | CE | Page ready','CUSTOM_EVENT'),triggerId:'201',customEventFilter:[condition('{{_event}}','fx_page_ready')],filter:[...scoped,condition('{{FXE | Page | Message valid}}','true')]},
 {...entity('','FXE | Click | Contact links','LINK_CLICK'),triggerId:'202',filter:[...scoped,condition('{{FXE | Link | Contact method}}','^(phone|email|whatsapp)$','MATCH_REGEX')],waitForTags:{type:'BOOLEAN',value:'false'},checkValidation:{type:'BOOLEAN',value:'false'},waitForTagsTimeout:{type:'TEMPLATE',value:'2000'}},
 {...entity('','FXE | Click | Ecosystem destination','LINK_CLICK'),triggerId:'203',filter:[...scoped,condition('{{FXE | Link | Destination group}}','^(consultant|iran|digital|trade)$','MATCH_REGEX')],waitForTags:{type:'BOOLEAN',value:'false'},checkValidation:{type:'BOOLEAN',value:'false'},waitForTagsTimeout:{type:'TEMPLATE',value:'2000'}},
 {...entity('','FXE | CE | Verified form success','CUSTOM_EVENT'),triggerId:'204',customEventFilter:[condition('{{_event}}','fx_form_success')],filter:[...scoped,condition('{{FXE | Form | Lead allowed}}','true')]}
];
const context={content_group:'{{FXE | Page | Content group}}',content_language:'{{FXE | Page | Content language}}',page_type:'{{FXE | Page | Page type}}',page_location:'{{FXE | Page | Safe location}}'};
const tag=[{...entity('','FXE | GA4 | Base','dest_ga'),tagId:'300',parameter:[p('destinationId',destination),list('configSettingsTable',{send_page_view:'false',traffic_type:'{{FXE | Traffic | Staff marker}}',allow_google_signals:'false',allow_ad_personalization_signals:'false',page_location:'{{FXE | Page | Safe location}}',page_referrer:'{{FXE | Page | Safe referrer}}'})],firingTriggerId:['200'],tagFiringOption:'ONCE_PER_EVENT'}];
const addTag=(id,name,event,triggerId,values)=>tag.push({...entity('',name,'gaawe'),tagId:id,parameter:[p('sendEcommerceData',false,'BOOLEAN'),list('eventSettingsTable',values),p('eventName',event),p('measurementIdOverride',destination)],firingTriggerId:[triggerId],tagFiringOption:'ONCE_PER_EVENT'});
addTag('301','FXE | GA4 | Page view','page_view','201',{...context,page_title:'{{FXE | DLV | Page title}}',page_referrer:'{{FXE | Page | Safe referrer}}'});
addTag('302','FXE | GA4 | Contact click','contact_click','202',{...context,contact_method:'{{FXE | Link | Contact method}}',link_position:'{{FXE | Link | Position}}'});
addTag('303','FXE | GA4 | Ecosystem navigation','ecosystem_navigation_click','203',{...context,destination_group:'{{FXE | Link | Destination group}}',link_position:'{{FXE | Link | Position}}'});
addTag('304','FXE | GA4 | Form success','generate_lead','204',{...context,form_id:'{{FXE | DLV | Form ID}}'});
const gtagConfig=[
 {...entity('','','ogt_auto_events'),gtagConfigId:'400',parameter:[p('enableOutboundClick',false,'BOOLEAN'),p('enableScroll',false,'BOOLEAN'),p('enableDownload',false,'BOOLEAN'),p('enableHistoryEvents',false,'BOOLEAN'),p('enableForm',false,'BOOLEAN'),p('enableVideo',false,'BOOLEAN')]},
 {...entity('','','ogt_1p_data_v2'),gtagConfigId:'401',parameter:[p('isEnabled',false,'BOOLEAN')]}
];
for(const c of gtagConfig)delete c.name;
const builtInVariable=[['PAGE_URL','Page URL'],['PAGE_HOSTNAME','Page Hostname'],['PAGE_PATH','Page Path'],['REFERRER','Referrer'],['EVENT','Event'],['CLICK_ELEMENT','Click Element'],['CLICK_URL','Click URL']].map(([type,name])=>entity('',name,type));
const payload={exportFormatVersion:2,containerVersion:{accountId,containerId,containerVersionId:'0',container:{accountId,containerId,name:'foodexecosystem.com',publicId,usageContext:['WEB']},tag,trigger,variable,builtInVariable,gtagConfig}};
mkdirSync(new URL('google/',root),{recursive:true});
writeFileSync(new URL('google/gtm-variables.json',root),JSON.stringify(code,null,2)+'\n');
writeFileSync(new URL('google/gtm-foundation-import.json',root),JSON.stringify(payload,null,2)+'\n');
console.log(JSON.stringify({tags:tag.length,triggers:trigger.length,variables:variable.length,settings:gtagConfig.length}));

