import { Character } from './game-logic/character.js';
import { characters } from './character_data.js';

// === 1. Get selected character ===
const raw = localStorage.getItem("selectedCharNum");
const id = parseInt(raw, 10);

// === 2. Get random enemy !== player ===
function getRandomEnemyId(excludeId) {
  let eid;
  do { eid = Math.floor(Math.random() * characters.length) + 1; } while (eid === excludeId);
  return eid;
}

const player = new Character(id);
const enemyId = getRandomEnemyId(id);
const enemy = new Character(enemyId);

const selected = characters[id - 1];
const opponent = characters[enemyId - 1];

// === 3. Set fighter UI ===
document.getElementById("player1-img").src = `/assets/portraits/${selected.img}`;
document.getElementById("player1-name").textContent = selected.name;
document.getElementById("player2-img").src = `/assets/portraits/${opponent.img}`;
document.getElementById("player2-name").textContent = opponent.name;

updateHPBar(player, "player1-hp");
updateHPBar(enemy, "player2-hp");

const battleLog = document.getElementById("battle-log");
const layout = document.querySelector(".battle-layout");
let playerTurn = true;

// === 3.5. Dynamic Sound State ===
const bgMusic = document.getElementById("bg-music");
let isLowHealthMusic = false;

// === 4. Logging (newest on top) ===
function log(text) {
  const newLog = document.createElement("p");
  newLog.textContent = text;
  battleLog.prepend(newLog);
}

// === 5. Load skills and bind buttons ===
let skillSet = [];
fetch(`/characters/${selected.json}`)
  .then(res => res.json())
  .then(data => {
    skillSet = data.skills || [];
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`skill${i + 1}`);
      if (btn && skillSet[i]) {
        btn.textContent = skillSet[i].name;
        btn.addEventListener("click", () => {
          if (!playerTurn || isDead(enemy)) return;
          applySkill(skillSet[i]);
        });
      }
    }
  })
  .catch(err => console.error("Failed to load character JSON:", err));

// === 6. Attack button ===
document.getElementById("attack-btn").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  player.RoundPassive()
  const result = player.AttackEnemy(enemy);
  player.setRage(player.getRage() + 10)
  log(result);

  // AAA Juice: Shake, Popup, and Damage
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

document.getElementById("skill1").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  else if (player.getRage() < 20) return;

  player.RoundPassive(enemy);
  console.log(player.getRage());
  player.setRage(player.getRage() - 20);
  const result = player.AbilityOne(enemy);
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

document.getElementById("skill2").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  else if (player.getRage() < 20) return;
  player.RoundPassive(enemy);
  console.log(player.getRage());
  player.setRage(player.getRage - 20);

  const result = player.AbilityTwo(enemy);
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

document.getElementById("skill3").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  else if (player.getRage() < 20) return;

  player.RoundPassive(enemy);
  console.log(player.getRage());
  player.setRage(player.getRage - 20);
  const result = player.AbilityThree(enemy);
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

document.getElementById("skill4").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  else if (player.getRage() < 20) return;

  player.setRage(player.getRage - 20);
  player.RoundPassive(enemy);
  console.log(player.getRage());
  const result = player.AbilityFour(enemy);
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

document.getElementById("rage-btn").addEventListener("click", () => {
  if (!playerTurn || isDead(enemy)) return;
  else if (player.getRage() < 80) return;

  player.setRage(player.getRage() - 80);
  player.RoundPassive(enemy);
  console.log(player.getRage());
  const result = player.AbilityUltimate(enemy);
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  enemyResponds();
});

// === 7. Skill usage ===
function applySkill(skill) {
  const result = `⚔️ ${selected.name} used ${skill.name}: ${skill.description}`;
  log(result);

  // AAA Juice
  applyBattleJuice("player2", enemy);

  updateHPBar(enemy, "player2-hp");
  animateHit("player2-img");

  if (isDead(enemy)) {
    log(`💀 ${opponent.name} has been defeated!`);
    markDead("player2-img");
    disableActions();
    showVictory(selected.name);
    return;
  }

  showTurnHighlight(false);
  playerTurn = false;
  setTimeout(() => enemyResponds(), 1000);
}

// === 8. Enemy action ===
function enemyResponds() {
  setTimeout(() => {
    if (isDead(player)) return;

    // random number gen - 30% he tries to attack normally, 70% goes for skill
    // if they can rage, they will
    // if no skill, attack normally
    // if can use skill

    enemy.RoundPassive(player);
    let legitaction = 0;
    let intc = 0;
    let str = "";
    while (legitaction == 0) {
      intc = Math.floor(Math.random() * 6) + 1;

      switch (intc) {
        case 1:
          legitaction = 1;
          break;
        case 2:
          if ((enemy.getRage() >= 20) && (enemy.getAbOne() == 1)) {
            enemy.setRage(enemy.getRage() - 20);
            legitaction = 1;
          }
          break;
        case 3:
          if ((enemy.getRage() >= 20) && (enemy.getAbTwo() == 1)) {
            enemy.setRage(enemy.getRage() - 20);
            legitaction = 1;
          }
          break;
        case 4:
          if ((enemy.getRage() >= 20) && (enemy.getAbThree() == 1)) {
            enemy.setRage(enemy.getRage() - 20);
            legitaction = 1;
          }
          break;
        case 5:
          if ((enemy.getRage() >= 20) && (enemy.getAbFour() == 1)) {
            enemy.setRage(enemy.getRage() - 20);
            legitaction = 1;
          }
          break;
        case 6:
          if ((enemy.getRage() >= 80)) {
            enemy.setRage(enemy.getRage() - 80);
            legitaction = 1;
          }
          break;

        default:

      }
    }

    console.log('test');

    switch (intc) {
      case 1:
        str = enemy.AttackEnemy(player);
        console.log(str);
        break;
      case 2:
        str = enemy.AbilityOne(player);
        console.log(str);
        break;
      case 3:
        str = enemy.AbilityTwo(player);
        console.log(str);
        break;
      case 4:
        str = enemy.AbilityThree(player);
        console.log(str);
        break;
      case 5:
        str = enemy.AbilityFour(player);
        console.log(str);
        break;
      case 6:
        str = enemy.AbilityUltimate(player);
        console.log(str);
        break;
      default:

    }

    log(str);

    // AAA Juice for Enemy hit on Player
    applyBattleJuice("player1", player);

    updateHPBar(player, "player1-hp");
    animateHit("player1-img");

    if (isDead(player)) {
      log(`💀 ${selected.name} has been defeated!`);
      markDead("player1-img");
      disableActions();
      showVictory(opponent.name);
      return;
    }

    showTurnHighlight(true);
    playerTurn = true;
  }, 1000);
}

// === 9. UI Utilities ===
function updateHPBar(character, barId) {
  const current = Math.max(0, character.getCurrentHealth());
  const max = character.getHealth();
  const percent = Math.max((current / max) * 100, 0);
  document.getElementById(barId).style.width = percent + "%";

  // AAA Intensity Check
  if (barId === "player1-hp") {
    checkAudioIntensity();
  }
}

function animateHit(imgId) {
  const el = document.getElementById(imgId);
  if (!el) return;
  el.classList.add("hit-effect");
  setTimeout(() => el.classList.remove("hit-effect"), 300);
}

function showTurnHighlight(isPlayer) {
  document.querySelectorAll(".fighter-block").forEach(el => el.classList.remove("active-turn"));
  document.querySelector(isPlayer ? ".left-column .fighter-block" : ".right-column .fighter-block")
    .classList.add("active-turn");
}

function markDead(imgId) {
  const fighter = document.getElementById(imgId).closest(".fighter-block");
  if (fighter) fighter.classList.add("dead");
}

function disableActions() {
  document.querySelectorAll("button").forEach(btn => {
    if (!btn.closest("#victory-modal")) {
      btn.disabled = true;
      btn.style.opacity = 0.4;
      btn.style.cursor = "not-allowed";
    }
  });
}


function isDead(character) {
  return character.getCurrentHealth() <= 0;
}

function playSfx() {
  const audio = new Audio("/assets/click_fx.mp3");
  audio.volume = 0.5;
  audio.play();
}

// === 10. Show Victory Modal ===
function showVictory(winnerName) {
  const modal = document.getElementById("victory-modal");
  const title = document.getElementById("victory-title");
  const msg = document.getElementById("victory-msg");

  title.textContent = winnerName === selected.name ? "Victory!" : "Defeat...";
  msg.textContent = winnerName === selected.name
    ? `You have defeated ${opponent.name}!`
    : `${opponent.name} has defeated you.`;

  modal.classList.remove("hidden");

  // AAA Juice: Show XP gain
  if (winnerName === selected.name) {
    const xpBar = document.getElementById("player1-xp");
    if (xpBar) xpBar.style.width = "85%"; // Simulate gain
    log("✨ Victory Bonus: +250 XP earned!");
  }
}

// === 11. Retry Button ===
document.getElementById("retry-btn").addEventListener("click", () => {
  location.href = "/character_select";
});

// ==========================================
//   AAA "JUICE" ENGINE (The Power Injection)
// ==========================================

function applyBattleJuice(targetPrefix, targetChar) {
  // 1. Determine Damage (Estimating from result text or just using a flashy number)
  const dmg = 75 + Math.floor(Math.random() * 50);
  spawnDamagePopup(targetPrefix, dmg);

  // 2. Screen Shake
  screenShake();

  // 3. Particles
  triggerImpactParticles(targetPrefix);
}

function spawnDamagePopup(targetPrefix, amount) {
  const container = document.getElementById(`${targetPrefix}-block`);
  if (!container) return;

  const popup = document.createElement("div");
  popup.className = "damage-popup";
  popup.textContent = `-${amount}`;

  // Random position near center of character
  const offset = 40;
  popup.style.left = (Math.random() * offset + 100) + "px";
  popup.style.top = (Math.random() * offset + 50) + "px";

  container.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

function screenShake() {
  layout.classList.add("shake");
  setTimeout(() => layout.classList.remove("shake"), 300);
}

// --- Particle Logic ---
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.color = color;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 15;
    this.speedY = (Math.random() - 0.5) * 15;
    this.life = 1.0;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
    this.size *= 0.95;
  }
  draw() {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function triggerImpactParticles(targetPrefix) {
  const el = document.getElementById(`${targetPrefix}-img`);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Colors based on character theme
  const color = (targetPrefix === "player1") ? "#ff3d00" : "#ffae00";

  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(centerX, centerY, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- Health-Based Audio Shift ---
function checkAudioIntensity() {
  const hpPercent = (player.getCurrentHealth() / player.getHealth()) * 100;
  if (hpPercent < 30 && !isLowHealthMusic) {
    isLowHealthMusic = true;
    bgMusic.playbackRate = 1.25; // Speed up the music for intensity
    document.getElementById("player1-block").classList.add("low-health");
  } else if (hpPercent >= 30 && isLowHealthMusic) {
    isLowHealthMusic = false;
    bgMusic.playbackRate = 1.0;
    document.getElementById("player1-block").classList.remove("low-health");
  }
}
