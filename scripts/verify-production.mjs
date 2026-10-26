import {spawn} from 'node:child_process';
const port='4198';
const child=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port',port,'--strictPort'],{stdio:['ignore','pipe','pipe'],windowsHide:true});
let startup='';child.stdout.on('data',d=>startup+=d);child.stderr.on('data',d=>startup+=d);
try{
 const deadline=Date.now()+20000;let ready=false;
 while(Date.now()<deadline){if(child.exitCode!==null)throw new Error('Preview exited: '+startup);try{const response=await fetch(`http://127.0.0.1:${port}`);if(response.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,150));}
 if(!ready)throw new Error('Preview did not become ready: '+startup);
 console.log('Production preview ready on '+port);
 const scripts=process.env.WIKCIA_PRODUCT_ONLY==='1'?['scripts/product-acceptance.mjs']:['scripts/acceptance.mjs','scripts/product-acceptance.mjs'];
 for(const script of scripts){
  const test=spawn(process.execPath,[script],{stdio:'inherit',env:{...process.env,WIKCIA_TEST_BASE:`http://127.0.0.1:${port}`},windowsHide:true});
  const exit=await new Promise((resolve,reject)=>{test.once('error',reject);test.once('exit',resolve)});
  if(exit!==0){process.exitCode=exit??1;break;}
 }
}finally{child.kill();}
