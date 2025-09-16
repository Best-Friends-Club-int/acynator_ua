// --- Фрази для фіналу ---
const endPhrases = [
  "😏 Ну що, вгадали твій смак? Замов і перевір у чашці!",
  "🎯 Схоже, ми знайшли твою ідеальну каву. Час перевірити!",
  "☕ Тепер справа за малим — натисни і забери свій аромат.",
  "😉 А може ризикнеш і спробуєш саме цю?",
  "✨ Відчуй, чи справді це твоя кава — замов просто зараз!"
];

// --- Питання + відповіді + теги ---
// (тут вставляються твої питання як було раніше)
const questions = [...]; // скорочено для прикладу

// --- Профілі кави ---
// (тут профілі кави як у попередній версії)
const coffeeProfiles = {...}; // скорочено для прикладу

// --- Логіка ---
let currentQ = 0;
let scores = { fruit: 0, choco: 0, dessert: 0, dark: 0, classic: 0 };

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

async function getUserCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_code;
  } catch {
    return "UA";
  }
}

function showQuestion() {
  quizEl.innerHTML = `<h2>${questions[currentQ].text}</h2>`;
  const gallery = document.createElement("div");
  gallery.className = "gallery";

  questions[currentQ].answers.forEach(a => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `<img src="${a.img}" alt="${a.text}"><p>${a.text}</p>`;
    card.onclick = () => {
      scores[a.tag]++;
      currentQ++;
      if (currentQ < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    gallery.appendChild(card);
  });

  quizEl.appendChild(gallery);
}

async function showResult() {
  const winner = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  const coffeeSet = coffeeProfiles[winner];
  const coffee = coffeeSet.coffees[Math.floor(Math.random() * coffeeSet.coffees.length)];

  const country = await getUserCountry();
  const adjustLink = (link) => country === "UA" ? link : link.replace("/uk", "");

  const phrase = endPhrases[Math.floor(Math.random() * endPhrases.length)];

  let html = `
    <h2>Ваша кава — ${coffee.name}</h2>
    <img src="${coffee.img}" alt="${coffee.name}">
    <p>${coffeeSet.desc}</p>
    <div class="final-phrase">${phrase}</div>
    <a href="${adjustLink(coffee.link)}" target="_blank">
      <button>☕ Замовити</button>
    </a>
  `;

  let otherCoffees = [];
  Object.keys(coffeeProfiles).forEach(key => {
    if (key !== winner) {
      otherCoffees = otherCoffees.concat(coffeeProfiles[key].coffees);
    }
  });

  const shuffled = otherCoffees.sort(() => 0.5 - Math.random()).slice(0, 2);

  if (shuffled.length > 0) {
    html += `<h3>✨ Вам також може сподобатися:</h3><div class="gallery">`;
    shuffled.forEach(c => {
      html += `
        <a href="${adjustLink(c.link)}" target="_blank" class="gallery-item">
          <img src="${c.img}" alt="${c.name}">
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

document.addEventListener("DOMContentLoaded", showQuestion);
