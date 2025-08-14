/* ===== Simple i18n (AZ/EN/RU) ===== */
const I18N = {
    az: {
      nav: { home: "Ana səhifə", houses: "Bütün evlər", contact: "Əlaqə" },
      home: {
        hero_title: "Qəbələdə rahat evlər",
        hero_sub: "Təmiz, təhlükəsiz, ailəvi evlər — yerli dəstək ilə.",
        cta: "Bütün evlərə bax",
        cta_contact: "Zəng / WhatsApp",
        featured: "Seçilmiş evlər"
      },
      badges: {
        wifi: "✔️ Pulsuz Wi-Fi",
        parking: "✔️ Parkinq",
        ac: "✔️ İstilik və Kondisioner",
        support: "✔️ 24/7 Dəstək"
      },
      about: {
        title: "Haqqımızda",
        p1: "Biz Qəbələdən olan ailə biznesiyik. Dağ və meşə mənzərəli rahat evlər idarə edirik. Azərbaycan, türk və ingilis dillərində danışırıq.",
        p2: "Gizli ödəniş yoxdur. Tez cavab veririk. Fəaliyyətlər üçün yerli məsləhətlər (Nohur Gölü, Tufandağ, Yeddi Gözəl şəlaləsi, raftinq və s.)."
      },
      why: {
        title: "Niyə bizi seçirlər",
        direct_title: "Birbaşa bron",
        direct_desc: "Ən yaxşı qiymət və çevik giriş üçün WhatsApp-la birbaşa əlaqə.",
        clean_title: "Təmiz və komfortlu",
        clean_desc: "Təmiz yataq dəsti, tam mətbəx, etibarlı istilik/kondisioner.",
        location_title: "Əla yerləşmə",
        location_desc: "Tufandağa, Nohur gölünə və mərkəzə yaxın. Parkinq daxildir.",
        support_title: "Yerli dəstək",
        support_desc: "Transfer, fəaliyyətlər və restoran rezervasiyasında kömək."
      },
      list: {
        title: "Kirayə evlər",
        guests: "Qonaq",
        per_night: "gecə",
        filters: "Filterlər",
        filter_guests: "Qonaq sayı",
        filter_rooms: "Otaq sayı",
        filter_min_price: "Min qiymət",
        filter_min_price_ph: "məs. 80",
        filter_price: "Maks. qiymət",
        filter_price_ph: "məs. 250",
        filter_sauna: "Sauna",
        filter_pool: "Hovuz",
        search_this_area: "Bu ərazidə axtar",
        no_results: "Uyğun ev tapılmadı"
      },
      prop: {
        amenities: "İmkanlar",
        book_whatsapp: "WhatsApp ilə yaz",
        call_owner: "Zəng et",
        features: "Mənzil xüsusiyyətləri",  // NEW
        map: "Xəritə"                      // NEW
      },
      contact: {
        title: "Əlaqə",
        hours: "Adətən 08:00–23:00 arası dəqiqələr içində cavab veririk (AZT).",
        quick: "Sürətli sorğu",
        name: "Adınız",
        dates: "Tarixlər",
        dates_ph: "20–23 Avq",
        guests: "Qonaq sayı",
        notes: "Qeydlər",
        notes_ph: "Uşaq beşiyi lazımdır, Tufandağa yaxın…",
        send_wa: "WhatsApp-la göndər",
        map_note: "* Xəritə ümumi ərazini göstərir. Dəqiq ünvan bron sonra paylaşılır."
      },
      footer: { phone_label: "Telefon/WhatsApp:", email_label: "E-poçt:" },
      common: { clear: "Təmizlə", view: "Bax", per_night: "gecə" },
      amenities: {
        wifi: "Wi-Fi",
        parking: "Parkinq",
        sauna: "Sauna",
        bbq: "Manqal",
        ac: "Kondisioner",
        heating: "İstilik",
        kitchen: "Mətbəx",
        washer: "Paltaryuyan",
        fireplace: "Ocaq",
        mountain_view: "Dağ mənzərəsi"
      }
    },
  
    en: {
      nav: { home: "Home", houses: "All Houses", contact: "Contact" },
      home: {
        hero_title: "Cozy houses in <span>Gabala</span>",
        hero_sub: "Safe, clean, family-friendly stays with local support.",
        cta: "See All Houses",
        cta_contact: "Call / WhatsApp",
        featured: "Featured houses"
      },
      badges: {
        wifi: "✔️ Free Wi-Fi",
        parking: "✔️ Parking",
        ac: "✔️ Heating & A/C",
        support: "✔️ 24/7 Support"
      },
      about: {
        title: "About us",
        p1: "We are a small family business from Qəbələ. We manage comfortable houses with mountain and forest views. We speak Azeri, Turkish and English.",
        p2: "No hidden fees. Fast response. Local tips for activities (Nohur Lake, Tufandağ, Seven Beauties Waterfall, rafting and more)."
      },
      why: {
        title: "Why book with us",
        direct_title: "Direct booking",
        direct_desc: "Talk directly with us on WhatsApp for the best price and flexible check-in.",
        clean_title: "Clean & comfy",
        clean_desc: "Fresh linens, full kitchens and reliable heating/air conditioning.",
        location_title: "Great locations",
        location_desc: "Close to Tufandağ, Nohur Lake and city center. Parking included.",
        support_title: "Local support",
        support_desc: "We help with airport transfers, activities and restaurant reservations."
      },
      list: {
        title: "Rental Houses",
        guests: "Guests",
        per_night: "per night",
        filters: "Filters",
        filter_guests: "Guests",
        filter_rooms: "Rooms",
        filter_min_price: "Min price",
        filter_min_price_ph: "e.g. 80",
        filter_price: "Max price",
        filter_price_ph: "e.g. 250",
        filter_sauna: "Sauna",
        filter_pool: "Pool",
        search_this_area: "Search this area",
        no_results: "No matching houses"
      },
      prop: {
        amenities: "Amenities",
        book_whatsapp: "Message on WhatsApp",
        call_owner: "Call owner",
        features: "Apartment Features",  // NEW
        map: "Map"                       // NEW
      },
      contact: {
        title: "Contact us",
        hours: "We usually reply within minutes between 08:00–23:00 (AZT).",
        quick: "Quick request",
        name: "Your name",
        dates: "Dates",
        dates_ph: "20–23 Aug",
        guests: "Guests",
        notes: "Notes",
        notes_ph: "Need baby bed, near Tufandağ…",
        send_wa: "Send via WhatsApp",
        map_note: "* Map shows the general area. Exact address is shared after booking."
      },
      footer: { phone_label: "Phone/WhatsApp:", email_label: "Email:" },
      common: { clear: "Clear", view: "View", per_night: "per night" },
      amenities: {
        wifi: "Wi-Fi",
        parking: "Parking",
        sauna: "Sauna",
        bbq: "BBQ",
        ac: "Air conditioning",
        heating: "Heating",
        kitchen: "Kitchen",
        washer: "Washing machine",
        fireplace: "Fireplace",
        mountain_view: "Mountain view"
      }
    },
  
    ru: {
      nav: { home: "Главная", houses: "Все дома", contact: "Контакты" },
      home: {
        hero_title: "Уютные дома в <span>Габале</span>",
        hero_sub: "Безопасное и чистое жильё для семьи с местной поддержкой.",
        cta: "Посмотреть все дома",
        cta_contact: "Звонок / WhatsApp",
        featured: "Рекомендуемые дома"
      },
      badges: {
        wifi: "✔️ Бесплатный Wi-Fi",
        parking: "✔️ Парковка",
        ac: "✔️ Отопление и кондиционер",
        support: "✔️ Поддержка 24/7"
      },
      about: {
        title: "О нас",
        p1: "Мы семейный бизнес из Габалы. Управляем уютными домами с видом на горы и лес. Говорим на азербайджанском, турецком и английском.",
        p2: "Без скрытых платежей. Быстрые ответы. Местные советы по активностям (озеро Нохур, Туфандаг, водопад «Семь красавиц», рафтинг и др.)."
      },
      why: {
        title: "Почему выбирают нас",
        direct_title: "Прямое бронирование",
        direct_desc: "Пишите нам в WhatsApp для лучшей цены и гибкого заселения.",
        clean_title: "Чисто и комфортно",
        clean_desc: "Свежие постельные принадлежности, кухня и надёжное отопление/кондиционер.",
        location_title: "Отличное расположение",
        location_desc: "Рядом с Туфандагом, озером Нохур и центром. Парковка включена.",
        support_title: "Местная поддержка",
        support_desc: "Помогаем с трансфером, активностями и бронированием ресторанов."
      },
      list: {
        title: "Дома в аренду",
        guests: "Гостей",
        per_night: "за ночь",
        filters: "Фильтры",
        filter_guests: "Гостей",
        filter_rooms: "Комнаты",
        filter_min_price: "Мин. цена",
        filter_min_price_ph: "напр. 80",
        filter_price: "Макс. цена",
        filter_price_ph: "напр. 250",
        filter_sauna: "Сауна",
        filter_pool: "Бассейн",
        search_this_area: "Искать в этой области",
        no_results: "Дома не найдены"
      },
      prop: {
        amenities: "Удобства",
        book_whatsapp: "Написать в WhatsApp",
        call_owner: "Позвонить владельцу",
        features: "Особенности жилья",   // NEW
        map: "Карта"                     // NEW
      },
      contact: {
        title: "Связаться с нами",
        hours: "Обычно отвечаем в течение нескольких минут с 08:00 до 23:00 (AZT).",
        quick: "Быстрый запрос",
        name: "Ваше имя",
        dates: "Даты",
        dates_ph: "20–23 авг",
        guests: "Гостей",
        notes: "Примечания",
        notes_ph: "Нужна детская кроватка, ближе к Туфандагу…",
        send_wa: "Отправить в WhatsApp",
        map_note: "* На карте показан общий район. Точный адрес сообщается после бронирования."
      },
      footer: { phone_label: "Телефон/WhatsApp:", email_label: "Email:" },
      common: { clear: "Сброс", view: "Открыть", per_night: "за ночь" },
      amenities: {
        wifi: "Wi-Fi",
        parking: "Парковка",
        sauna: "Сауна",
        bbq: "Мангал",
        ac: "Кондиционер",
        heating: "Отопление",
        kitchen: "Кухня",
        washer: "Стиральная машина",
        fireplace: "Камин",
        mountain_view: "Вид на горы"
      }
    }
  };
  
  const FALLBACK_LANG = "en";
  
  function getInitialLang() {
    const fromQuery = new URLSearchParams(location.search).get("lang");
    const stored = localStorage.getItem("lang");
    return (fromQuery || stored || navigator.language.slice(0,2) || FALLBACK_LANG)
      .replace(/[^a-z]/gi,"").toLowerCase()
      .replace(/^tr$/,"az")
      .match(/^(az|en|ru)$/) ? RegExp.$1 : FALLBACK_LANG;
  }
  
  function t(key, lang) {
    const parts = key.split(".");
    let cur = I18N[lang] || I18N[FALLBACK_LANG];
    for (const p of parts) cur = cur?.[p];
    return cur ?? key;
  }
  
  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const value = t(key, lang);
      if (/<[^>]+>/.test(value)) el.innerHTML = value;
      else el.textContent = value;
    });
  
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const attr = el.getAttribute("data-i18n-attr");
      const val = t(key, lang);
      if (attr && val) el.setAttribute(attr, val);
    });
  
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  
    // 🔔 Notify the app so dynamic parts (like property description/features) can re-render
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const current = getInitialLang();
    applyTranslations(current);
    const sw = document.getElementById("langSwitcher");
    if (sw) {
      sw.value = current;
      sw.addEventListener("change", () => applyTranslations(sw.value));
    }
  });
  
  window.__i18n = {
    t,
    getLang: () => localStorage.getItem("lang") || getInitialLang()
  };
  
