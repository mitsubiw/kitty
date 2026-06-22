const palette = [
  '#E8A05A','#F7D9B0','#D96A14','#E08C3C','#C85A1C',
  '#8FB24A','#111111','#8A4B0F','#F4C68A','#C36A3A'
];

const cat = document.getElementById('cat');
const bubble = document.getElementById('bubble');
const parts = Array.from(document.querySelectorAll('.part'));
const askBtn = document.getElementById('ask');
const questionEl = document.getElementById('question');
const apiKeyEl = document.getElementById('apiKey');
const useAiEl = document.getElementById('useAi');

function shuffle(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
}

function applyColors(){
  const colors = palette.slice();
  shuffle(colors);
  parts.forEach((el,i)=>{
    el.style.color = colors[i % colors.length];
  });
}

function showFortune(text){
  bubble.textContent = text;
  bubble.animate([
    {transform:'translateY(6px)',opacity:0},
    {transform:'translateY(0)',opacity:1}
  ],{duration:250,easing:'ease-out'});
}

function catAnimate(kind='pulse'){
  if(kind==='think'){
    cat.animate([
      {transform:'translateY(0) rotate(0)'},
      {transform:'translateY(-6px) rotate(-1deg)'},
      {transform:'translateY(0) rotate(0)'}
    ],{duration:600,iterations:1,easing:'ease-out'});
  } else {
    cat.animate([
      {transform:'scale(1)'},
      {transform:'scale(1.035)'},
      {transform:'scale(1)'}
    ],{duration:320,easing:'ease-out'});
  }
}

// Server-side proxy is preferred. Client will call /api/ask if available.

function localAiAnswer(question){
  const q = question.toLowerCase();
  if(/lás|miluj|partner|partnerka|partner/.test(q)){
    return 'V lásce buď otevřený/á — malý krok povede k něčemu hezkému.';
  }
  if(/práce|job|kariér|zaměstn|povol/.test(q)){
    return 'V práci přijde příležitost — přijmi ji s klidem a připraveností.';
  }
  if(/peníze|finance|penize|finance/.test(q)){
    return 'Opatrně s většími výdaji teď; plánování přinese klid.';
  }
  if(/cest|dál|cesta/.test(q)){
    return 'Cesta je příhodná — malé dobrodružství ti prospěje.';
  }
  if(/zdrav|nemoc|zdraví/.test(q)){
    return 'Poslouchej tělo, dopřej mu chvíli odpočinku a uvidíš zlepšení.';
  }
  const generic = [
    'Dnes je vhodný den na nová rozhodnutí.',
    'Události se pomalu skládají ve tvůj prospěch.',
    'Malé kroky vedou k velkým změnám — začni dnes.'
  ];
  return generic[Math.floor(Math.random()*generic.length)];
}

async function askQuestion(){
  const question = questionEl.value.trim();
  if(!question){
    showFortune('Zeptej se na něco konkrétního.');
    return;
  }
  showFortune('Kočka přemýšlí...');
  catAnimate('think');
  try{
    let answer;
    // Call server-side proxy only. Do NOT fallback to local AI.
    try{
      const resp = await fetch('/api/ask',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question})
      });
      if(resp.ok){
        const data = await resp.json();
        answer = data.answer;
      } else {
        const text = await resp.text();
        throw new Error('Proxy error: '+resp.status+' '+text);
      }
    }catch(err){
      console.error('Proxy unavailable or error', err);
      showFortune('Proxy server nedostupný — spusť lokální server s OPENAI_API_KEY (viz README).');
      return;
    }
    showFortune(answer);
    applyColors();
    catAnimate();
  }catch(err){
    console.error(err);
    showFortune('Promiň, něco se nepovedlo — zkus to prosím znovu.');
  }
}

askBtn.addEventListener('click',()=>{askQuestion();});
questionEl.addEventListener('keydown',(e)=>{if(e.key==='Enter' && !e.shiftKey){e.preventDefault(); askQuestion();}});

// initial colors
applyColors();
