/* Колесо Фортуны Лизы · 10.10.2026 */
(() => {
  "use strict";
  const gifts = [
  {
    "short": "−10%",
    "title": "Скидка 10% на любую услугу",
    "type": "discount",
    "percent": 10,
    "description": "Забирай −10% на любой формат: консультации, обучение, свечи или рунический став. Без минимального чека."
  },
  {
    "short": "Ритуал",
    "title": "Ритуал намерения 10.10",
    "type": "practice",
    "description": "Не гадать, а начать. Маленький ритуал на ясность и действие.",
    "instruction": "Возьми лист и допиши две фразы: «Я оставляю…» и «Я выбираю…». А потом — самое главное — запиши один шаг, который сделаешь за ближайшие 24 часа. Никакой магии вместо действий: ты сама задаёшь направление."
  },
  {
    "short": "−15%",
    "title": "Скидка 15% на любую услугу",
    "type": "discount",
    "percent": 15,
    "description": "Твои −15% действуют на любые консультации, обучение, свечи и рунические ставы. Выбирай по своему запросу, а не по стоимости."
  },
  {
    "short": "Деньги",
    "title": "Чек-лист «Деньги без хаоса»",
    "type": "practice",
    "description": "Не обещаю денежный дождь. Предлагаю навести порядок — это полезнее.",
    "instruction": "5 вопросов к своим деньгам. ① Чего хочу достичь за месяц? ② Какие три траты можно убрать без сожалений? ③ За что плачу по привычке? ④ Сколько могу отложить без надрыва? ⑤ Какое одно действие для дохода сделаю на этой неделе? Запиши ответы — это и есть твой план."
  },
  {
    "short": "+1 вопрос",
    "title": "+1 вопрос к консультации",
    "type": "question",
    "description": "Добавлю один уточняющий вопрос к любой консультации — по той же ситуации, без доплаты.",
    "instruction": "Выбери консультацию в каталоге, сохрани код и пришли его в Telegram в течение 48 часов. Бонус действует на одну новую консультацию."
  },
  {
    "short": "Послание",
    "title": "Твоё послание 10.10",
    "type": "practice",
    "description": "Иногда нужные слова приходят очень вовремя.",
    "instruction": "Тебе не нужно получать ещё сто подтверждений, чтобы сделать один честный шаг. Спроси себя: «Что я давно знаю, но не решаюсь признать?» Ответ уже ближе, чем кажется. Теперь выбери одно небольшое действие."
  },
  {
    "short": "−20%",
    "title": "Скидка 20% на любую услугу",
    "type": "discount",
    "percent": 20,
    "description": "−20% на консультации, обучение, свечи и рунические ставы. Даже если захочешь самую небольшую услугу."
  },
  {
    "short": "Любовь",
    "title": "Практика «Мои границы»",
    "type": "practice",
    "description": "Не про идеальные отношения. Про тебя настоящую.",
    "instruction": "Где ты говоришь «да», хотя хочешь «нет»? О какой потребности молчишь? Как могла бы сказать об этом прямо, но бережно? Запиши одну честную фразу для разговора. Начать можно именно с неё."
  },
  {
    "short": "Руна",
    "title": "Твоя руна",
    "type": "rune",
    "description": "Один из восьми рунических символов станет твоей подсказкой для размышления.",
    "instruction": "Прочитай свою руну и подумай, где её образ пересекается с тем, что происходит у тебя сейчас. Это символическая практика, а не точный прогноз."
  },
  {
    "short": "−25%",
    "title": "Скидка 25% на любую услугу",
    "type": "discount",
    "percent": 25,
    "description": "−25% на любой мой формат. Да, даже на одну свечу. Да, и на большое обучение. Без минимальной суммы заказа."
  },
  {
    "short": "Проект",
    "title": "Участие в проекте «Под кожей Луны»",
    "type": "claim",
    "description": "Тебе выпало участие в моём проекте «Под кожей Луны».",
    "instruction": "Хочешь забрать? Пришли мне код в Telegram в течение 48 часов. Расскажу об условиях и ближайшем запуске, а участие подтвержу лично."
  },
  {
    "short": "Пиздюли",
    "title": "Волшебные пиздюли от Лизы",
    "type": "pep",
    "description": "Любовный пинок от Лизы. Осторожно: может помочь перестать откладывать.",
    "instruction": "Красотка, хватит, блин, бесконечно готовиться к собственной жизни. Ты и так знаешь, что давно пора сделать. Не жди, пока исчезнет страх: выбери один конкретный шаг и сделай его сегодня. Никаких «с понедельника». Вот тебе и волшебные пиздюли."
  },
  {
    "short": "Тень",
    "title": "Консультация по тени и страхам",
    "type": "claim",
    "description": "Личный разговор о том, что прячется за страхами, защитными реакциями и повторяющимися сценариями.",
    "instruction": "Присылай код и пару слов о своём запросе в Telegram в течение 48 часов. Формат и время подарочной консультации согласуем лично."
  },
  {
    "short": "Карты",
    "title": "Послание от карт",
    "type": "cards",
    "description": "Одна символическая карта — один вопрос к себе. Посмотрим, что откликнется.",
    "instruction": "Ниже откроется твоё послание от карт. Сохрани его, если захочешь перечитать. Это повод для размышления, не готовый сценарий будущего."
  },
  {
    "short": "Свеча",
    "title": "Свеча от Лизы в подарок",
    "type": "claim",
    "description": "Да, настоящая свеча от Лизы — в подарок. Её стоимость в прайсе — 666 ₽.",
    "instruction": "Напиши в Telegram в течение 48 часов и пришли код. Договоримся о получении свечи; если потребуется пересылка, доставку оплачиваешь отдельно."
  }
];
  const cardMessages = [
  {
    "name": "Звезда",
    "text": "Ты можешь двигаться к большому, не обесценивая маленькое. Сегодня посмотри на то, что возвращает тебе надежду и силы. Выбери один шаг к этому."
  },
  {
    "name": "Сила",
    "text": "Мягкость — не слабость. Твоя сила сегодня в том, чтобы удержать свои границы спокойно, без борьбы за чужое одобрение."
  },
  {
    "name": "Верховная Жрица",
    "text": "Не всякая пауза означает тупик. Прислушайся к себе: что ты чувствуешь, когда перестаёшь спрашивать всех остальных?"
  },
  {
    "name": "Маг",
    "text": "У тебя уже есть хотя бы один инструмент для начала. Не жди идеальных обстоятельств — собери свои ресурсы и сделай первый шаг."
  },
  {
    "name": "Колесо Фортуны",
    "text": "Перемены идут своим чередом, но твой выбор всё ещё имеет значение. Не пытайся контролировать случай; выбирай, как на него ответить."
  },
  {
    "name": "Умеренность",
    "text": "Не обязательно всё решать одним рывком. Сложи два небольших действия в устойчивую привычку и дай себе время."
  },
  {
    "name": "Императрица",
    "text": "Позаботься о том, что хочешь вырастить: идее, теле, отношениях или деле. Внимание и регулярность — тоже действие."
  },
  {
    "name": "Отшельник",
    "text": "Чужой шум может заглушать собственный голос. Найди немного тишины и честно ответь себе, какой выбор давно назрел."
  }
];
  const runeMessages = [
  {
    "name": "Феху",
    "text": "Фокус на ресурсах. Посмотри, что уже есть у тебя в распоряжении, и перестань недооценивать этот запас."
  },
  {
    "name": "Уруз",
    "text": "Фокус на силе. Сегодня не требуй от себя невозможного — выбери одно действие и вложи в него энергию."
  },
  {
    "name": "Ансуз",
    "text": "Фокус на словах. Точное, честное сообщение может сдвинуть ситуацию больше, чем бесконечные догадки."
  },
  {
    "name": "Райдо",
    "text": "Фокус на пути. Не нужно видеть весь маршрут. Важно понять, какой следующий шаг действительно твой."
  },
  {
    "name": "Кеназ",
    "text": "Фокус на ясности. Там, где раньше было много тумана, попробуй задать себе один прямой вопрос."
  },
  {
    "name": "Гебо",
    "text": "Фокус на взаимности. Посмотри, где ты отдаёшь больше, чем можешь, и где стоит восстановить равновесие."
  },
  {
    "name": "Вуньо",
    "text": "Фокус на радости. Не откладывай жизнь до идеального результата: выбери маленький повод почувствовать себя живой сегодня."
  },
  {
    "name": "Иса",
    "text": "Фокус на паузе. Иногда движение начинается с остановки. Отдели подвластное тебе от того, что контролировать невозможно."
  }
];
  const priceList = Array.isArray(window.LIZA_CATALOG) ? window.LIZA_CATALOG : [];
  const categories = Array.isArray(window.LIZA_CATEGORIES) ? window.LIZA_CATEGORIES : [];
  const byId = id => document.getElementById(id);
  const rotor = byId("rotor"), spin = byId("spin"), status = byId("status");
  const fmt = n => new Intl.NumberFormat("ru-RU", {maximumFractionDigits:0}).format(n) + " ₽";
  const hours48 = 48 * 60 * 60 * 1000;
  const storageKey = "liza-1010-wheel-v1";
  let saved = null, spinning = false, filter = "all", query = "", selectedId = null;
  let lastActive = null;
  function readStored() {
    try {
      const val = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (val && Number.isInteger(val.i) && val.i >= 0 && val.i < gifts.length && typeof val.code === "string" && val.code.length < 100) {
        saved = val;
        if (!Number.isFinite(saved.t) || saved.t <= 0) { saved.t = Date.now(); persist(); }
      }
    } catch (_) { saved = null; }
  }
  function persist() { try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {} }
  function currentGift() { return saved ? gifts[saved.i] : null; }
  function isLimited(gift) { return gift && (gift.type === "discount" || gift.type === "question" || gift.type === "claim"); }
  function isActive() { const gift = currentGift(); return !!gift && (!isLimited(gift) || Date.now() < saved.t + hours48); }
  function discountPercent() { const gift = currentGift(); return gift && gift.type === "discount" && isActive() ? gift.percent : 0; }
  function priceWithDiscount(n) { return Math.round(n * (100 - discountPercent()) / 100); }
  function deadlineMoscow() {
    if (!saved) return "";
    return new Intl.DateTimeFormat("ru-RU", {timeZone:"Europe/Moscow",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(saved.t + hours48)) + " (МСК)";
  }
  function wheel() {
    const cv = byId("wheel"), ctx = cv.getContext("2d");
    if (!ctx) return;
    const S = 1000, C = 500, R = 482, arc = Math.PI * 2 / gifts.length;
    ctx.clearRect(0,0,S,S);
    for (let i = 0; i < gifts.length; i++) {
      const mid = -Math.PI/2 + i*arc, from = mid-arc/2, to = mid+arc/2;
      const gradient = ctx.createRadialGradient(C,C,68,C,C,R);
      if (i%2===0) { gradient.addColorStop(0,"#341722"); gradient.addColorStop(1,i===9?"#8c4055":"#742c46"); }
      else { gradient.addColorStop(0,"#1d1119");gradient.addColorStop(1,"#3f1b2a"); }
      ctx.beginPath();ctx.moveTo(C,C);ctx.arc(C,C,R,from,to);ctx.closePath();ctx.fillStyle=gradient;ctx.fill();ctx.strokeStyle="rgba(241,198,151,.64)";ctx.lineWidth=3;ctx.stroke();
      ctx.save();ctx.translate(C+Math.cos(mid)*346,C+Math.sin(mid)*346);ctx.rotate(mid+Math.PI/2);ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillStyle="#fbe6ca";ctx.shadowColor="rgba(0,0,0,.65)";ctx.shadowBlur=10;ctx.font="800 27px Manrope,Arial,sans-serif";ctx.fillText(gifts[i].short,0,0,144);ctx.restore();
      const stud = from;ctx.beginPath();ctx.arc(C+Math.cos(stud)*470,C+Math.sin(stud)*470,6,0,2*Math.PI);ctx.fillStyle="#f5d7b0";ctx.fill();
    }
    ctx.beginPath();ctx.arc(C,C,R-9,0,2*Math.PI);ctx.lineWidth=7;ctx.strokeStyle="rgba(247,208,160,.6)";ctx.stroke();
  }
  function unbiasedIndex() {
    if (!window.crypto || !crypto.getRandomValues) return Math.floor(Math.random()*gifts.length);
    const max=4294967296,limit=max-max%gifts.length,buffer=new Uint32Array(1);
    do {crypto.getRandomValues(buffer);} while(buffer[0]>=limit);
    return buffer[0]%gifts.length;
  }
  function unbiasedCard() { if(!window.crypto || !crypto.getRandomValues)return Math.floor(Math.random()*cardMessages.length);const n=new Uint32Array(1),m=4294967296,limit=m-m%cardMessages.length;do{crypto.getRandomValues(n)}while(n[0]>=limit);return n[0]%cardMessages.length; }
  function giftCode() {
    const bytes=new Uint8Array(5);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
    else for(let i=0;i<5;i++) bytes[i]=Math.floor(Math.random()*256);
    return "LIZA1010-"+Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("").toUpperCase();
  }
  function renderPrize(scroll=false) {
    if (!saved) return;
    const gift=currentGift(),active=isActive(),limited=isLimited(gift),result=byId("result");
    result.hidden=false;
    byId("gift-title").textContent=gift.title;
    byId("gift-code").textContent=saved.code;
    byId("gift-description").textContent=gift.description;
    const claiming=gift.type==="claim";
    const text=gift.type==="discount"?"Теперь самое приятное: выбирай услугу ниже. Я уже пересчитала цены. Скопируй заявку с кодом и отправь её мне в Telegram.":gift.instruction;
    byId("gift-instructions").textContent=text||"";
    if(gift.type==="rune" && Number.isInteger(saved.rune) && saved.rune>=0 && saved.rune<runeMessages.length){const rune=runeMessages[saved.rune];byId("gift-title").textContent="Твоя руна — "+rune.name;byId("gift-description").textContent=rune.text+" Символическое послание для размышлений.";}
    if(gift.type==="cards"){
      if(!Number.isInteger(saved.card)||saved.card<0||saved.card>=cardMessages.length){saved.card=unbiasedCard();persist();}
      const card=cardMessages[saved.card];
      byId("gift-description").textContent="Твоя символическая карта — «"+card.name+"». "+card.text;
    }
    byId("gift-kicker").textContent=gift.type==="discount"?"ТВОЙ СЧАСТЛИВЫЙ ПРОЦЕНТ":claiming?"ПОБЕДА! ЭТО ТВОЁ":gift.type==="question"?"ЕЩЁ НЕМНОГО ЯСНОСТИ":"ПОСЛАНИЕ ОТ ФОРТУНЫ";
    byId("deadline").textContent=limited?(active?"Успей забрать до "+deadlineMoscow():"Срок действия подарка закончился ("+deadlineMoscow()+")."):"Подарок уже твой. Сохрани его, чтобы не потерять.";
    byId("result-note").textContent=claiming?"Подарок нужно подтвердить со мной лично — одного вращения недостаточно для брони.":limited?"Код и срок действия сохраняются на этой странице.":"Можешь сохранить текст или сделать скриншот.";
    const link=byId("gift-catalog-link");
    link.href="#catalog";
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.textContent=gift.type==="discount"||gift.type==="question"?"Выбрать услугу ↓":"Посмотреть услуги ↓";
    const tgGift=byId("tg-gift");
    tgGift.href=telegramHref(buildGiftMessage());
    tgGift.textContent=claiming?"Забрать подарок в Telegram ↗":"Написать Лизе о выигрыше ↗";
    spin.disabled=true;spin.textContent="ТВОЙ ПОДАРОК УЖЕ ЗДЕСЬ ✦";
    status.textContent=limited&&!active?"Срок обращения за подарком истёк.":"Не потеряй: твой подарок ждёт ниже.";
    if(scroll)result.scrollIntoView({behavior:reduced()?"auto":"smooth",block:"start"});
  }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  function celebrate() {
    if(reduced())return;
    const palette=["#eac59e","#fff1d9","#b7627a"];
    for(let i=0;i<28;i++){
      const dot=document.createElement("span");
      dot.textContent=i%3?"✧":"✦";dot.setAttribute("aria-hidden","true");dot.style.cssText="position:fixed;z-index:100;pointer-events:none;top:-35px;left:"+Math.random()*100+"vw;color:"+palette[i%3]+";font-size:"+(13+Math.random()*17)+"px";
      document.body.appendChild(dot);
      dot.animate([{transform:"translateY(0) rotate(0deg)",opacity:.85},{transform:"translateY(105vh) rotate(380deg)",opacity:0}],{duration:2000+Math.random()*2200,delay:Math.random()*400,easing:"ease-in",fill:"forwards"}).onfinish=()=>dot.remove();
    }
  }
  function renderBanner(){
    const gift=currentGift(),active=isActive(),discount=discountPercent();
    const badge=byId("discount-badge"),head=byId("discount-head"),detail=byId("discount-text");
    byId("banner-link").hidden=!gift;
    if(discount){badge.textContent="−"+discount+"%";head.textContent="Твоя скидка −"+discount+"% уже в ценах";detail.textContent="Выбирай любой формат. Успей воспользоваться до "+deadlineMoscow()+".";}
    else if(gift && gift.type==="question" && active){badge.textContent="+1";head.textContent="У тебя есть ещё один вопрос";detail.textContent="Выбирай консультацию — бонус добавится в заявку. Забери его до "+deadlineMoscow()+".";}
    else if(gift && isLimited(gift) && !active){badge.textContent="✧";head.textContent="Время бонуса вышло";detail.textContent="Цены вернулись к обычному прайсу. Выбрать услугу по-прежнему можно.";}
    else if(gift && gift.type==="claim"){badge.textContent="✦";head.textContent="Тебе выпал особенный подарок";detail.textContent="Вернись к результату выше и отправь мне код в Telegram.";}
    else if(gift){badge.textContent="✦";head.textContent="Подарок уже у тебя";detail.textContent="Послание или практика ждут выше. А здесь — все мои услуги.";}
    else {badge.textContent="✦";head.textContent="Всё, с чем я могу помочь";detail.textContent="Если тебе выпадет скидка, новые цены появятся здесь автоматически.";}
  }
  function renderTabs(){
    const target=byId("category-tabs");target.replaceChildren();
    for(const cat of categories){
      const btn=document.createElement("button");
      btn.type="button";btn.className="tab"+(cat[0]===filter?" active":"");btn.textContent=cat[1];btn.setAttribute("aria-pressed",String(cat[0]===filter));
      btn.addEventListener("click",()=>{filter=cat[0];renderTabs();renderServices();});
      target.appendChild(btn);
    }
  }
  function makeSpan(cls,value,tag="span"){const el=document.createElement(tag);el.className=cls;el.textContent=value;return el;}
  function getUnit(item){return item[6] || "";}
  function formatted(item,n){return (getUnit(item)==="от"?"от ":"")+fmt(n)+(getUnit(item)==="за час"?" / час":"");}
  function renderServices(){
    const target=byId("services");target.replaceChildren();
    const filtered=priceList.filter(item=>(filter==="all"||item[4]===filter)&&[item[1],item[2],item[5]].join(" ").toLocaleLowerCase("ru").includes(query));
    const frag=document.createDocumentFragment();
    const disc=discountPercent();
    filtered.forEach(item=>{
      const price=item[3],newPrice=priceWithDiscount(price);
      const btn=document.createElement("button");btn.className="service"+(item[0]===selectedId?" is-selected":"");btn.type="button";btn.setAttribute("aria-label",item[1]+". "+formatted(item,newPrice)+". Выбрать услугу.");btn.setAttribute("aria-pressed",String(item[0]===selectedId));
      const content=document.createElement("span");content.style.minWidth="0";
      content.append(makeSpan("service-kind",item[2]),makeSpan("service-name",item[1],"strong"),makeSpan("service-details",item[5]));
      const cost=document.createElement("span");cost.className="service-cost";
      if(disc)cost.append(makeSpan("service-was",formatted(item,price),"del"));
      cost.append(makeSpan("service-now",formatted(item,newPrice),"strong"));
      if(disc)cost.append(makeSpan("service-save","Экономия "+fmt(price-newPrice)));
      btn.append(content,cost,makeSpan("service-arrow","↗"));
      btn.addEventListener("click",()=>{selectedId=item[0];renderServices();renderSelection(true)});
      frag.appendChild(btn);
    });
    target.appendChild(frag);
    byId("empty").hidden=filtered.length>0;
    byId("service-count").textContent=filtered.length+" / "+priceList.length;
  }
  function questionEligible(item){const gift=currentGift();return gift && gift.type==="question" && isActive() && item && item[4]==="consult";}
  function renderSelection(scroll=false){
    const item=priceList.find(p=>p[0]===selectedId),panel=byId("selection");if(!item){panel.hidden=true;return}
    panel.hidden=false;
    const discount=discountPercent(),was=item[3],now=priceWithDiscount(was),eligible=questionEligible(item);
    byId("selection-title").textContent=item[1];byId("selection-subtitle").textContent=item[5];
    byId("selection-old").textContent=discount?formatted(item,was):"";
    byId("selection-new").textContent=formatted(item,now);
    byId("selection-saving").textContent=discount?"Твоя экономия "+fmt(was-now):"По актуальному прайсу";
    const benefit=byId("selection-benefit");
    if(discount)benefit.textContent="✓ Персональная скидка "+discount+"% будет указана в заявке.";
    else if(eligible)benefit.textContent="✓ Дополнительный вопрос по этой же ситуации без доплаты.";
    else if(currentGift()?.type==="question"&&isActive()&&item[4]!=="consult")benefit.textContent="Бонус «+1 вопрос» доступен только для консультаций.";
    else benefit.textContent="Выбрана услуга. Осталось написать Лизе для записи.";
    byId("tg-request").href=telegramHref(buildRequest());
    byId("manual-request").hidden=true;
    byId("selection-help").textContent="Нажми «Написать Лизе» — в Telegram откроется готовый текст с услугой, призом и кодом. Останется нажать «Отправить».";
    if(scroll)panel.scrollIntoView({behavior:reduced()?"auto":"smooth",block:"start"});
  }
  function telegramHref(message){
    return "https://t.me/liz_ty666?text="+encodeURIComponent(message);
  }
  function giftTitle(){
    if(!saved)return "";
    return byId("gift-title").textContent || currentGift().title;
  }
  function buildGiftMessage(){
    if(!saved)return "";
    const gift=currentGift(),limited=isLimited(gift),active=isActive();
    const lines=[
      "Привет, Лиза! 🖤",
      "Я покрутила колесо Фортуны 10.10 и выиграла: «"+giftTitle()+"» 🎁",
      "Мой подарочный код: "+saved.code
    ];
    if(limited){
      lines.push(active?"Срок обращения: до "+deadlineMoscow():"Срок действия подарка уже истёк ("+deadlineMoscow()+").");
    }
    if(gift.type==="rune"||gift.type==="cards"){
      lines.push("Моё послание: "+byId("gift-description").textContent);
    }
    lines.push("");
    if(gift.type==="discount")lines.push(active?"Хочу воспользоваться скидкой. Подскажи, пожалуйста, как это сделать?":"Хочу уточнить, какие предложения сейчас доступны.");
    else if(gift.type==="question")lines.push(active?"Хочу использовать дополнительный вопрос к консультации. Как записаться?":"Хочу узнать о консультациях.");
    else if(gift.type==="claim")lines.push(active?"Хочу забрать свой подарок. Подскажи, пожалуйста, что для этого нужно?":"Хочу уточнить возможность получения подарка.");
    else lines.push("Спасибо за подарок! Хочу узнать о твоих услугах.");
    return lines.join("\n");
  }
  function buildRequest(){
    const item=priceList.find(p=>p[0]===selectedId);if(!item)return "";
    const gift=currentGift(),discount=discountPercent(),eligible=questionEligible(item);
    const lines=[
      "Привет, Лиза! 🖤",
      "Хочу записаться через Колесо Фортуны 10.10.",
      "",
      "Выбрала: "+item[1],
      "Направление: "+item[2],
      "Цена по прайсу: "+formatted(item,item[3])
    ];
    if(gift){
      lines.push("","Мой выигрыш: «"+giftTitle()+"» 🎁","Подарочный код: "+saved.code);
      if(isLimited(gift))lines.push(isActive()?"Срок действия: до "+deadlineMoscow():"Срок действия выигрыша закончился ("+deadlineMoscow()+").");
      if(gift.type==="cards"||gift.type==="rune")lines.push("Моё послание: "+byId("gift-description").textContent);
    }
    if(discount)lines.push("Моя скидка: "+discount+"%","Стоимость со скидкой: "+formatted(item,priceWithDiscount(item[3])));
    if(eligible)lines.push("Бонус: +1 уточняющий вопрос по той же ситуации.");
    lines.push("","Подскажи, пожалуйста, как оформить запись?");
    return lines.join("\n");
  }
  function textFallback(value){
    const input=document.createElement("textarea");input.value=value;input.style.cssText="position:fixed;left:-9999px;top:0";document.body.appendChild(input);input.focus();input.select();
    let ok=false;try{ok=document.execCommand("copy")}catch(_){}
    input.remove();return ok;
  }
  async function copyText(value){
    if(navigator.clipboard && window.isSecureContext){try{await navigator.clipboard.writeText(value);return true}catch(_){}}
    return textFallback(value);
  }
  async function copyGift(){
    if(!saved)return;
    const copied=await copyText(buildGiftMessage());
    byId("copy-gift").textContent=copied?"Сообщение скопировано ✓":"Скопируй код вручную";
    if(!copied){
      const el=byId("gift-code"),range=document.createRange();
      range.selectNodeContents(el);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  }
  async function copyRequest(){
    const text=buildRequest();if(!text)return;
    const copied=await copyText(text);
    if(copied){byId("selection-help").textContent="Готово! Заявка скопирована. Можешь вставить её в Telegram или открыть чат готовой кнопкой.";byId("copy-request").textContent="Заявка скопирована ✓";byId("manual-request").hidden=true;}
    else{const t=byId("manual-request");t.hidden=false;t.value=text;t.focus();t.select();byId("selection-help").textContent="Автоматическое копирование недоступно. Выдели текст ниже, скопируй вручную и отправь Лизе в Telegram.";}
  }
  function spinWheel(){
    if(spinning || saved)return;
    spinning=true;spin.disabled=true;spin.innerHTML="КОЛЕСО ВРАЩАЕТСЯ <span>✧</span>";status.textContent="Фортуна выбирает подарок. Подожди пару секунд…";
    const i=unbiasedIndex();saved={i,code:giftCode(),t:Date.now()};if(gifts[i].type==="cards")saved.card=unbiasedCard();if(gifts[i].type==="rune")saved.rune=unbiasedCard();persist();
    const deg=360*8+(360-i*(360/gifts.length));
    let done=false;
    function finished(){if(done)return;done=true;spinning=false;renderPrize(true);renderBanner();renderServices();renderSelection();celebrate();}
    const onEnd=ev=>{if(ev.target===rotor && ev.propertyName==="transform")finished()};
    rotor.addEventListener("transitionend",onEnd,{once:true});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{rotor.style.transform="rotate("+deg+"deg)";}));
    setTimeout(finished,reduced()?250:6750);
  }
  function init(){
    wheel();readStored();
    if(saved){rotor.style.transition="none";rotor.style.transform="rotate("+(360-saved.i*(360/gifts.length))+"deg)";renderPrize();}
    if(!priceList.length){byId("discount-text").textContent="Каталог временно недоступен. Напиши Лизе в Telegram.";byId("service-count").textContent="0";return}
    renderTabs();renderBanner();renderServices();renderSelection();
    spin.addEventListener("click",spinWheel);
    byId("copy-gift").addEventListener("click",copyGift);
    byId("copy-request").addEventListener("click",copyRequest);
    byId("clear-selection").addEventListener("click",()=>{selectedId=null;renderServices();renderSelection();});
    byId("search").addEventListener("input",e=>{query=e.target.value.trim().toLocaleLowerCase("ru");renderServices()});
    setInterval(()=>{if(!saved||spinning||!isLimited(currentGift()))return;const active=isActive();if(active!==lastActive){lastActive=active;renderPrize();renderBanner();renderServices();renderSelection();}},15000);
    lastActive=isActive();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();