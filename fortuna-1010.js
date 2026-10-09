/* Колесо Фортуны Лизы · 10.10.2026 */
(() => {
  "use strict";
  const gifts = [
    {short:"−10%",title:"Скидка 10% на любую услугу",type:"discount",percent:10,description:"Выбирай любое направление: консультации, обучение, свечи или рунические ставы. Скидка действует без минимальной суммы заказа."},
    {short:"Ритуал",title:"Ритуал намерения 10.10",type:"practice",description:"Твоя маленькая практика для нового этапа.",instruction:"Выдели 10 спокойных минут. На бумаге напиши две фразы: «Я перестаю поддерживать...» и «Я выбираю...». Под каждой укажи одно реальное действие, которое можешь выполнить в ближайшие сутки. Сохрани лист до конца месяца."},
    {short:"−15%",title:"Скидка 15% на любую услугу",type:"discount",percent:15,description:"В твоём распоряжении все форматы Лизы: консультации, обучение, свечи и рунические ставы. Никакого минимального чека."},
    {short:"Деньги",title:"Чек-лист «Деньги без хаоса»",type:"practice",description:"Пять простых вопросов, которые помогают навести порядок в денежном плане.",instruction:"1. Какая одна денежная цель важна в ближайшие 30 дней? 2. Какие три регулярные траты не приносят радости? 3. Где у тебя лежат забытые деньги или неиспользованные подписки? 4. Какую посильную сумму можешь отложить? 5. Какой один шаг к новому доходу сделаешь на этой неделе?"},
    {short:"+1 вопрос",title:"Один вопрос в подарок",type:"question",description:"Дополнительный уточняющий вопрос по той же ситуации без доплаты при записи на любую консультацию Лизы.",instruction:"Выбери консультацию из каталога и напиши Лизе код выигрыша. Бонус применяется к одной новой консультации и действует 48 часов после вращения."},
    {short:"Послание",title:"Твоё послание 10.10",type:"practice",description:"Тебе не нужно контролировать всё, чтобы двигаться вперёд.",instruction:"Один честный выбор бывает сильнее ста идеальных планов. Спроси себя сегодня: «Что я уже знаю, но до сих пор откладываю?» Запиши ответ и сделай один маленький шаг."},
    {short:"−20%",title:"Скидка 20% на любую услугу",type:"discount",percent:20,description:"Тебе выпала скидка 20% на консультации, обучение, свечи и рунические ставы. На любую сумму."},
    {short:"Любовь",title:"Практика «Мои границы»",type:"practice",description:"Небольшая письменная практика для ясности в отношениях.",instruction:"Ответь себе на три вопроса. Где я говорю «да», когда хочу сказать «нет»? О какой своей потребности я боюсь сообщить? Как выразить её спокойно и уважительно? Сформулируй одну фразу для реального разговора."},
    {short:"Руна",title:"Символическая подсказка: Иса",type:"practice",description:"Иса в рунической традиции ассоциируется с паузой и сосредоточенностью.",instruction:"Запиши две колонки: «что зависит от меня» и «что не зависит». Выбери действие из первой колонки. Используй этот символ для саморефлексии, а не как предсказание будущего."},
    {short:"−25%",title:"Скидка 25% на любую услугу",type:"discount",percent:25,description:"Твой особенный подарок: скидка 25% на любой формат Лизы — от одной свечи до комплексного обучения, без минимальной суммы."}
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
  function isLimited(gift) { return gift && (gift.type === "discount" || gift.type === "question"); }
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
      ctx.save();ctx.translate(C+Math.cos(mid)*335,C+Math.sin(mid)*335);ctx.rotate(mid+Math.PI/2);ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillStyle="#fbe6ca";ctx.shadowColor="rgba(0,0,0,.65)";ctx.shadowBlur=10;ctx.font="800 31px Manrope,Arial,sans-serif";ctx.fillText(gifts[i].short,0,0,185);ctx.restore();
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
    byId("gift-description").textContent=gift.description;
    byId("gift-code").textContent=saved.code;
    byId("gift-kicker").textContent=gift.type==="discount"?"ТВОЙ ПЕРСОНАЛЬНЫЙ БОНУС":gift.type==="question"?"ОСОБЫЙ ПОДАРОК":"ПОДАРОК ОТ ЛИЗЫ";
    const instructions=gift.type==="discount"?"Выбирай услугу ниже: система покажет стоимость с твоей скидкой. Чтобы забрать бонус, скопируй код и заявку и напиши Лизе в Telegram.":gift.instruction;
    byId("gift-instructions").textContent=instructions;
    byId("deadline").textContent=limited?(active?"Успей воспользоваться до "+deadlineMoscow():"Срок действия бонуса истёк ("+deadlineMoscow()+")."):"Подарок доступен прямо здесь. Сохрани текст или сделай скриншот.";
    byId("result-note").textContent=limited?"Для получения бонуса отправь код Лизе. Подтверждение заказа — в Telegram.":"Этот подарок можно сохранить и использовать самостоятельно.";
    byId("gift-catalog-link").textContent=gift.type==="practice"?"Посмотреть услуги ↓":"Выбрать услугу ↓";
    spin.disabled=true;
    spin.textContent="ПОДАРОК ПОЛУЧЕН ✦";
    status.textContent=limited&&!active?"Срок использования бонуса закончился.":"Твой подарок сохранён в этом браузере.";
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
    if(discount){badge.textContent="−"+discount+"%";head.textContent="Твоя скидка активна на все услуги";detail.textContent="Пересчитали все цены. Бонус действует до "+deadlineMoscow()+".";}
    else if(gift && gift.type==="question" && active){badge.textContent="+1";head.textContent="Дополнительный вопрос в подарок";detail.textContent="При выборе консультации добавим твой бонус в заявку. Действует до "+deadlineMoscow()+".";}
    else if(gift && isLimited(gift) && !active){badge.textContent="✧";head.textContent="Срок бонуса закончился";detail.textContent="Стоимость показана по обычному прайсу. Ты по-прежнему можешь выбрать услугу.";}
    else if(gift){badge.textContent="✦";head.textContent="Твой подарок уже получен";detail.textContent="Практика доступна выше, а ниже можно выбрать консультацию или обучение.";}
    else {badge.textContent="✦";head.textContent="Открой свой подарок — выбери услугу";detail.textContent="Когда выпадет скидка, стоимость автоматически изменится прямо в каталоге.";}
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
    byId("manual-request").hidden=true;byId("selection-help").textContent="Скопируй заявку и вставь её в сообщение Лизе. Оплата и подтверждение записи — в Telegram.";
    if(scroll)panel.scrollIntoView({behavior:reduced()?"auto":"smooth",block:"start"});
  }
  function buildRequest(){
    const item=priceList.find(p=>p[0]===selectedId);if(!item)return "";
    const d=discountPercent(),newP=priceWithDiscount(item[3]),bonus=currentGift(),eligible=questionEligible(item);
    const lines=["Здравствуйте, Лиза! Хочу записаться по акции «Колесо Фортуны 10.10».","", "Интересует: "+item[1],"Направление: "+item[2],"Цена по прайсу: "+formatted(item,item[3])];
    if(d)lines.push("Моя скидка: "+d+"%","Стоимость со скидкой: "+formatted(item,newP),"Подарочный код: "+saved.code,"Скидка действительна до "+deadlineMoscow());
    else if(eligible)lines.push("Мой бонус: один дополнительный уточняющий вопрос","Подарочный код: "+saved.code,"Бонус действителен до "+deadlineMoscow());
    else if(bonus?.type==="practice")lines.push("Мне также выпал подарок: "+bonus.title);
    lines.push("","Подскажите, пожалуйста, как записаться?");
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
    const gift=currentGift();const note=isLimited(gift)?" Срок: "+deadlineMoscow():"";
    const msg="Колесо Фортуны Лизы 10.10\nМой подарок: "+gift.title+"\nКод: "+saved.code+"\n"+(gift.instruction||gift.description)+"\n"+note;
    const copied=await copyText(msg);byId("copy-gift").textContent=copied?"Скопировано ✓":"Сделай скриншот приза";if(!copied){const el=byId("gift-code");const range=document.createRange();range.selectNodeContents(el);window.getSelection()?.removeAllRanges();window.getSelection()?.addRange(range);}
  }
  async function copyRequest(){
    const text=buildRequest();if(!text)return;
    const copied=await copyText(text);
    if(copied){byId("selection-help").textContent="✓ Заявка скопирована. Теперь открой Telegram и вставь её Лизе в чат.";byId("copy-request").textContent="Заявка скопирована ✓";byId("manual-request").hidden=true;}
    else{const t=byId("manual-request");t.hidden=false;t.value=text;t.focus();t.select();byId("selection-help").textContent="Автоматическое копирование недоступно. Выдели текст ниже, скопируй вручную и отправь Лизе в Telegram.";}
  }
  function spinWheel(){
    if(spinning || saved)return;
    spinning=true;spin.disabled=true;spin.innerHTML="ФОРТУНА ВЫБИРАЕТ <span>✧</span>";status.textContent="Колесо вращается. Твой выигрыш уже определён.";
    const i=unbiasedIndex();saved={i,code:giftCode(),t:Date.now()};persist();
    const deg=360*8+(360-i*36);
    let done=false;
    function finished(){if(done)return;done=true;spinning=false;renderPrize(true);renderBanner();renderServices();renderSelection();celebrate();}
    const onEnd=ev=>{if(ev.target===rotor && ev.propertyName==="transform")finished()};
    rotor.addEventListener("transitionend",onEnd,{once:true});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{rotor.style.transform="rotate("+deg+"deg)";}));
    setTimeout(finished,reduced()?250:6750);
  }
  function init(){
    wheel();readStored();
    if(saved){rotor.style.transition="none";rotor.style.transform="rotate("+(360-saved.i*36)+"deg)";renderPrize();}
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