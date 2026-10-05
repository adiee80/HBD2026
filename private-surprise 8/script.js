/* ===== EDIT THESE ===== */
const CONFIG={
  passkey:'2026',
  name:'Tunuu',
  from:'2005-10-06',           // birth date
  to:'2026-10-06',             // end date for the day count (also used for the age shown)
  greeting:'janamdin mubarak ho, meri pyaari Tunuu 💗',
  message:"I don’t know how to put everything I feel for you into a few words, but I still want to try.\n\nYou have become such a beautiful part of my life that sometimes I wonder how my days were before you. It’s not just the big things about you that I love. It’s the little things too—your random talks, your silly reactions, the way you get annoyed over small things, and even those moments when you don’t say much but I still somehow know what’s going on in your mind.\n\nYou have this special way of making an ordinary day feel a little better. Even a small conversation with you can change my mood. And honestly, I love how comfortable I can be around you. I don’t have to pretend to be someone else, because with you, I can just be me.\n\nThere will obviously be days when we annoy each other, misunderstand each other, or argue over completely stupid things 😂. But even then, I never want us to forget how much we mean to each other. I want us to keep choosing each other, even on the difficult days.\n\nI want to be the person you can talk to when you’re happy, sad, angry, confused, or simply having one of those “I don’t know what’s wrong with me” days. 😭😂\nI want to celebrate your smallest victories, listen to your endless stories, make you laugh when you don’t feel like smiling, and stand beside you when things aren’t going your way.\n\nAnd yes, I may not always say it perfectly, but please remember this—you are genuinely very special to me.\n\nThank you for being patient with me, for understanding me, for caring about me, and most importantly, for being you.\n\nI don’t know exactly what the future will look like, but I know one thing—I want to make a lot of beautiful memories with you. More stupid jokes, more random conversations, more fights that we’ll laugh about later, more pictures, more adventures, and hopefully a lot more “us”. ❤️\n\nSo if you ever doubt how much you mean to me, read this again.\n\nYou’re not just someone I love.\nYou’re someone whose presence has made my life a little happier, a little crazier, and a lot more meaningful. ❤️\n\nAlways stay the same crazy, cute and wonderful girl that you are.\n\nAnd yes… unfortunately for you, you’re stuck with me now. 😂❤️",
  signoff:'Yours,\nAlways ❤️',
  wishes:[
    ['🎂','May every candle you blow out light up a new blessing in your life, Tunuu.'],
    ['🌟','22 looks amazing on you. Here\'s to bigger dreams, bolder plans, and even bigger wins.'],
    ['📖','May every page you fill, in your journals and in your life, bring you closer to who you\'re becoming.'],
    ['✨','This is just the beginning. Go chase everything you\'ve been quietly working toward.'],
    ['💪','Stay steady, stay guarded where you need to be, and keep shining exactly the way you do.'],
    ['🎁','Wishing you a year filled with success, calm, and the space to be entirely yourself.']
  ],
  secret:'You are amazing Tunuu',  // revealed letter by letter; one balloon per letter (22 here)
  note:"You made it to 22, Tunuu. Every quiet late night, every version of yourself you've worked to become, it all counts. This is your year to be bold, guard your peace, and chase every dream on your own terms. 🎉",  // hidden under the scratch card
  candles:6,
  photos:[],                   // e.g. ['photo1.jpg','photo2.jpg'] placed next to this file
  music:'SONG.mp3',                    // e.g. 'song.mp3' placed next to this file
  art:{gift:'',topper:'img/hbd.png',cake:'img/bears-cake.png',balloons:'img/bear-balloons.png'},  // optional images, e.g. {cake:'bears.png'}
  gallery:[['img/photo1.jpg','That soft, easy smile'],['img/photo2.jpg','Golden hour, your room, your world'],['img/photo3.jpg','Mirror moments worth keeping'],['img/photo4.jpg','Dressed up, glowing, unforgettable']],
  last:"No matter where the next few years take you, near or far, remember how loved and valued you are. Eighteen is just a number, what truly matters is the heart you carry, the discipline you've built, and the dreams you keep chasing quietly and on your own terms. Thank you for being exactly who you are. Here's to celebrating you, today and always. 💛",
  celebrate:"Today marks a new beginning, Tunuu. Step into this year with confidence, chase your goals fearlessly, and know that the best is still ahead of you. Happy 22th Birthday, once again! Enjoy your special day to the fullest 🎉🎂",
  end:"Thank you for going through this little surprise, Tunuu. Hope it brought a smile to your face. Happy 22th Birthday, once again! 🎂💛",
 
};
/* ====================== */

const $=id=>document.getElementById(id);
const screens=[...document.querySelectorAll('.screen')];
const restart=e=>{e.style.animation='none';e.offsetWidth;e.style.animation=''};
const show=n=>screens.forEach(s=>s.classList.toggle('on',s.id===n));
let run=0,bg=null;

$('foot').textContent=CONFIG.credit;
$('name').textContent=CONFIG.name;
const D=s=>new Date(s+'T00:00:00Z'),fmt=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
$('rng').textContent=fmt(D(CONFIG.from))+' → '+fmt(D(CONFIG.to));
const DAYS=Math.round((D(CONFIG.to)-D(CONFIG.from))/864e5);

/* audio: synthesized (no files needed). Optional CONFIG.music file overrides the melody */
let AC=null,master=null,musicGain=null,musicTimer=null,musicOn=false;
const file=CONFIG.music?Object.assign(new Audio(CONFIG.music),{loop:true}):null;
function ac(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.55;master.connect(AC.destination)}
  if(AC.state==='suspended')AC.resume();return AC}
function tone(f,t,d,type='sine',v=.14,dest){const a=ac(),o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d);
  o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.05)}
function noise(t,d,freq,v){const a=ac(),n=a.sampleRate*d,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
  for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*(1-i/n);
  const src=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();src.buffer=b;f.type='lowpass';f.frequency.value=freq;g.gain.value=v;
  src.connect(f);f.connect(g);g.connect(master);src.start(t)}
const sfx=fn=>{if(!musicOn)return;try{fn(ac().currentTime)}catch(e){}};
const S={
  tick:t=>tone(660,t,.18,'triangle',.18),
  go:t=>{tone(880,t,.3,'triangle',.2);tone(1320,t+.08,.4,'sine',.1)},
  unlock:t=>[523,659,784,1047].forEach((f,i)=>tone(f,t+i*.08,.4,'triangle',.14)),
  launch:t=>{const a=ac(),o=a.createOscillator(),g=a.createGain();o.type='sawtooth';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(1200,t+.7);
    g.gain.setValueAtTime(.025,t);g.gain.linearRampToValueAtTime(0,t+.7);o.connect(g);g.connect(master);o.start(t);o.stop(t+.75)},
  boom:t=>{noise(t,.9,500,.35);tone(90,t,.5,'sine',.25)},
  heart:t=>[784,988,1175,1568].forEach((f,i)=>tone(f,t+i*.12,.8,'sine',.1)),
  open:t=>{[1047,1319,1568,2093].forEach((f,i)=>tone(f,t+i*.07,.7,'triangle',.12));noise(t,.5,3000,.12)}
};
/* Happy Birthday, as [semitones from C4, beats] */
const TUNE=[[7,.75],[7,.25],[9,1],[7,1],[12,1],[11,2],[7,.75],[7,.25],[9,1],[7,1],[14,1],[12,2],
  [7,.75],[7,.25],[19,1],[16,1],[12,1],[11,1],[9,1],[17,.75],[17,.25],[16,1],[12,1],[14,1],[12,2]];
function playTune(){if(!musicOn)return;const t0=ac().currentTime+.1,B=.52;let t=t0;
  musicGain=AC.createGain();musicGain.gain.value=.5;musicGain.connect(master);
  for(const [n,b] of TUNE){const f=261.63*2**(n/12);tone(f,t,b*B*1.6,'triangle',.13,musicGain);tone(f/2,t,b*B*1.2,'sine',.05,musicGain);t+=b*B}
  musicTimer=setTimeout(playTune,(t-t0+1.6)*1000)}
function stopTune(){clearTimeout(musicTimer);if(musicGain){musicGain.gain.cancelScheduledValues(0);musicGain.gain.value=0;musicGain=null}}
$('music').onclick=()=>{musicOn=!musicOn;
  if(musicOn){ac();file?file.play():playTune()}else{file?file.pause():stopTune()}
  $('music').textContent=musicOn?'🔊 Music: on':'🔈 Music: off';$('music').setAttribute('aria-pressed',musicOn)};

/* lock */
$('form').onsubmit=e=>{e.preventDefault();
  if($('key').value.trim()===CONFIG.passkey){$('key').blur();sfx(S.unlock);play()}
  else{$('hint').textContent='Wrong passkey. Check the hint and try again.';$('hint').classList.add('err');
    const c=$('form');c.classList.remove('shake');c.offsetWidth;c.classList.add('shake');$('key').select()}};

/* canvases */
const fx=$('fx'),hc=$('heart'),cf=$('conf'),X=fx.getContext('2d'),H=hc.getContext('2d'),C=cf.getContext('2d');
let W,Ht,R=Math.min(devicePixelRatio||1,2);
function size(){W=innerWidth;Ht=innerHeight;
  for(const [c,g] of [[fx,X],[hc,H],[cf,C]]){c.width=W*R;c.height=Ht*R;c.style.width=W+'px';c.style.height=Ht+'px';g.setTransform(R,0,0,R,0,0)}}
size();addEventListener('resize',size);

/* fireworks */
const PAL=['#f0d98c','#d9b45a','#fff6dc','#ffffff','#e8c46a'];
let parts=[],rockets=[],dots=[],tracing=null,running=false;
const launch=()=>{sfx(S.launch);rockets.push({x:W*(.15+Math.random()*.7),y:Ht,ty:Ht*(.12+Math.random()*.35),vy:-(8+Math.random()*3)})};
let lastBoom=0;
function burst(x,y){const now=performance.now();if(now-lastBoom>180){lastBoom=now;sfx(S.boom)}const n=70+Math.random()*30|0,c=PAL[Math.random()*5|0];
  for(let i=0;i<n;i++){const a=Math.random()*6.283,s=1+Math.random()*4.5;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,d:.008+Math.random()*.01,c:Math.random()<.6?c:PAL[Math.random()*5|0]})}}
const hp=(t,s,cx,cy)=>[cx+16*Math.sin(t)**3*s,cy-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*s];
const disc=(g,x,y,r,c,a)=>{g.globalAlpha=a;g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,6.283);g.fill()};

function frame(){
  if(!running)return;
  const now=performance.now();
  X.globalCompositeOperation='source-over';X.fillStyle='rgba(10,9,8,.16)';X.fillRect(0,0,W,Ht);
  X.globalCompositeOperation='lighter';
  rockets=rockets.filter(r=>{r.y+=r.vy;
    parts.push({x:r.x+(Math.random()-.5)*2,y:r.y,vx:0,vy:.6,l:.6,d:.04,c:'#fff3c8'});
    X.globalAlpha=1;X.fillStyle='#fff';X.fillRect(r.x-1.5,r.y-1.5,3,3);
    if(r.y<=r.ty){burst(r.x,r.y);return false}return true});
  parts=parts.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.vy=p.vy*.985+.045;p.l-=p.d;
    if(p.l<=0)return false;X.globalAlpha=p.l;X.fillStyle=p.c;X.fillRect(p.x-1,p.y-1,2,2);return true});
  X.globalAlpha=1;

  H.clearRect(0,0,W,Ht);
  if(tracing){
    const s=Math.min(.62*Ht/29,.78*W/32),cx=W/2,cy=Ht/2-2.5*s,N=96;
    const p=Math.min(1,(now-tracing)/4600);
    while(dots.length<N&&dots.length<=Math.floor(p*(N-1))){
      const i=dots.length,[x,y]=hp(Math.PI+2*Math.PI*i/(N-1),s,cx,cy);dots.push({x,y,t:now,i})}
    for(const d of dots){const a=Math.min(1,(now-d.t)/300),big=d.i%2?3.5:5;
      disc(H,d.x,d.y,big+4,'#d9b45a',a*.25);disc(H,d.x,d.y,big,'#d9b45a',a);disc(H,d.x,d.y,big/2.4,'#fff3c8',a)}
    if(p<1){const [hx,hy]=hp(Math.PI+2*Math.PI*p,s,cx,cy);
      parts.push({x:hx,y:hy,vx:(Math.random()-.5)*2,vy:Math.random()*1.5,l:.8,d:.05,c:'#fff3c8'});
      disc(H,hx,hy,10,'#fff3c8',.35);disc(H,hx,hy,5,'#fff',1)}
    H.globalAlpha=1}
  requestAnimationFrame(frame)}

/* confetti */
let bits=[],confOn=false;
function confetti(n,burstFrom){for(let i=0;i<n;i++){const b=burstFrom;
  bits.push({x:b?b.x:Math.random()*W,y:b?b.y:-10,vx:b?(Math.random()-.5)*10:(Math.random()-.5)*1.2,vy:b?-4-Math.random()*8:1+Math.random()*1.5,
    w:4+Math.random()*7,h:3+Math.random()*9,r:Math.random()*6,vr:(Math.random()-.5)*.25,c:['#d9b45a','#f0d98c','#f6f1e7','#b8b2a4'][Math.random()*4|0],o:Math.random()<.3})}}
function confLoop(){if(!confOn)return;C.clearRect(0,0,W,Ht);
  if(Math.random()<.35)confetti(1);
  bits=bits.filter(b=>{b.x+=b.vx;b.y+=b.vy;b.vy+=b.vx===0?0:.18;if(b.vy>2.5)b.vy=2.5;b.r+=b.vr;
    if(b.y>Ht+20)return false;C.save();C.translate(b.x,b.y);C.rotate(b.r);C.fillStyle=b.c;C.globalAlpha=.85;
    b.o?(C.beginPath(),C.ellipse(0,0,b.w/2,b.h/3,0,0,6.283),C.fill()):C.fillRect(-b.w/2,-b.h/2,b.w,b.h);C.restore();return true});
  requestAnimationFrame(confLoop)}

/* sequence */
function countUp(el,to,ms,id){const t0=performance.now();
  (function f(n){const k=Math.min(1,(n-t0)/ms);el.textContent=Math.round(to*(1-(1-k)**3)).toLocaleString('en-US')+' Days';
    if(k<1&&id===run)requestAnimationFrame(f)})(t0)}

async function play(){
  const id=++run,wait=ms=>new Promise(r=>setTimeout(()=>r(id===run),ms));
  $('skip').hidden=false;show('count');
  for(const n of [3,2,1]){$('num').textContent=n;restart($('num'));sfx(S.tick);if(!await wait(1000))return}
  sfx(S.go);
  show('show');parts=[];rockets=[];dots=[];tracing=null;$('ht').classList.remove('on');
  X.clearRect(0,0,W,Ht);running=true;frame();
  launch();bg=setInterval(()=>{launch();if(Math.random()<.5)launch()},800);
  if(!await wait(6500))return;
  tracing=performance.now();sfx(S.heart);
  if(!await wait(5000))return;
  $('ht').classList.add('on');countUp($('days'),DAYS,1600,id);
  if(!await wait(5200))return;
  load();
}

async function load(){
  const id=++run;clearInterval(bg);$('skip').hidden=true;
  show('load');restart($('bar'));
  await new Promise(r=>setTimeout(r,2800));
  if(id!==run)return;
  running=false;show('gift');confOn=true;confLoop();
}
$('skip').onclick=load;

/* gift reveal */
let typeId=0,slideTimer=null;
function typeOut(el,text,done){const id=++typeId;let i=0;const chars=[...text];el.textContent='';el.classList.add('typing');
  (function step(){if(id!==typeId)return;i++;el.textContent=chars.slice(0,i).join('');
    if(i<chars.length)setTimeout(step,/[.,!?\n]/.test(chars[i-1])?90:14);else{el.classList.remove('typing');done&&done()}})()}
function slides(){const box=$('photos');box.innerHTML='';clearInterval(slideTimer);
  const list=CONFIG.photos;if(!list.length)return;
  box.classList.add('on');
  box.innerHTML='<img alt="Memory photo"><button class="prev" aria-label="Previous photo">‹</button><button class="next" aria-label="Next photo">›</button><div class="dotsrow"></div>';
  const img=box.querySelector('img'),dr=box.querySelector('.dotsrow');let k=0;
  dr.innerHTML=list.map(()=>'<i></i>').join('');
  const go=n=>{k=(n+list.length)%list.length;img.src=list[k];[...dr.children].forEach((d,i)=>d.classList.toggle('cur',i===k))};
  const auto=()=>{clearInterval(slideTimer);slideTimer=setInterval(()=>go(k+1),3500)};
  box.querySelector('.prev').onclick=()=>{go(k-1);auto()};box.querySelector('.next').onclick=()=>{go(k+1);auto()};
  if(list.length<2)box.querySelectorAll('button').forEach(x=>x.hidden=true);
  go(0);auto()}

/* ===== after the gift: greeting → letter → cake → wishes → balloons ===== */
const age=(()=>{const a=D(CONFIG.from),b=D(CONFIG.to);let y=b.getUTCFullYear()-a.getUTCFullYear();
  if(b.getUTCMonth()<a.getUTCMonth()||(b.getUTCMonth()===a.getUTCMonth()&&b.getUTCDate()<a.getUTCDate()))y--;return y})();
const ord=n=>n+((n%100>10&&n%100<14)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th'));
$('gtitle').textContent='🎉 Happy '+'22'+' Birthday! 🎉';
$('gname').textContent=CONFIG.name+'! 😘';
$('gline').textContent=CONFIG.greeting;
$('dear').textContent='My Favourite Person, ❤️';
$('sign').textContent=CONFIG.signoff;
$('ctitle').textContent='🎂 Make a Wish, '+CONFIG.name+' 🎂';
$('ctag').textContent='Happy '+'22'+', '+CONFIG.name+'!';
for(const k in CONFIG.art){const im=$('art-'+k);if(im&&CONFIG.art[k]){im.src=CONFIG.art[k];im.hidden=false;if(k==='topper')$('topper').hidden=true}}

const goTo=n=>{show(n);const e=$(n);if(e)e.scrollTop=0};
function enter(n){if(n!=='letter')clearInterval(slideTimer);goTo(n);
  ({letter:startLetter,cake:startCake,wishes:startWishes,balloons:startBalloons,note:startNote,memories:startMemories})[n]?.()}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{sfx(S.tick);enter(b.dataset.go)});

/* extra sounds */
S.pop=t=>{noise(t,.14,3200,.3);tone(520,t,.12,'triangle',.12)};
S.blow=t=>{noise(t,.9,1400,.22)};

/* gift → greeting */
$('box').onclick=()=>{const b=$('box');if(b.classList.contains('open'))return;
  b.classList.add('open');$('stage').classList.add('opened');$('prompt').style.opacity=0;sfx(S.open);
  const r=b.getBoundingClientRect();confetti(160,{x:r.left+r.width/2,y:r.top+20});
  setTimeout(()=>enter('greet'),3200)};

/* letter */
function startLetter(){const id=typeId+1;$('mp').textContent='';$('toCake').hidden=true;slides();
  setTimeout(()=>{if(typeId+1!==id)return;typeOut($('mp'),CONFIG.message,()=>{$('toCake').hidden=false})},800)}

/* cake */
const candlesG=$('candles');
(function(){const n=CONFIG.candles,gap=18,x0=150-(n-1)*gap/2;let h='';
  for(let i=0;i<n;i++){const x=x0+i*gap;
    h+=`<g><rect x="${x-3.5}" y="52" width="7" height="46" rx="1.5" fill="#f3e9cf"/><rect x="${x-3.5}" y="52" width="7" height="46" rx="1.5" fill="url(#cg)" opacity=".35"/>`+
       `<rect x="${x-.6}" y="46" width="1.2" height="7" fill="#3a2f1a"/><ellipse class="flame" style="--i:${i}" cx="${x}" cy="38" rx="4.6" ry="9.5" fill="url(#fl)"/></g>`}
  candlesG.innerHTML=h})();
function startCake(){resetCake()}
function resetCake(){$('cakesvg').classList.remove('out');$('glow').classList.remove('off');
  const b=$('blow');b.disabled=false;b.textContent='🕯️ Blow the candles & make a wish';
  $('wishmsg').hidden=true;$('toWishes').hidden=true}
$('blow').onclick=()=>{const b=$('blow');if(b.disabled)return;b.disabled=true;sfx(S.blow);
  $('cakesvg').classList.add('out');$('glow').classList.add('off');
  const r=$('cakesvg').getBoundingClientRect();confetti(140,{x:r.left+r.width/2,y:r.top+30});
  setTimeout(()=>{b.textContent='🕯️ Wish made!';sfx(S.heart);$('wishmsg').hidden=false;$('toWishes').hidden=false;
    $('cake').scrollTo({top:$('cake').scrollHeight,behavior:'smooth'})},700)};

/* wishes */
function startWishes(){const g=$('wgrid');
  g.innerHTML=CONFIG.wishes.map(([e,t],i)=>`<div class="wcard" style="--d:${.3+i*.18}s"><span>${e}</span> ${t}</div>`).join('')}

/* balloons */
const poppedAll=()=>$('sky').querySelectorAll('.bl:not(.pop)').length===0;
function startBalloons(){
  const text=CONFIG.secret,letters=[...text].filter(c=>c!==' '),sky=$('sky'),sec=$('secret');let shown=0;
  $('bsub').textContent='Pop them all to reveal a secret message!';$('toNote').hidden=true;
  sec.innerHTML=text.split(' ').map(w=>'<span class="w">'+[...w].map(()=>'<i></i>').join('')+'</span>').join('');
  const slots=[...sec.querySelectorAll('i')];
  sky.innerHTML=letters.map((_,i)=>`<button class="bl v${i%3}" style="--r:${(i*37%11)/10}s" aria-label="Pop balloon ${i+1}"></button>`).join('');
  sky.querySelectorAll('.bl').forEach(b=>b.onclick=()=>{if(b.classList.contains('pop'))return;
    b.classList.add('pop');sfx(S.pop);
    const r=b.getBoundingClientRect();confetti(12,{x:r.left+r.width/2,y:r.top+r.height/2});
    const s=slots[shown];s.textContent=letters[shown].toUpperCase();s.classList.add('on');shown++;
    if(poppedAll()){$('bsub').textContent='🎉 Secret message unlocked! 🎉';sfx(S.unlock);
      confetti(200);$('toNote').hidden=false;
      $('balloons').scrollTo({top:$('balloons').scrollHeight,behavior:'smooth'})}})}

/* final screens */
$('lastmsg').textContent=CONFIG.last;$('celmsg').textContent=CONFIG.celebrate;$('endmsg').textContent=CONFIG.end;
$('celtitle').textContent='🎉 CELEBRATE '+CONFIG.name.toUpperCase()+' 🎉';$('celsub').textContent=age+' & Unstoppable 🔥';

/* camera bear: replay blink + flash + photo-pop on every shot */
S.shutter=t=>{noise(t,.06,5000,.25);tone(1800,t+.05,.05,'square',.05);noise(t+.09,.08,2500,.2)};
function snap(src){const c=$('cam');if(!c)return;
  $('shot').style.backgroundImage=src?'url("'+src+'")':'none';
  c.classList.remove('snap');c.offsetWidth;c.classList.add('snap');sfx(S.shutter)}
let polaTimer=null;
function startMemories(){const box=$('polas'),list=CONFIG.gallery,rot=[-3,2,-2,3];clearInterval(polaTimer);
  box.innerHTML='';$('toLast').hidden=true;$('pcount').textContent='';let i=0;
  const add=()=>{const [src,cap]=list[i],f=document.createElement('figure');f.className='pola';f.style.setProperty('--r',rot[i%4]+'deg');
    f.innerHTML='<img alt="'+cap+'" src="'+src+'"><figcaption>'+cap+'</figcaption>';snap(src);setTimeout(()=>{box.appendChild(f);sfx(S.tick)},700);
    $('pcount').textContent='PHOTO '+(i+1)+' OF '+list.length;i++;
    if(i>=list.length){clearInterval(polaTimer);setTimeout(()=>{$('toLast').hidden=false;$('memories').scrollTo({top:$('memories').scrollHeight,behavior:'smooth'})},900)}};
  add();if(list.length>1)polaTimer=setInterval(add,1800)}

/* scratch card */
const foil=$('foil'),F=foil.getContext('2d');let scratching=false,scratched=false,last=null,tick=0;
function paintFoil(){const w=foil.clientWidth,h=foil.clientHeight;
  foil.width=w*R;foil.height=h*R;F.setTransform(R,0,0,R,0,0);F.globalCompositeOperation='source-over';
  const g=F.createLinearGradient(0,0,w,h);
  [[0,'#8a6b24'],[.2,'#d9b45a'],[.38,'#fff0b0'],[.55,'#c79a3a'],[.78,'#f0d98c'],[1,'#8a6b24']].forEach(([o,c])=>g.addColorStop(o,c));
  F.fillStyle=g;F.fillRect(0,0,w,h);
  F.fillStyle='rgba(60,45,10,.75)';F.font='700 13px system-ui,sans-serif';F.textAlign='center';F.textBaseline='middle';
  if('letterSpacing' in F)F.letterSpacing='3px';F.fillText('SCRATCH HERE',w/2,h/2)}
function startNote(){$('notesub').textContent='👆 Rub the card with your mouse or finger!';$('under').textContent=CONFIG.note;scratched=false;foil.classList.remove('gone');$('actions').classList.remove('on');
  requestAnimationFrame(paintFoil)}
function scratchAt(x,y){F.globalCompositeOperation='destination-out';F.lineCap=F.lineJoin='round';F.lineWidth=40;
  F.beginPath();F.moveTo(last?last.x:x,last?last.y:y);F.lineTo(x+.01,y);F.stroke();last={x,y}}
function cleared(){const w=foil.width,h=foil.height,d=F.getImageData(0,0,w,h).data;let n=0,t=0;
  for(let y=0;y<h;y+=8)for(let x=0;x<w;x+=8){t++;if(d[(y*w+x)*4+3]<40)n++}return n/t}
function finishScratch(){if(scratched)return;scratched=true;$('notesub').textContent='Here it is 💗';foil.classList.add('gone');sfx(S.unlock);confetti(160);
  setTimeout(()=>$('actions').classList.add('on'),600)}
const pt=e=>{const r=foil.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
foil.addEventListener('pointerdown',e=>{if(scratched)return;scratching=true;last=null;foil.setPointerCapture(e.pointerId);const p=pt(e);scratchAt(p.x,p.y);e.preventDefault()});
foil.addEventListener('pointermove',e=>{if(!scratching||scratched)return;const p=pt(e);scratchAt(p.x,p.y);
  if(++tick%6===0&&cleared()>.5)finishScratch()});
const stopScratch=()=>{if(!scratching)return;scratching=false;last=null;if(!scratched&&cleared()>.5)finishScratch()};
foil.addEventListener('pointerup',stopScratch);foil.addEventListener('pointercancel',stopScratch);

/* replay (skips the passkey) */
$('again').onclick=()=>{
  typeId++;clearInterval(slideTimer);confOn=false;bits=[];C.clearRect(0,0,W,Ht);
  const b=$('box');b.classList.remove('open');$('stage').classList.remove('opened');b.style.display='';
  $('prompt').style.display='';$('prompt').style.opacity=1;
  $('mp').textContent='';clearInterval(polaTimer);resetCake();play()};
