// =====================================================
// MOTEUR DE RENDU
// Il lit les attributs data-render dans les pages HTML et injecte les blocs.
// Ne pas modifier pour les mises à jour normales du site.
// =====================================================
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s]));}
  function attrI18n(fr,en){let out=''; if(fr) out += ` data-fr="${esc(fr)}"`; if(en) out += ` data-en="${esc(en)}"`; return out;}
  function events(){return (window.BDE_EVENTS||[]).slice().sort((a,b)=>(a.order||999)-(b.order||999));}
  function transitionDelay(i){return i ? ` style="transition-delay:${(i*0.05).toFixed(2)}s"` : '';}
  function imgMarkup(src,alt){return `<img src="${esc(src)}" alt="${esc(alt||'')}" />`;}
  function i18nObj(v){
    if(v && typeof v === 'object') return { fr: v.fr || '', en: v.en || '' };
    return { fr: v || '', en: '' };
  }
  function formatEventDate(date,lang){
    if(!date) return '';
    const d = new Date(`${date}T00:00:00`);
    if(Number.isNaN(d.getTime())) return date;
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  }
  function eventDateText(e,lang){
    const status=i18nObj(e.statusLabel);
    const label=i18nObj(e.dateLabel);
    const readableDate = label[lang] || (e.date ? formatEventDate(e.date,lang) : '');
    if(e.showStatusWithDate === true && status[lang] && readableDate) return `${status[lang]} · ${readableDate}`;
    if(status[lang]) return status[lang];
    if(label[lang]) return label[lang];
    if(e.date) return formatEventDate(e.date,lang);
    return lang === 'en' ? 'Coming soon' : 'À venir';
  }
  function isPastStatus(e){
    const status=i18nObj(e.statusLabel);
    return ['passé','past'].includes(String(status.fr || '').toLowerCase()) || ['passé','past'].includes(String(status.en || '').toLowerCase());
  }
  function eventDateMarkup(e,mode){
    const status=i18nObj(e.statusLabel);
    const label=i18nObj(e.dateLabel);
    const hasCustomDateOrStatus=Boolean(status.fr || status.en || label.fr || label.en || e.date);
    const classes=['event-date'];
    if(mode) classes.push(`event-date--${mode}`);
    if(!hasCustomDateOrStatus) classes.push('event-date--soon');
    if(isPastStatus(e)) classes.push('event-date--past');
    if(e.statusColor === 'red') classes.push('event-date--red');
    const subFr=hasCustomDateOrStatus?'':'Date bientôt annoncée';
    const subEn=hasCustomDateOrStatus?'':'Date to be announced';
    return `<div class="${classes.join(' ')}"><span class="event-date-main"${attrI18n(eventDateText(e,'fr'),eventDateText(e,'en'))}>${esc(eventDateText(e,'fr'))}</span>${hasCustomDateOrStatus?'':`<span class="event-date-sub"${attrI18n(subFr,subEn)}>${esc(subFr)}</span>`}</div>`;
  }
  function eventHomeRow(e,i){
    return `<a href="evenements.html#${esc(e.slug)}" class="event-row reveal"${transitionDelay(i)}><div class="event-row-num">${esc(e.number)}</div><div><div class="event-row-title-line"><div class="event-row-name">${esc(e.title)}</div>${eventDateMarkup(e,'mobile')}</div><div class="event-row-meta"${attrI18n(e.homeDescriptionI18n?.fr||e.shortDescription,e.homeDescriptionI18n?.en||'')}>${esc(e.shortDescription)}</div></div>${eventDateMarkup(e,'desktop')}<div class="event-row-meta"${attrI18n(e.homePeriodI18n?.fr||e.homePeriod,e.homePeriodI18n?.en||'')}>${esc(e.homePeriod)}</div><span class="event-row-arrow">→</span></a>`;
  }
  function eventDetailSection(e,i,total){
    const imgs=e.images||[];
    const subImgs=imgs.slice(1).map(src=>`<div class="event-gallery-sub-item">${imgMarkup(src,e.title)}</div>`).join('');
    const imgBlock=`<div class="reveal"><div class="event-img-main">${imgMarkup(e.image||imgs[0],e.alt||e.title)}</div>${subImgs?`<div class="event-gallery-sub">${subImgs}</div>`:''}</div>`;
    let tags='';
    if((e.tags||[]).length===1){const t=e.tags[0];tags=`<span class="tag${t.red?' tag-red':''}" style="margin-bottom:14px;display:inline-block;"${attrI18n(t.i18n?.fr||t.label,t.i18n?.en||'')}>${esc(t.label)}</span>`;}
    else if((e.tags||[]).length>1){tags=`<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">${e.tags.map(t=>`<span class="tag${t.red?' tag-red':''}"${attrI18n(t.i18n?.fr||t.label,t.i18n?.en||'')}>${esc(t.label)}</span>`).join('')}</div>`;}
    const meta=(e.meta||[]).map(m=>`<div class="event-meta-item"><span class="event-meta-key"${attrI18n(m.keyI18n?.fr||m.key,m.keyI18n?.en||'')}>${esc(m.key)}</span><span class="event-meta-val"${attrI18n(m.valueI18n?.fr||m.value,m.valueI18n?.en||'')}>${esc(m.value)}</span></div>`).join('');
    const paras=(e.descriptionBlocks||[]).map(p=>`<p class="event-body"${attrI18n(p.i18n?.fr||p.text,p.i18n?.en||'')}>${esc(p.text)}</p>`).join('');
    const artistTags=(e.artists||[]).length?`<div class="artist-lineup">${e.artists.map(a=>`<span class="artist-tag${a.highlight?' highlight':''}">${esc(a.label)}</span>`).join('')}</div>`:'';
    const gallery=e.galleryPage?`<a href="${esc(e.galleryPage)}" class="event-gallery-link" data-fr="Galerie photos des éditions →" data-en="Photo gallery of past editions →">${esc(e.galleryLabel||'Galerie photos des éditions →')}</a>`:'';
    const dossierLabel=i18nObj(e.dossierLabel);
    const dossier=e.dossierUrl?`<a href="${esc(e.dossierUrl)}" class="event-dossier-link"${e.dossierDownload!==false?' download':''}${attrI18n(dossierLabel.fr||'Dossier à remplir',dossierLabel.en||'Form to complete')}>${esc(dossierLabel.fr||'Dossier à remplir')}</a>`:'';
    const content=`<div class="event-detail-content reveal" style="transition-delay:0.15s;"><div class="event-num">${esc(e.number)}</div>${tags}<h2 class="event-name-big">${esc(e.title)}</h2><div class="event-meta-list">${meta}</div>${paras}${artistTags}${gallery}${dossier}</div>`;
    return `<section id="${esc(e.slug)}" class="event-section"${i===total-1?' style="border-bottom:none;"':''}><div class="container"><div class="event-detail-grid${e.reverse?' reverse':''}">${imgBlock}${content}</div></div></section>`;
  }
  function artistCarousel(){
    const cards=((window.BDE_ARTISTS||{}).cards||[]).filter(a=>a.active!==false).sort((a,b)=>(a.order||999)-(b.order||999));
    return cards.map(a=>`<div class="artist-card${a.featured?' artist-card-featured':''}"><img src="${esc(a.image)}" alt="${esc(a.alt||a.name)}" /><div class="artist-card-overlay"></div><div class="artist-card-info"><div class="artist-card-year">${esc(a.yearEvent)}</div><div class="artist-card-name">${esc(a.name)}</div><div class="artist-card-event">${esc(a.eventText)}</div><div class="artist-card-badge">${esc(a.badge)}</div></div></div>`).join('');
  }
  function artistTextStrip(){
    return (((window.BDE_ARTISTS||{}).textStrip)||[]).map(n=>`<span class="artist-text-item">${esc(n)}</span><span class="artist-text-sep">·</span>`).join('');
  }
  function homeGalleryStrip(){
    const imgs=[]; (window.BDE_GALLERIES||[]).filter(g=>g.active!==false).forEach(g=>(g.images||[]).forEach(im=>{if(imgs.length<18 && im.src && !imgs.some(x=>x.src===im.src)) imgs.push(im);}));
    return imgs.map(im=>`<div class="galerie-strip-item"><img src="${esc(im.src)}" alt="${esc(im.alt||'')}" /></div>`).join('');
  }
  function renderGallery(el){
    const slug=el.dataset.gallerySlug;
    const g=(window.BDE_GALLERIES||[]).find(x=>x.slug===slug);
    if(!g) return;
    el.innerHTML=(g.images||[]).map((im,i)=>{
      if(g.lightboxMode==='lightbox'){
        return `<div class="gallery-item" onclick="openLightbox(${i})"><img src="${esc(im.src)}" alt="${esc(im.alt)}" /><div class="gallery-item-caption"><div class="caption-tag gallery-caption-tag"${attrI18n(im.tagI18n?.fr||im.tag,im.tagI18n?.en||'')}>${esc(im.tag)}</div><p class="gallery-caption-text"${attrI18n(im.captionI18n?.fr||im.caption,im.captionI18n?.en||'')}>${esc(im.caption)}</p></div></div>`;
      }
      return `<div class="gallery-item" data-src="${esc(im.src)}" data-caption="${esc(im.caption)}"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" /><div class="gallery-item-caption"><div class="caption-tag"${attrI18n(im.tagI18n?.fr||im.tag,im.tagI18n?.en||'')}>${esc(im.tag)}</div><p${attrI18n(im.captionI18n?.fr||im.caption,im.captionI18n?.en||'')}>${esc(im.caption)}</p></div></div>`;
    }).join('');
  }
  window.BDE_RENDER_ALL=function(){
    document.querySelectorAll('[data-render="nav"]').forEach(el=>{el.innerHTML=window.BDEComponents.nav();});
    document.querySelectorAll('[data-render="footer"]').forEach(el=>{el.innerHTML=window.BDEComponents.footer();});
    document.querySelectorAll('[data-render="ticket-modal"]').forEach(el=>{el.innerHTML=window.BDEComponents.ticketModal();});
    document.querySelectorAll('[data-render="sponsors-marquee"]').forEach(el=>{el.outerHTML=window.BDEComponents.sponsorsMarquee();});
    document.querySelectorAll('[data-render="partners-scroll"]').forEach(el=>{el.innerHTML=window.BDEComponents.partnersScroll();});
    document.querySelectorAll('[data-render="sponsor-cards"]').forEach(el=>{el.innerHTML=window.BDEComponents.sponsorCards();});
    document.querySelectorAll('[data-render="home-events"]').forEach(el=>{el.innerHTML=events().filter(e=>e.showOnHome!==false).map(eventHomeRow).join('');});
    document.querySelectorAll('[data-render="events-page"]').forEach(el=>{const list=events().filter(e=>e.showOnEventsPage!==false); el.outerHTML=list.map(eventDetailSection).join('');});
    document.querySelectorAll('[data-render="artists-carousel"]').forEach(el=>{el.innerHTML=artistCarousel();});
    document.querySelectorAll('[data-render="artists-text-strip"]').forEach(el=>{el.innerHTML=artistTextStrip();});
    document.querySelectorAll('[data-render="home-gallery-strip"]').forEach(el=>{el.innerHTML=homeGalleryStrip();});
    document.querySelectorAll('[data-render="gallery-masonry"]').forEach(renderGallery);
  };
})();
