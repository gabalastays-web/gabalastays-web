// ====== GLOBAL STATE ======
let PROPERTIES = []; // filled from /data/properties.json

/* ========== CONFIG ========== */
const PHONE_E164 = '994555235757'; // WhatsApp/phone without leading '+'

// ====== BOOTSTRAP ======
async function loadProperties() {
  try {
    const res = await fetch('data/properties.json', { cache: 'no-store' });
    const data = await res.json();

    PROPERTIES = (data.properties || []).map(p => {
      // normalize coords: allow {lat,lng} or [lat,lng]
      const coords = p.coords
        ? (Array.isArray(p.coords)
            ? p.coords
            : (typeof p.coords === 'object' && p.coords.lat != null && p.coords.lng != null
                ? [p.coords.lat, p.coords.lng]
                : p.coords))
        : null;

      // normalize images: accept "path.jpg" OR { image/url/src: "path.jpg" }
      const images = (p.images || [])
        .map(img => {
          let path = '';
          if (typeof img === 'string') path = img;
          else if (img && typeof img === 'object') path = img.image || img.url || img.src || '';
          if (!path) return '';
          if (path.startsWith('/')) path = path.slice(1); // keep relative
          return path;
        })
        .filter(Boolean);

      return { ...p, coords, images };
    }).filter(p => p.active !== false);

  } catch (e) {
    console.error('Failed to load data/properties.json', e);
    PROPERTIES = [];
  }
}

async function start() {
  await loadProperties();
  renderFeatured();
  renderListPage?.();
  renderPropertyPage?.();
  addAdminButton?.(); // safe-call in case not needed
}

document.addEventListener('DOMContentLoaded', start);

// re-render on language change
document.addEventListener('i18n:changed', () => {
  renderFeatured?.();
  renderListPage?.();
  renderPropertyPage?.();
});

// ====== UTIL ======
const qs  = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];
function formatPriceAZN(amount) {
  const lang = window.__i18n?.getLang?.() || 'en';
  return new Intl.NumberFormat(lang, { style: "currency", currency: "AZN", maximumFractionDigits: 0 }).format(amount);
}
const money = v => `${formatPriceAZN(v)}`;
const T = {
  t: (k) => (window.__i18n?.t?.(k, window.__i18n?.getLang?.()) ?? k),
  lang: () => (window.__i18n?.getLang?.() || 'en')
};

// ====== HOME: FEATURED ======
function renderFeatured(){
  const wrap = qs('#featured');
  if(!wrap) return;
  wrap.innerHTML = PROPERTIES.slice(0,3).map(toCard).join('');
}
document.addEventListener('i18n:changed', renderFeatured);

// ====== LEAFLET HELPERS ======
function canUseLeaflet(){ return typeof L !== 'undefined'; }

function makeListMap() {
  const el = qs('#map');
  if (!el || !canUseLeaflet()) return null;
  const map = L.map('map').setView([40.9810, 47.8450], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  const layer = L.layerGroup().addTo(map);
  return { map, layer };
}

function refreshListMarkers(ctx, props){
  if (!ctx) return;
  const { map, layer } = ctx;
  layer.clearLayers();
  const bounds = [];
  props.forEach(p => {
    if (!p.coords) return;
    const [lat,lng] = p.coords;
    const m = L.marker([lat,lng]).addTo(layer);
    const thumb = p.images?.[0] ? `<img src="${p.images[0]}" style="width:100%;border-radius:8px;margin-bottom:6px;">` : '';
    m.bindPopup(`
      <div style="width:220px">
        ${thumb}
        <strong>${p.name}</strong><br>
        ${p.location}<br>
        ${money(p.price)} / ${T.t('common.per_night') || 'per night'}<br>
        <a href="property.html?id=${p.id}" class="btn btn-sm" style="margin-top:6px;display:inline-block;">${T.t('common.view') || 'View'}</a>
      </div>
    `);
    bounds.push([lat,lng]);
  });
  if (bounds.length) { try { map.fitBounds(bounds, { padding: [30,30] }); } catch(e){} }
}

function makePropertyMap(p) {
  const el = qs('#propMap');
  if (!el || !canUseLeaflet() || !p?.coords) return null;
  const map = L.map('propMap').setView(p.coords, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.name}</strong><br>${p.location}`).openPopup();
  return map;
}

// ====== LIST PAGE ======
function renderListPage(){
  const list = qs('#list');
  if(!list) return;

  // Map init only if Leaflet available
  let map, markersLayer;
  const mapEl = qs('#map');
  if (typeof L !== 'undefined' && mapEl){
    map = L.map('map').setView([40.9810, 47.8450], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  const renderCards = (arr) => {
    list.innerHTML = arr.map(toCard).join('');
    const no = qs('#noResults');
    if (no) no.style.display = arr.length ? 'none' : 'block';
  };

  const refreshMarkers = (arr) => {
    if (!map || !markersLayer) return;
    markersLayer.clearLayers();
    const bounds = [];
    arr.forEach(p => {
      if (!p.coords) return;
      const [lat,lng] = p.coords;
      const m = L.marker([lat,lng]).addTo(markersLayer);
      const thumb = p.images?.[0] ? `<img src="${p.images[0]}" style="width:100%;border-radius:8px;margin-bottom:6px;">` : '';
      m.bindPopup(`
        <div style="width:220px">
          ${thumb}
          <strong>${p.name}</strong><br>
          ${p.location}<br>
          ${formatPriceAZN(p.price)} / ${(window.__i18n?.t?.('common.per_night')||'gecə')}
          <br><a class="btn btn-sm" style="margin-top:6px;display:inline-block" href="property.html?id=${p.id}">${window.__i18n?.t?.('common.view')||'Bax'}</a>
        </div>
      `);
      bounds.push([lat,lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding:[30,30] });
  };

  const form = qs('#filters');
  const apply = () => {
    const f = Object.fromEntries(new FormData(form).entries());
    let data = [...PROPERTIES];

    if (f.guests)   data = data.filter(p => (f.guests === '10+') ? p.guests >= 10 : p.guests >= Number(f.guests));
    if (f.rooms)    data = data.filter(p => (f.rooms.includes('+')) ? p.rooms >= Number(f.rooms) : p.rooms >= Number(f.rooms));
    if (f.minPrice) data = data.filter(p => p.price >= Number(f.minPrice));
    if (f.maxPrice) data = data.filter(p => p.price <= Number(f.maxPrice));
    if (f.withSauna === 'on') data = data.filter(p => p.sauna);
    if (f.withPool  === 'on') data = data.filter(p => p.pool);

    renderCards(data);
    refreshMarkers(data);
  };

  form?.addEventListener('submit', e => { e.preventDefault(); apply(); });
  form?.addEventListener('reset', () => setTimeout(()=>{ renderCards(PROPERTIES); refreshMarkers(PROPERTIES); },0));
  form?.addEventListener('change', apply);

  // “Search this area”
  qs('#mapSearchBtn')?.addEventListener('click', () => {
    if (!map) return;
    const b = map.getBounds();
    const inView = PROPERTIES.filter(p => p.coords && b.contains(L.latLng(p.coords[0], p.coords[1])));
    renderCards(inView);
    refreshMarkers(inView);
  });

  // initial
  renderCards(PROPERTIES);
  refreshMarkers(PROPERTIES);
}

// ====== PROPERTY PAGE ======
function renderPropertyPage(){
  const box = qs('#property');
  if(!box) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = PROPERTIES.find(x => x.id === id) || PROPERTIES[0];
  if (!p) return;

  document.title = `${p.name} • Gabala Stays`;

  const lang = T.lang();
  const t = (k, def='') => (window.__i18n?.t?.(k, lang) ?? def ?? k);

  // Helper to pick the right language from an object {az,en,ru} or use string directly
  const pick = (val) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') return val[lang] || val.en || Object.values(val)[0] || '';
    return '';
  };

  const desc = pick(p.description);

  // FEATURES: accept plain strings or {item:"..."}; accept array OR {az/en/ru:[]}
  const rawFeatures =
    Array.isArray(p.features) ? p.features
    : (p.features ? (p.features[lang] || p.features.en || []) : []);
  const features = (rawFeatures || [])
    .map(f => typeof f === 'string' ? f : (f.item || f.text || f.label || ''))
    .filter(Boolean);

  // AMENITIES: map free-text (from JSON) to amenity keys, then translate via i18n
  const normalizeAmenity = (s) => (s||'').toString().trim().toLowerCase()
    .replace(/\s+/g,' ')
    .replace(/[._-]/g,' ')
    .replace(/&/g,'and');

  const AMENITY_MAP = {
    'free wi fi': 'wifi',
    'wi fi': 'wifi',
    'wifi': 'wifi',
    'parking': 'parking',
    'bbq': 'bbq',
    'barbecue': 'bbq',
    'heating and a c': 'ac',
    'heating and ac': 'ac',
    'heating a c': 'ac',
    'air conditioning': 'ac',
    'heating': 'heating',
    'kitchen': 'kitchen',
    'fully equipped kitchen': 'kitchen',
    'washing machine': 'washer',
    'washer': 'washer',
    'fireplace': 'fireplace',
    'mountain view': 'mountain_view',
    'sauna': 'sauna',
    'pool': 'pool'
  };

  const translatedAmenities = (p.amenities || []).map(a => {
    const key = AMENITY_MAP[ normalizeAmenity(a) ];
    if (key && t(`amenities.${key}`)) return t(`amenities.${key}`);
    if (key === 'pool') return t('list.filter_pool', 'Pool'); // reuse existing label
    return a; // fallback to original text if we can't map it
  });

  // META labels (reuse existing i18n)
  const roomsLabel = t('list.filter_rooms', 'Rooms');
  const poolLabel  = t('list.filter_pool', 'Pool');

  // Build compact gallery: 6 thumbs, "+N" on the 6th
  const images = Array.isArray(p.images) ? p.images : [];
  const SHOW_COUNT = 6;
  const thumbs = images.slice(0, SHOW_COUNT);
  const remaining = Math.max(0, images.length - SHOW_COUNT);

  const galleryThumbs = `
    <div class="gallery-compact">
      ${thumbs.map((src, i) => {
        const isMore = (i === SHOW_COUNT - 1) && remaining > 0;
        return `
          <button type="button" class="gc-thumb ${isMore ? 'gc-thumb--more' : ''}" data-idx="${i}">
            <img src="${src}" alt="${p.name} photo ${i+1}" loading="lazy">
            ${isMore ? `<span class="gc-badge">+${remaining}</span>` : ''}
          </button>
        `;
      }).join('')}
    </div>
  `;

  box.innerHTML = `
    <div class="property-hero">
      <div class="gallery gallery-thumbs">${galleryThumbs}</div>
      <div class="card">
        <h1>${p.name}</h1>
        <p class="muted">${p.location}</p>

        <div class="price-line">
          <strong>${money(p.price)} / ${t('common.per_night','per night')}</strong>
          <a class="btn btn-sm" href="contact.html">${t('nav.contact','Contact')}</a>
        </div>

        <p style="margin-top:10px">${desc}</p>

        ${features.length ? `
          <h3 style="margin:12px 0 6px">${t('prop.features','Apartment Features')}</h3>
          <ul class="features-list" style="list-style:none;padding:0;margin:8px 0 14px;">
            ${features.map(f => `<li style="margin:6px 0;line-height:1.4;">${f}</li>`).join('')}
          </ul>` : ''}

        <div class="meta" style="margin:10px 0">
          👥 ${p.guests} • 🛏️ ${p.beds} • 🛁 ${p.baths} • 🏠 ${p.rooms} ${roomsLabel}
          ${p.pool ? ` • 🏊 ${poolLabel}` : ''}${p.sauna ? ' • ♨️ ' + t('amenities.sauna','Sauna') : ''}
        </div>

        <h3 style="margin:12px 0 6px">${t('prop.amenities','Amenities')}</h3>
        <div class="amenities">
          ${translatedAmenities.map(a=>`<span>${a}</span>`).join('')}
        </div>

        <div style="margin-top:14px">
          <a class="btn" href="https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
            `Hello! I want to book ${p.name} (${p.guests} guests). Dates:`
          )}">${t('prop.book_whatsapp','Message on WhatsApp')}</a>
          <a class="btn btn-ghost" href="tel:+${PHONE_E164}">${t('prop.call_owner','Call owner')}</a>
        </div>

        <h3 style="margin:18px 0 8px">${t('prop.map','Map')}</h3>
        <div id="propMap" style="height:300px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08)"></div>
      </div>
    </div>
  `;

  // Lightbox hookups
  box.querySelectorAll('.gc-thumb').forEach(btn => {
    btn.addEventListener('click', () => openFullGallery(images));
  });

  try { if (typeof makePropertyMap === 'function') makePropertyMap(p); } catch(e){}
}

function openFullGallery(images){
  if (!images || !images.length) return;

  const el = document.createElement('div');
  el.className = 'lb';
  el.innerHTML = `
    <div class="lb-bg" onclick="this.closest('.lb').remove()"></div>
    <div class="lb-panel" role="dialog" aria-modal="true">
      <button class="lb-x" aria-label="Close" onclick="this.closest('.lb').remove()">×</button>
      <div class="lb-grid">
        ${images.map(src => `<img src="${src}" alt="">`).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

// ====== CONTACT — WhatsApp form glue ======
(function contactForm(){
  const f = qs('#requestForm');
  if(!f) return;
  const waLink = qs('#waLink');
  const mkText = (o) => `Hello! My name is ${o.name}. Dates: ${o.dates}. Guests: ${o.guests}. ${o.notes?`Notes: ${o.notes}`:''}`;
  const buildHref = (t) => `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(t)}`;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const o = Object.fromEntries(new FormData(f).entries());
    const href = buildHref(mkText(o));
    window.open(href, '_blank');
  });
  if (waLink) waLink.setAttribute('href', buildHref('Hello Gabala Stays!'));
})();

// ====== FOOTER YEAR ======
(function(){
  const y = qs('#year');
  if(y) y.textContent = new Date().getFullYear();
})();

// ====== CARD RENDERER ======
function toCard(p){
  return `
  <article class="card">
    <a href="property.html?id=${p.id}">
      <img src="${p.images?.[0] || ''}" alt="${p.name}">
    </a>
    <h3>${p.name}</h3>
    <p class="muted">${p.location}</p>
    <div class="meta">
      👥 ${p.guests} • 🛏️ ${p.beds} • 🛁 ${p.baths} • 🏠 ${p.rooms}
      ${p.pool ? ' • 🏊' : ''} ${p.sauna ? ' • ♨️' : ''}
    </div>
    <div class="price-line">
      <strong>${money(p.price)} / ${T.t('common.per_night') || 'per night'}</strong>
      <a class="btn btn-sm" href="property.html?id=${p.id}">${T.t('common.view') || 'View'}</a>
    </div>
  </article>`;
}

/* ====== ADMIN BUTTON (bottom-right) ======
   - Shows on all environments; change SHOW_ALWAYS to false if you want localhost-only.
*/
function addAdminButton() {
  const SHOW_ALWAYS = true;
  if (!SHOW_ALWAYS) {
    const isLocal = /localhost|127\.0\.0\.1/.test(location.hostname);
    if (!isLocal) return;
  }
  if (document.querySelector('.fab-admin')) return;

  const a = document.createElement('a');
  a.href = '/admin/';
  a.className = 'fab fab-admin';
  a.textContent = 'Admin';
  a.title = 'Open Admin';
  a.setAttribute('aria-label', 'Admin');
  document.body.appendChild(a);
}
