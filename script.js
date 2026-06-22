const palette = [
  '#E8A05A','#F7D9B0','#D96A14','#E08C3C','#C85A1C',
  '#8FB24A','#111111','#8A4B0F','#F4C68A','#C36A3A'
];

const cat = document.getElementById('cat');
const bubble = document.getElementById('bubble');
const parts = Array.from(document.querySelectorAll('.part'));
const askBtn = document.getElementById('ask');
const questionEl = document.getElementById('question');

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

function localFortune(question){
  const q = question.toLowerCase();

  const love = [
    'Láska roste, když se nebát ukázat své skutečné já.',
    'Srdce je tvoje mapa; důvěřuj mu, i když cesta není hladká.',
    'Vztah najde svůj klid, jakmile přestaneš porovnávat s minulostí.',
    'Malé laskavosti vyvolávají velké změny v citovém světě.',
    'Někdo blízko může čekat na tvůj tichý signál.',
    'Otevřenost přináší více než naléhavost.',
    'Přijmi laskavost, i když ji nejde hned vrátit.',
    'Láska se zrodí z porozumění, ne z dokonalosti.',
    'Něco krásného se začne formovat právě tam, kde jsi teď nejzranitelnější.',
    'Tvoje věrnost bude odměněna trpělivostí.'
  ];

  const work = [
    'V práci tě čeká okamžik, kdy budeš moci obětovat pohodlí pro smysl.',
    'Všem idejím dej čas, ale jednu proveď rychle.',
    'Nový úkol může vypadat těžký, ale povede ke stabilitě.',
    'Tvoje pozornost v detailech přitáhne správnou příležitost.',
    'Někdo si všimne tvé píle i v tichu kanceláře.',
    'Není třeba mít všechno pod kontrolou, stačí dělat své nejlíp.',
    'Zaměř se na rituály práce, nikoli jen na výsledky.',
    'Společník v práci může být cennější než vysoký plat.',
    'Tvá energie v tomto týdnu podpoří pomalé, ale pevné kroky.',
    'Odvaha vyjádřit názor ti připraví novou cestu.'
  ];

  const money = [
    'Teď je nejlepší čas podívat se na své výdaje bez bolesti.',
    'Spoření malé částky dnes ti přinese lehčí zítřky.',
    'Peníze přijdou, když přestaneš ze všeho dělat drama.',
    'Méně utrácet znamená více prostoru pro nečekané dary.',
    'Vyber si pouze jednu velkou investici místo několika malých.',
    'Dobrý plán sám o sobě už je bohatství.',
    'Buď pasivní u malých pokušení, aktivní u velkých potřeb.',
    'Finanční klid přijde, když omezíš věci, které nepotřebuješ.',
    'Odhadni, co je cenné víc než co je jednoduše drahé.',
    'Peníze dnes nejsou hlavní výzvou, ale způsob, jak být vědomý.'
  ];

  const travel = [
    'Cesta bude klidná, když půjdeš pomalu a pozorně.',
    'Krátký výlet přinese nové nápady více než dlouhá pouť.',
    'Buď připravený na změnu směru — může to být dobré.',
    'Cestování ti otevře oči na to, co už máš doma.',
    'Nebojuj s věcmi, které nemůžeš ovlivnit na cestě.',
    'Vyraz tam, kde je tma jen kvůli hvězdám.',
    'Cesta by měla být radost, ne důkaz odvahy.',
    'Druhá polovina dne je lepší na náhlé rozhodnutí.',
    'Udělej jeden krok navíc, ať cesta dostane nový význam.',
    'Cestování může přinést odpověď, kterou jsi nečekal.'
  ];

  const health = [
    'Zdraví je v malých každodenních volbách, ne v jednom zázraku.',
    'Udělej dnes jeden laskavý čin pro své tělo.',
    'Odpočinek ti vrátí více než poslední úsilí.',
    'Poslouchej své dýchání — v něm je odpověď.',
    'Jídlo, pohyb a klid drží rovnováhu.',
    'Ne vše, co se cítí špatně, je zlé. Dech to často zvládne.',
    'Tvoje tělo si přeje být slyšeno, ne potlačeno.',
    'Pevně stojíš i v chvění; uzdravování začíná přijetím.',
    'Menší změna dnes přinese větší sílu zítra.',
    'S bolestí si pověz, že jsi stále celý/á.'
  ];

  const death = [
    'Zemřít dnes nepatří mezi hvězdy, které pro tebe svítí.',
    'Tvoje cesta ještě nekončí; dnešek tě vede dál, ne k černému konci.',
    'Smrt je vzdálená; nejprve dbej na své srdce a úsměv.',
    'Dnes je den pro rozhodnutí, ne pro rozloučení.',
    'Tvůj osud má více kapitol než jednu noc.',
    'Nesmrtelnou nejseš, ale dnes nejsi ve stínu posledního kroku.',
    'V tuto chvíli je důležitější postarat se o své blízké než o strach.',
    'Tvé energie dnes míří k tvorbě, ne k ukončení.',
    'Dnes si vydej prostor pro klid, ne pro obavy o konec.',
    'Život v tobě stále proudí; věnuj mu pozornost a lépe to poznáš.'
  ];

  const choices = [
    'Vyber tu možnost, která ti přinese klid do noci.',
    'Žádná volba není úplně dokonalá; zvol tu, která je upřímná.',
    'Přijmi riziko jen tehdy, když je k němu i malý důvod.',
    'Většinou je lepší zvolit cestu s respektem k sobě.',
    'Když se nemůžeš rozhodnout, začni od toho, co se zdá správné.',
    'Ta nejlepší volba je někdy ta, kterou zatím nechceš udělat.',
    'Zvaž ne pouze výsledek, ale i to, jak se na něj díváš.',
    'Neboj se první volby zpřesnit později.',
    'Nech si trochu času; odpověď už v tobě mizí strach.',
    'Někdy je největší volba pokračovat v tichu.'
  ];

  const future = [
    'Budoucnost se tvoří z řetězu dnešních rozhodnutí.',
    'Za týden budeš jiný/á, pokud konečně uděláš první krok.',
    'Nevyhýbej se budoucnosti — ona čeká ten, kdo se pohne.',
    'Ode dneška se točí víc věcí, než tušíš.',
    'Něco, co si přeješ, už je blíže než to vypadá.',
    'Tvá budoucnost není napsaná, ale má svůj rytmus.',
    'V blízké budoucnosti se objeví příležitost k uvolnění.',
    'Nedefinuj svůj osud podle dnešních obav.',
    'Tvůj vnitřní hlas už se ptá správně, jen ho dej ještě dál.',
    'Nová kapitola začíná, když se postavíš strachu tváří v tvář.'
  ];

  const luck = [
    'Štěstí dnes září na ty, kdo jsou připravení ho přijmout.',
    'Neboj se trochu smůly; každé zklamání nese semínko štěstí.',
    'Dnes není den na hazard, ale na malé úspěchy.',
    'Štěstí přichází, když se věnuješ tomu, co máš rád.',
    'Náhoda se usměje na člověka se směsí odvahy a soucitu.',
    'Nečekej na zázrak, tvoř si své vlastní štěstí.',
    'Úsměv stačí, aby se štěstí cítilo vítáno.',
    'Lotto není odpověď; pozorování kolem tebe ano.',
    'Odhodlání promění maličký záblesk v přízeň osudu.',
    'Dnes jsou tvé kroky lépe požehnány soustředěním než náhodou.'
  ];

  const secrets = [
    'Pravda se odhalí v momentě, kdy přestaneš věřit v ostatní sliby.',
    'Někdo ti brzy řekne něco, co zůstane v tichu.',
    'Skryté věci se nechají odhalit tvým jemným zpozorováním.',
    'Neboj se zeptat, ať už je odpověď jakákoli.',
    'Tajná zpráva přijde v prostém okamžiku.',
    'Někdy je nejmocnější odpověď ta, kterou nechceš slyšet.',
    'Cesta za tajemstvím vede přes tvůj vlastní klid.',
    'Důvěřuj tiché intuici, když hledáš skryté stopy.',
    'Ještě není čas tři dělby; drž se toho, co víš.',
    'To, co hledáš, je často blíž, než myslíš.'
  ];

  const magic = [
    'Tvoje energie je silná, když nasloucháš tichu kolem sebe.',
    'Dnešní noc má moc proměnit malé nápady v tajemné vize.',
    'Není třeba kouzel, stačí, když věříš v sílu dne.',
    'Místo zaklínadel se soustřeď na svůj dech a záměr.',
    'Něco tajemného tě dnes povede, pokud se podíváš blíž.',
    'Magie je v tom, jak přetváříš strach v odvahu.',
    'Dovol svým myšlenkám být jako oko černého měsíce.',
    'Zvláštní náznaky přicházejí v okamžiku, kdy je nejméně čekáš.',
    'Vyvolej klid, ať tvůj den začíná jasněji.',
    'Nech minulost za sebou, ať magie vstoupí novým krokem.'
  ];

  const general = [
    'Dnes je vhodný den na nová rozhodnutí.',
    'Události se pomalu skládají ve tvůj prospěch.',
    'Malé kroky vedou k velkým změnám — začni dnes.',
    'Cítíš více, než si myslíš; dbej na své vnitřní varování.',
    'Otevřenost dnes přinese více než uzavřenost.',
    'Mír ve tvé mysli se stane tvým nejcennějším průvodcem.',
    'Dík za to, co máš, přitáhne více, co chceš.',
    'Dech ti vždy připomene, že jsi stále zde.',
    'Všechno, co potřebuješ, se skrývá v jednoduchém rozhodnutí.',
    'Vyber si slova moudře; mohou změnit atmosféru dne.'
  ];

  const patterns = [
    {rx: /zemř|smrt|umřu|umřít/, list: death},
    {rx: /lás|miluj|partnerka|partner|partner/, list: love},
    {rx: /práce|job|kariér|zaměstn|povol/, list: work},
    {rx: /peníze|finance|penize|bohat|dluh|plat/, list: money},
    {rx: /cest|cesta|dál|dálnice|trip|cestuj/, list: travel},
    {rx: /zdrav|nemoc|bolest|léka|léčí|zran/, list: health},
    {rx: /štěst|luck|náhoda|osud|štestí/, list: luck},
    {rx: /tajem|tajnos|tajemství|skryt|skryté/, list: secrets},
    {rx: /mag|kouz|čáry|věšt|mystick|duch/, list: magic},
    {rx: /budouc|zítra|příští|později|osud/, list: future},
    {rx: /rozhod|volb|vyber|výběr/, list: choices}
  ];

  for(const entry of patterns){
    if(entry.rx.test(q)){
      return entry.list[Math.floor(Math.random()*entry.list.length)];
    }
  }

  return general[Math.floor(Math.random()*general.length)];
}

function askQuestion(){
  const question = questionEl.value.trim();
  if(!question){
    showFortune('Zeptej se na něco konkrétního.');
    return;
  }
  showFortune('Kočka přemýšlí...');
  catAnimate('think');
  const answer = localFortune(question);
  setTimeout(() => {
    showFortune(answer);
    applyColors();
    catAnimate();
  }, 350);
}

askBtn.addEventListener('click',()=>{askQuestion();});
questionEl.addEventListener('keydown',(e)=>{if(e.key==='Enter' && !e.shiftKey){e.preventDefault(); askQuestion();}});

// initial colors
applyColors();
