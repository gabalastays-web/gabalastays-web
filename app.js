/* ========== CONFIG ========== */
const PHONE_E164 = '+994555235757'; // change to your WhatsApp/phone (no +)

/* ========== PROPERTY DATA (add coords/rooms/pool) ========== */
const PROPERTIES = [
    {
        id: 'pine-villa',
        name: 'Secluded Mountain Villa in Gabala',
        location: 'Gabala',
        price: 180,
        guests: 9,  // 7 + 2 fold-out
        rooms: 3,
        beds: 5,    // 3 + 2 fold-out
        baths: 3,   // 2 toilets + 1 full bath
        pool: true,
        sauna: false,
        wifi: true,
        ac: true,
        coords: [40.99551, 47.85731],
        images: [
          'assets/EV1_1.jpeg','assets/EV1_2.jpeg','assets/EV1_3.jpeg','assets/EV1_4.jpeg','assets/EV1_5.jpeg',
          'assets/EV1_6.jpeg','assets/EV1_7.jpeg','assets/EV1_8.jpeg','assets/EV1_9.jpeg','assets/EV1_10.jpeg',
          'assets/EV1_11.jpeg','assets/EV1_12.jpeg','assets/EV1_13.jpeg','assets/EV1_14.jpeg','assets/EV1_15.jpeg',
          'assets/EV1_16.jpeg','assets/EV1_17.jpeg','assets/EV1_18.jpeg','assets/EV1_19.jpeg','assets/EV1_20.jpeg',
          'assets/EV1_21.jpeg'
        ],
        // ✅ Localized description
  description: {
    az: 'Bu şəxsi villa 9 nəfərə qədər yerləşmə imkanı təqdim edir, 3 yataq otağı, hovuz, manqallı açıq mətbəx, Wi-Fi, kondisioner və televizorlarla təchiz olunub.',
    en: 'This private villa sleeps up to 9 guests, featuring 3 bedrooms, a pool, outdoor kitchen with BBQ, Wi-Fi, AC, and TVs.',
    ru: 'Эта частная вилла вмещает до 9 гостей, имеет 3 спальни, бассейн, летнюю кухню с барбекю, Wi-Fi, кондиционер и телевизоры.'
  },

  // ✅ Localized features list (optional but best)
  features: {
    az: [
      'Yataq otaqları: 3',
      'Qonaq otağı: 1 (TV ilə)',
      'Mətbəx: Tam təchiz olunmuş',
      'Yerləşmə: 7 nəfər + 2 açılan çarpayı (cəmi 9 qonaq)',
      'Sanitar qovşaqlar: 2 tualet + 1 hamam',
      'Bütün otaqlarda kondisioner',
      'Mətbəxdə də TV',
      'Wi-Fi',
      'Şəxsi isidilən hovuz (6×4 m)',
      'Ayrı açıq mətbəx və manqal zonası',
      'Dincəlmək üçün geniş həyət'
    ],
    en: [
      'Bedrooms: 3',
      'Living room: 1 (with TV)',
      'Kitchen: Fully equipped',
      'Sleeps 7 + 2 fold-out beds (total 9 guests)',
      'Bathrooms: 2 toilets + 1 full bathroom',
      'Air conditioning in all rooms',
      'TV in the kitchen as well',
      'Wi-Fi',
      'Private heated pool (6×4 m)',
      'Separate outdoor kitchen & BBQ area',
      'Spacious yard for relaxation'
    ],
    ru: [
      'Спален: 3',
      'Гостиная: 1 (с ТВ)',
      'Кухня: полностью оборудована',
      'Размещение: 7 + 2 раскладных (всего 9 гостей)',
      'Санузлы: 2 туалета + 1 ванная',
      'Кондиционер во всех комнатах',
      'ТВ также на кухне',
      'Wi-Fi',
      'Частный подогреваемый бассейн (6×4 м)',
      'Отдельная летняя кухня и барбекю-зона',
      'Просторный двор для отдыха'
    ]
  },

  // keep generic amenity flags; labels can stay via i18n or features above
  amenities: ['Free Wi-Fi','Parking','BBQ','Heating & A/C','Fully Equipped Kitchen','Washing machine']
}
      ,
  {
    id: 'forest-cabin',
    name: 'Forest Cabin',
    location: 'Near Tufandağ',
    price: 140,
    guests: 4,
    rooms: 2,
    beds: 2,
    baths: 1,
    pool: false,
    sauna: false,
    wifi: true,
    ac: true,
    coords: [40.9827, 47.8549], // approx Tufandağ side
    images: ['assets/forest-1.jpg','assets/forest-2.jpg','assets/forest-3.jpg'],
    description: 'Cozy cabin surrounded by trees. Perfect for couples or small families.',
    amenities: ['Free Wi-Fi','Parking','Heating & A/C','Kitchen']
  },
  {
    id: 'river-house',
    name: 'River House',
    location: 'Damiraparan River',
    price: 220,
    guests: 8,
    rooms: 4,
    beds: 4,
    baths: 2,
    pool: true,
    sauna: true,
    wifi: true,
    ac: true,
    coords: [40.9818, 47.8458], // approx center/river
    images: ['assets/river-1.jpg','assets/river-2.jpg','assets/river-3.jpg'],
    description: 'Spacious house by the river with terrace and firepit. Great for groups.',
    amenities: ['Free Wi-Fi','Parking','BBQ','Sauna','Heating & A/C','Kitchen','Fireplace']
  }
];

/* ========== UTILITIES ========== */
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];
function formatPriceAZN(amount) {
  const lang = window.__i18n?.getLang?.() || 'en';
  return new Intl.NumberFormat(lang, { style: "currency", currency: "AZN", maximumFractionDigits: 0 }).format(amount);
}
const money = v => `${formatPriceAZN(v)}`;

/* ========== OPTIONAL i18n safe helpers ========== */
const T = {
  t: (k) => (window.__i18n?.t?.(k, window.__i18n?.getLang?.()) ?? k),
  lang: () => (window.__i18n?.getLang?.() || 'en')
};

/* ========== HOME: FEATURED ========== */
document.addEventListener('i18n:changed', renderFeatured);
function renderFeatured(){
    const wrap = qs('#featured');
    if(!wrap) return;
    wrap.innerHTML = PROPERTIES.slice(0,3).map(toCard).join('');
  }
  // run once on page load
  renderFeatured();
  

/* ========== LEAFLET HELPERS (work only if Leaflet is loaded and target div exists) ========== */
function canUseLeaflet() { return typeof L !== 'undefined'; }

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

/* ========== LIST PAGE (filters + map) ========== */
(function renderList(){
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
  
      if (f.guests)  data = data.filter(p => (f.guests === '10+') ? p.guests >= 10 : p.guests >= Number(f.guests));
      if (f.rooms)   data = data.filter(p => (f.rooms.includes('+')) ? p.rooms >= Number(f.rooms) : p.rooms >= Number(f.rooms));
      if (f.minPrice) data = data.filter(p => p.price >= Number(f.minPrice));
      if (f.maxPrice) data = data.filter(p => p.price <= Number(f.maxPrice));
      if (f.withSauna === 'on') data = data.filter(p => p.sauna);
      if (f.withPool  === 'on') data = data.filter(p => p.pool);
  
      renderCards(data);
      refreshMarkers(data);
    };
  
    // events
    form?.addEventListener('submit', e => { e.preventDefault(); apply(); });
    form?.addEventListener('reset', () => setTimeout(()=>{ renderCards(PROPERTIES); refreshMarkers(PROPERTIES); },0));
    form?.addEventListener('change', () => apply());  // live like Booking
  
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
  })();
  

/* ========== PROPERTY PAGE (full gallery + small map, with i18n description & features) ========== */
/* ========== PROPERTY PAGE (full gallery + small map, with i18n description & features) ========== */
function renderPropertyPage(){
    const box = qs('#property');
    if(!box) return;
  
    const id = new URLSearchParams(location.search).get('id');
    const p = PROPERTIES.find(x => x.id === id) || PROPERTIES[0];
    document.title = `${p.name} • Gabala Stays`;
  
    const lang = T.lang();
  
    // helper: pick localized value (object with az/en/ru) or plain string fallback
    const pick = (val) => {
      if (typeof val === 'string') return val;
      if (val && typeof val === 'object') return val[lang] || val.en || Object.values(val)[0] || '';
      return '';
    };
  
    const desc = pick(p.description);
    const features = Array.isArray(p.features)
      ? p.features
      : (p.features ? (p.features[lang] || p.features.en || []) : []);
  
    const gallery = (p.images || []).map(src => `
      <img src="${src}" alt="${p.name}" onerror="this.style.display='none'">
    `).join('');
  
    box.innerHTML = `
      <div class="property-hero">
        <div class="gallery gallery-all">
          ${gallery}
        </div>
        <div class="card">
          <h1>${p.name}</h1>
          <p class="muted">${p.location}</p>
  
          <div class="price-line">
            <strong>${money(p.price)} / ${T.t('common.per_night') || 'per night'}</strong>
            <a class="btn btn-sm" href="contact.html">${T.t('nav.contact') || 'Contact'}</a>
          </div>
  
          <p style="margin-top:10px">${desc}</p>
  
          ${features.length ? `
            <h3 style="margin:12px 0 6px">${T.t('prop.features') || 'Apartment Features'}</h3>
            <ul class="features-list" style="list-style:none;padding:0;margin:8px 0 14px;">
              ${features.map(f => `<li style="margin:6px 0;line-height:1.4;">${f}</li>`).join('')}
            </ul>
          ` : ''}
  
          <div class="meta" style="margin:10px 0">
            👥 ${p.guests} • 🛏️ ${p.beds} • 🛁 ${p.baths} • 🏠 ${p.rooms} ${p.rooms>1?'rooms':'room'}
            ${p.pool ? ' • 🏊 pool' : ''}
            ${p.sauna ? ' • ♨️ sauna' : ''}
          </div>
  
          <h3 style="margin:12px 0 6px">${T.t('prop.amenities') || 'Amenities'}</h3>
          <div class="amenities">
            ${(p.amenities || []).map(a=>`<span>${a}</span>`).join('')}
          </div>
  
          <div style="margin-top:14px">
            <a class="btn" href="https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
              `Hello! I want to book ${p.name} (${p.guests} guests). Dates:`
            )}">${T.t('prop.book_whatsapp') || 'Message on WhatsApp'}</a>
            <a class="btn btn-ghost" href="tel:+${PHONE_E164}">${T.t('prop.call_owner') || 'Call owner'}</a>
          </div>
  
          <!-- Small map for the property -->
          <h3 style="margin:18px 0 8px">${T.t('prop.map') || 'Map'}</h3>
          <div id="propMap" style="height:300px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08)"></div>
        </div>
      </div>
    `;
  
    // Initialize the small Leaflet map
    try {
      if (typeof makePropertyMap === 'function') {
        makePropertyMap(p);
      } else if (typeof L !== 'undefined' && p.coords) {
        const map = L.map('propMap').setView(p.coords, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.name}</strong><br>${p.location}`).openPopup();
      }
    } catch(e){}
  }
  
  // run on page load
  renderPropertyPage();
  
  // run again whenever language changes
  document.addEventListener('i18n:changed', renderPropertyPage);
  
  

/* ========== CONTACT — WhatsApp form glue ========== */
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

/* ========== FOOTER YEAR ========== */
(function(){
  const y = qs('#year');
  if(y) y.textContent = new Date().getFullYear();
})();

/* ========== CARD RENDERER (list/featured) ========== */
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
