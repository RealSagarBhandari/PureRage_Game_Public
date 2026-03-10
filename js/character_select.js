import { characters } from './character_data.js'



let selectedCharNum = null; // will hold data.numchar from each character’s JSON

let selectedIndex = Math.floor(characters.length / 2);
let popupOpen = false;

const grid = document.getElementById("character-grid");
const clickSfx = document.getElementById("click-sfx");
const voiceLine = document.getElementById("voice-line");
const bgMusic = document.getElementById("bg-music");

bgMusic.volume = 0.3;
bgMusic.play().catch(() => {});
setTimeout(() => voiceLine.play().catch(() => {}), 1000);

function playSfx() {
  clickSfx.currentTime = 0;
  clickSfx.play().catch(() => {});
}

function getWrappedIndex(index) {
  const len = characters.length;
  return ((index % len) + len) % len;
}

function renderCharacters() {
  grid.innerHTML = "";
  for (let i = -2; i <= 2; i++) {
    const index = getWrappedIndex(selectedIndex + i);
    const char = characters[index];
    const charDiv = document.createElement("div");
    charDiv.className = "character";
    if (i === 0) charDiv.classList.add("active");

    const img = document.createElement("img");
    img.src = `../assets/portraits/${char.img}`;
    img.alt = char.name;

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = char.name;

    charDiv.appendChild(img);
    charDiv.appendChild(label);
    grid.appendChild(charDiv);
  }
}

async function showPopup(char) {
  const modal      = document.getElementById("confirm-modal");
  const nameEl     = document.getElementById("popup-name");
  const imgEl      = document.getElementById("popup-img");
  const bioEl      = document.getElementById("popup-bio");

  const hpBar      = document.getElementById("bar-hp");
  const atkBar     = document.getElementById("bar-atk");
  const defBar     = document.getElementById("bar-def");
  const mAtkBar    = document.getElementById("bar-matk");
  const mDefBar    = document.getElementById("bar-mdef");

  // reset everything to zero
  nameEl.textContent = char.name;
  imgEl.src          = `../assets/portraits/${char.img}`;
  bioEl.textContent  = "This warrior thrives in chaos.";

  [hpBar, atkBar, defBar, mAtkBar, mDefBar].forEach(bar => {
    if (bar) bar.style.width = "0%";
  });

  // fetch JSON
  const resp = await fetch(`../../characters/${char.json}`);
  const data = await resp.json();
  // stash numeric ID from JSON
  selectedCharNum = data.numchar;
  console.log(selectedCharNum)

  // update name & bio
  nameEl.textContent = data.name || char.name;
  bioEl.textContent  = data.bio  || "🔥 Born for chaos.";

  // helper: display stat bars with some buffer space so they don't intersect with popup padding
  function statToPct(value) {
    let max_stat = 1000 // CHANGE THIS IF CHARACTER WITH HIGHER MAX STAT IS ADDED
                    // HEALTH IS COUNTED AS SHOWN HEALTH VALUE / 2 FOR MAX STAT
    const MAX_STAT = 1.2*max_stat;

    let p = (value || 0) / MAX_STAT * 100;
    return p;
  }

  // animate fills
  setTimeout(() => {
    if (hpBar)   hpBar.style.width  = statToPct(data.health/2)  + "%";
    if (atkBar)  atkBar.style.width = statToPct(data.attack)  + "%";
    if (defBar)  defBar.style.width = statToPct(data.armor)   + "%";
    if (mAtkBar) mAtkBar.style.width = statToPct(data.magicPower)    + "%";
    if (mDefBar) mDefBar.style.width = statToPct(data.magicResist)    + "%";
  }, 100);

  // show modal + flash
  modal.classList.remove("hidden");
  popupOpen = true;
  const burst = document.createElement("div");
  burst.className = "flash-burst";
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 400);
}

function hidePopup() {
  document.getElementById("confirm-modal").classList.add("hidden");
  popupOpen = false;
}

document.addEventListener("keydown", (e) => {
  if (popupOpen && e.key === "Escape") {
    hidePopup();
    return;
  }

  if (!popupOpen && e.key === "ArrowRight") {
    selectedIndex = getWrappedIndex(selectedIndex + 1);
    playSfx();
    renderCharacters();
  } else if (!popupOpen && e.key === "ArrowLeft") {
    selectedIndex = getWrappedIndex(selectedIndex - 1);
    playSfx();
    renderCharacters();
  } else if (!popupOpen && e.key === "Enter") {
    const char = characters[selectedIndex];
    playSfx();
    showPopup(char);
  }
});

document.getElementById("arrow-left").addEventListener("click", () => {
  if (!popupOpen) {
    selectedIndex = getWrappedIndex(selectedIndex - 1);
    playSfx();
    renderCharacters();
  }
});

document.getElementById("arrow-right").addEventListener("click", () => {
  if (!popupOpen) {
    selectedIndex = getWrappedIndex(selectedIndex + 1);
    playSfx();
    renderCharacters();
  }
});

document.getElementById("popup-start").addEventListener("click", () => {
  // store only fetched numeric id from showPopup
  if (selectedCharNum == null) { 
    console.error("selectedCharNum is null - did showPopup run?");
  }
  else {
    console.log(selectedCharNum);
    localStorage.setItem("selectedCharNum", String(selectedCharNum));
    console.log(localStorage.getItem("selectedCharNum"))
  }
  hidePopup();

  // Show the teaser video
  /*
  const teaser = document.getElementById("teaser-video");
  teaser.classList.remove("hidden");
  teaser.play();
  */

  // Redirect after video ends
  window.location.href = "/battle";
});



document.getElementById("popup-close").addEventListener("click", () => {
  hidePopup();
});

renderCharacters();


// Particle effect flares and ember effect  same as from login page just copy pasted 


setInterval(() => {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";
  document.getElementById("particle-container").appendChild(particle);
  setTimeout(() => particle.remove(), 5000);
}, 200);