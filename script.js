<!-- script.js -->
/* ===========================
   Language (base = uk)
=========================== */
let userLang = "uk"; // базова мова

// Тексти стартового екрану
const startTranslations = {
  uk: {
    mainTitle: "Твій кавовий настрій",
    title: "🤖 Наш кавовий AI-асистент підкаже твою наступну улюблену каву ☕️",
    text: "Всього кілька питань — і ми підберемо смак, який пасує до твого настрою.",
    button: "🚀 Почати"
  },
  en: {
    mainTitle: "Your Coffee Mood",
    title: "🤖 Our coffee AI assistant will suggest your next favorite cup ☕️",
    text: "Just a few questions — and we’ll match a coffee to your current vibe.",
    button: "🚀 Let's go"
  }
};

// Фрази для фіналу
const endPhrases = {
  uk: [
    "😏 Чудовий вибір! Замов і зареєструйся в нашому клубі, щоб отримати ще більше!",
    "🎯 У тебе чудовий смак! Час замовити каву та приєднатися до нашої спільноти!",
    "☕ Оце результат! Придбай каву та ставай учасником клубу кавових ентузіастів.",
    "😉 А тепер мершій реєструватися до нашої міжнародної спільноти кавоманів!",
    "✨ У тебе є смак до життя! Розділи досвід з нами у клубі!"
  ],
  en: [
    "😏 Great choice! Order now and join our club for more perks!",
    "🎯 You’ve got great taste! Time to order your coffee and join our community!",
    "☕ That’s the result! Just one step left — grab your coffee and sign up!",
    "😉 One of my favorites too! Join our international coffee club!",
    "✨ You clearly have a taste for life! Share it with us in the club!"
  ]
};

/* ===========================
   Quiz data
=========================== */

// Fun + ключові питання (мультимовні)
const questions = [
  {
    text: { uk: "🍰 Улюблений десерт дитинства?", en: "🍰 Childhood favorite dessert?" },
    answers: [
      { text: { uk: "Шоколадний торт", en: "Chocolate cake" }, tags: { choco: 2, espresso: 1 }, img: "images/dessert_choco.png" },
      { text: { uk: "Мармелад", en: "Marmalade" }, tags: { fruit: 2, filter: 1 }, img: "images/dessert_marmelad.png" },
      { text: { uk: "Халва", en: "Halva" }, tags: { dark: 2, moka: 1 }, img: "images/dessert_halva.png" },
      { text: { uk: "Медовик", en: "Honey cake" }, tags: { dessert: 2, espresso: 1 }, img: "images/dessert_honey.png" }
    ]
  },
  {
    text: { uk: "🍊 Який фрукт твій улюблений?", en: "🍊 Your favorite fruit?" },
    answers: [
      { text: { uk: "Ягода", en: "Berry" }, tags: { fruit: 2, filter: 1 }, img: "images/fruit_berry.png" },
      { text: { uk: "Цитрус", en: "Citrus" }, tags: { fruit: 2, filter: 1 }, img: "images/fruit_citrus.png" },
      { text: { uk: "Яблуко/груша", en: "Apple/Pear" }, tags: { choco: 1 }, img: "images/fruit_apple.png" },
      { text: { uk: "Сухофрукти", en: "Dried fruits" }, tags: { dark: 2, moka: 1 }, img: "images/fruit_dry.png" }
    ]
  },
  {
    text: { uk: "🌸 Які парфуми тобі ближчі?", en: "🌸 Which perfumes are closer to you?" },
    answers: [
      { text: { uk: "Квіткові", en: "Floral" }, tags: { fruit: 2 }, img: "images/perfume_flower.png" },
      { text: { uk: "Свіжі цитрусові", en: "Fresh citrus" }, tags: { fruit: 2, filter: 1 }, img: "images/perfume_citrus.png" },
      { text: { uk: "Солодкі гурманські", en: "Sweet gourmand" }, tags: { choco: 2 }, img: "images/perfume_sweet.png" },
      { text: { uk: "Деревні/пряні", en: "Woody/spicy" }, tags: { dark: 2 }, img: "images/perfume_wood.png" }
    ]
  },
  // фан-питання — без ваг
  {
    text: { uk: "☀️ Яка сцена тобі ближча?", en: "☀️ Which scene is closer to you?" },
    answers: [
      { text: { uk: "Середземна фієста", en: "Mediterranean fiesta" }, tags: {}, img: "images/scene_fiesta.png" },
      { text: { uk: "Прогулянка після дощу", en: "Walk after rain" }, tags: {}, img: "images/scene_rain.png" },
      { text: { uk: "Затишний плед і книга", en: "Cozy blanket & book" }, tags: {}, img: "images/scene_book.png" },
      { text: { uk: "Ранковий коворкінг", en: "Morning coworking" }, tags: {}, img: "images/scene_cowork.png" }
    ]
  },
  {
    text: { uk: "🍸 Який коктейль твій улюблений?", en: "🍸 Your favorite cocktail?" },
    answers: [
      { text: { uk: "Апероль Шприц", en: "Aperol Spritz" }, tags: {}, img: "images/cocktail_aperol.png" },
      { text: { uk: "Мохіто", en: "Mojito" }, tags: {}, img: "images/cocktail_mojito.png" },
      { text: { uk: "Віскі-кола", en: "Whiskey-cola" }, tags: {}, img: "images/cocktail_whiskey.png" },
      { text: { uk: "Еспресо мартіні", en: "Espresso martini" }, tags: {}, img: "images/cocktail_espresso.png" }
    ]
  },
  {
    text: { uk: "🌿 Як ти любиш проводити вихідні?", en: "🌿 How do you prefer weekends?" },
    answers: [
      { text: { uk: "Прогулянка", en: "Walk" }, tags: {}, img: "images/weekend_nature.png" },
      { text: { uk: "Вечірка з друзями", en: "Party with friends" }, tags: {}, img: "images/weekend_party.png" },
      { text: { uk: "Затишний день вдома", en: "Cozy day at home" }, tags: {}, img: "images/weekend_home.png" },
      { text: { uk: "Подорож у нове місто", en: "Travel to a new city" }, tags: {}, img: "images/weekend_trip.png" }
    ]
  },
  // Ключові:
  {
    text: { uk: "🫖 Який метод заварювання тобі ближче?", en: "🫖 Which brew method do you prefer?" },
    answers: [
      { text: { uk: "Фільтр (V60, Chemex)", en: "Filter (V60, Chemex)" }, tags: { filter: 3, fruit: 1 }, method: "filter", img: "images/brew_filter.png" },
      { text: { uk: "Еспресо-машина", en: "Espresso machine" }, tags: { espresso: 3 }, method: "espresso", img: "images/brew_espresso.png" },
      { text: { uk: "Гейзерна (Moka pot)", en: "Moka pot" }, tags: { moka: 3, dark: 1 }, method: "moka", img: "images/brew_moka.png" },
      { text: { uk: "Френч Прес", en: "French Press" }, tags: { immersion: 3, dessert: 1 }, method: "immersion", img: "images/brew_turkish.png" }
    ]
  },
  {
    text: { uk: "☕ Який кавовий напій тобі ближче?", en: "☕ Which coffee drink do you prefer?" },
    answers: [
      { text: { uk: "Еспресо", en: "Espresso" }, tags: { espresso: 2 }, drink: "espresso", img: "images/drink_espresso.png" },
      { text: { uk: "Американо", en: "Americano" }, tags: { americano: 2 }, drink: "americano", img: "images/drink_americano.png" },
      { text: { uk: "Американо з молоком", en: "Americano with milk" }, tags: { milk: 2 }, drink: "milk", img: "images/drink_milk.png" },
      { text: { uk: "Капучино", en: "Cappuccino" }, tags: { cappuccino: 2, milk: 2 }, drink: "cappuccino", img: "images/drink_cappuccino.png" }
    ]
  }
];

// Профілі кави (єдині посилання)
const coffeeProfiles = [
  { name: "Ethiopia Gedeb 250g", img: "images/ethiopia_gadeb.png", link: "https://bfc24.com/uk/store/product/43", tags: { fruit: 2, filter: 3, americano: 1 }, category: "filter" },
  { name: "Kenya AA Gikanda Kangocho 250g", img: "images/kenya_aa.png", link: "https://bfc24.com/uk/store/product/39", tags: { fruit: 2, filter: 3, americano: 1 }, category: "filter" },
  { name: "Brazil Mogiana 250g", img: "images/brazil_mogiana.png", link: "https://bfc24.com/uk/store/product/33", tags: { choco: 2, espresso: 3, milk: 2, cappuccino: 2, moka: 1 } },
  { name: "Colombia Excelso 250g", img: "images/colombia_excleso.png", link: "https://bfc24.com/uk/store/product/35", tags: { choco: 2, espresso: 2, milk: 1, moka: 1 } },
  { name: "Arabica Midday 250g", img: "images/midday.png", link: "https://bfc24.com/uk/store/product/45", tags: { dessert: 2, espresso: 2, milk: 2, cappuccino: 2, moka: 1 } },
  { name: "Arabica Midnight 250g", img: "images/midnight.png", link: "https://bfc24.com/uk/store/product/31", tags: { choco: 1, dessert: 2, espresso: 2, americano: 1, immersion: 1 } },
  { name: "Arabica Sunrise 250g", img: "images/sunrise.png", link: "https://bfc24.com/uk/store/product/36", tags: { dessert: 2, espresso: 2, americano: 1, milk: 1, immersion: 1, moka: 1 } },
  { name: "Arabusta Dark 250g", img: "images/dark.png", link: "https://bfc24.com/uk/store/product/29", tags: { dark: 3, espresso: 3, cappuccino: 2, moka: 2 } },
  { name: "Arabusta Amber 250g", img: "images/amber.png", link: "https://bfc24.com/uk/store/product/30", tags: { dark: 2, espresso: 2, milk: 2, cappuccino: 2, americano: 1, moka: 1 } },
  { name: "Decaf Colombia Huila 250g", img: "images/columbia_decaf.png", link: "https://bfc24.com/uk/store/product/34", tags: { classic: 2, espresso: 2, milk: 1, cappuccino: 1, americano: 1, immersion: 1 } },
  { name: "Ethiopia Aleta Wondo 250g", img: "images/ethiopia_aleta.png", link: "https://bfc24.com/uk/store/product/32", tags: { fruit: 2, filter: 2, espresso: 1 }, category: "filter" },
  { name: "Brazil Fazenda Pedra Grande 250g", img: "images/brazil_fazenda.png", link: "https://bfc24.com/uk/store/product/41", tags: { choco: 2, espresso: 2, moka: 1 } },
  { name: "Colombia Cauca Popayan 250g", img: "images/colombia_cauca.png", link: "https://bfc24.com/uk/store/product/40", tags: { choco: 2, fruit: 1, espresso: 2 } },
  { name: "Mexico El Buho 250g", img: "images/mexico_el_buho.png", link: "https://bfc24.com/uk/store/product/38", tags: { choco: 1, dark: 1, espresso: 2, americano: 1 } }
];

// два фільтр-варіанти
const FILTER_ONLY_TWO = ["Ethiopia Gedeb 250g", "Kenya AA Gikanda Kangocho 250g"];

/* ===========================
   State & elements
=========================== */
let currentQ = 0;
let userProfile = {};
let selectedMethod = null;
let selectedDrink = null;

const langScreen = document.getElementById("lang-screen");
const startScreen = document.getElementById("start-screen");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

/* ===========================
   Helpers
=========================== */
function $(sel, root = document) { return root.querySelector(sel); }
function addTags(tags) {
  for (const [k, v] of Object.entries(tags || {})) {
    if (!userProfile[k]) userProfile[k] = 0;
    userProfile[k] += v;
  }
}
function cacheBust(src) {
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}t=${Date.now()}`;
}

// 1) Зберігаємо ref з першого заходу (якщо він був)
(function persistRefOnce(){
  const qs = new URLSearchParams(window.location.search);
  const incomingRef = qs.get("ref");
  if (incomingRef) localStorage.setItem("coffeeQuizRef", incomingRef);
})();

// 2) Дістаємо ref (пріоритет: URL -> localStorage -> 'quiz')
function getRefParam() {
  const qp = new URLSearchParams(window.location.search);
  return qp.get("ref") || localStorage.getItem("coffeeQuizRef") || "quiz";
}

// 3) Будуємо коректне посилання: видаляємо старі дублікати ref/t і додаємо свіжі
function buildRefLink(baseUrl, extra = {}) {
  try {
    const u = new URL(baseUrl);            // абсолютні https://... — працює стабільно
    // чистимо попередні значення
    u.searchParams.delete("ref");
    u.searchParams.delete("t");
    // додаємо наш ref + анти-кеш
    u.searchParams.set("ref", getRefParam());
    u.searchParams.set("t", Date.now().toString());
    // додаємо користувацькі (за потреби)
    Object.entries(extra).forEach(([k, v]) => u.searchParams.set(k, v));
    return u.toString();
  } catch (e) {
    // Якщо раптом відносний URL (не наш випадок), робимо fallback
    const hasQ = baseUrl.includes("?");
    const clean = baseUrl
      .replace(/[?&]ref=[^&#]*/gi, "")
      .replace(/[?&]t=\d+/gi, "")
      .replace(/[?&]+$/, "");
    const sep = clean.includes("?") ? "&" : (hasQ ? "" : "?");
    const params = new URLSearchParams({ ref: getRefParam(), t: Date.now().toString(), ...extra }).toString();
    return clean + sep + params;
  }
}

function t(obj) {
  return typeof obj === "string" ? obj : (obj?.[userLang] || obj?.uk || obj?.en || "");
}

/* ===========================
   Language selection
=========================== */
function applyStartTexts() {
  $("#main-title").textContent = startTranslations[userLang].mainTitle;
  startScreen.querySelector("h2").textContent = startTranslations[userLang].title;
  startScreen.querySelector("p").textContent = startTranslations[userLang].text;
  startBtn.textContent = startTranslations[userLang].button;
}

function selectLanguage(lang) {
  userLang = (lang === "en") ? "en" : "uk"; // тільки uk/en
  localStorage.setItem("coffeeQuizLang", userLang);
  langScreen.classList.add("hidden");
  applyStartTexts();
  startScreen.classList.remove("hidden");
}

/* ===========================
   Render: Question & Result
=========================== */
function showQuestion() {
  // якщо вже вибрано filter і поточне питання — про напій, пропускаємо до результату
  if (selectedMethod === "filter" && questions[currentQ]?.answers?.some(a => a.drink)) {
    showResult();
    return;
  }

  const q = questions[currentQ];
  if (!q) { showResult(); return; }

  quizEl.innerHTML = `<h2>${t(q.text)}</h2>`;
  const g = document.createElement("div");
  g.className = "gallery";

  q.answers.forEach(a => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    const imgSrc = cacheBust(a.img);
    card.innerHTML = `<img src="${imgSrc}" alt=""><p>${t(a.text)}</p>`;
    card.onclick = () => {
      addTags(a.tags);
      if (a.method) selectedMethod = a.method;
      if (a.drink) selectedDrink = a.drink;

      currentQ++;
      if (currentQ < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    g.appendChild(card);
  });

  quizEl.appendChild(g);
}

function showResult() {
  let coffees = [...coffeeProfiles];

  // Особливий режим для filter: лише дві фільтр-кави
  if (selectedMethod === "filter") {
    const filterCoffees = coffees
      .filter(c => c.category === "filter" && FILTER_ONLY_TWO.includes(c.name));

    const main = filterCoffees[0] || coffees.find(c => FILTER_ONLY_TWO.includes(c.name));
    const alt = filterCoffees[1];

    renderFinal(main, alt ? [alt] : []);
    return;
  }

  // Фільтр-кави не показуємо при milk/cappuccino
  if (selectedDrink === "milk" || selectedDrink === "cappuccino") {
    coffees = coffees.filter(c => c.category !== "filter");
  }

  // При еспресо — дуже рідко (10%) показуємо filter
  if (selectedDrink === "espresso") {
    if (Math.random() > 0.1) coffees = coffees.filter(c => c.category !== "filter");
  }

  // Підрахунок скору
  const scored = coffees.map(c => {
    let s = 0;
    for (const [tag, weight] of Object.entries(userProfile)) {
      if (c.tags[tag]) s += Math.min(weight, c.tags[tag]);
    }
    return { ...c, score: s };
  }).sort((a, b) => b.score - a.score);

  const main = scored[0];
  const recs = scored.slice(1, 3);
  renderFinal(main, recs);
}

function renderFinal(mainCoffee, recList) {
  if (!mainCoffee) {
    mainCoffee = coffeeProfiles.find(c => c.name === FILTER_ONLY_TWO[0]) || coffeeProfiles[0];
  }

  const phraseArr = endPhrases[userLang] || endPhrases.uk;
  const phrase = phraseArr[Math.floor(Math.random() * phraseArr.length)];
  const btnText = (userLang === "uk") ? "Замовити" : "Order";
  const alsoText = (userLang === "uk") ? "✨ Вам також може сподобатися:" : "✨ You may also like:";

  const mainLink = buildRefLink(mainCoffee.link);

  let html = `
    <h2>${mainCoffee.name}</h2>
    <img src="${cacheBust(mainCoffee.img)}" alt="${mainCoffee.name}">
    <div class="final-phrase">${phrase}</div>
    <a href="${mainLink}" target="_blank" rel="noopener">
      <button>☕ ${btnText}</button>
    </a>
  `;

  if (recList && recList.length) {
    html += `<h3>${alsoText}</h3><div class="gallery">`;
    recList.forEach(c => {
      const lnk = buildRefLink(c.link);
      html += `
        <a href="${lnk}" target="_blank" rel="noopener" class="gallery-item">
          <img src="${cacheBust(c.img)}" alt="${c.name}">
          <p>${c.name}</p>
        </a>
      `;
    });
    html += `</div>`;
  }

  resultEl.innerHTML = html;
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
}

/* ===========================
   Bootstrapping
=========================== */
function initLanguageButtons() {
  document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      selectLanguage(lang);
    });
  });
}

function initStartButton() {
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    resultEl.classList.add("hidden");
    quizEl.classList.remove("hidden");

    // Скидання стану
    currentQ = 0;
    userProfile = {};
    selectedMethod = null;
    selectedDrink = null;

    showQuestion();
  });
}

(function bootstrap() {
  const saved = localStorage.getItem("coffeeQuizLang");
  if (saved === "uk" || saved === "en") {
    userLang = saved;
    langScreen.classList.add("hidden");
    applyStartTexts();
    startScreen.classList.remove("hidden");
  } else {
    langScreen.classList.remove("hidden");
  }

  initLanguageButtons();
  initStartButton();
})();