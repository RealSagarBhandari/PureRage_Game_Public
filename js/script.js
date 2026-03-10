document.addEventListener("DOMContentLoaded", () => {
  let bgMusic = document.getElementById("bg-music");
  if (!bgMusic) {
    bgMusic = document.createElement("audio");
    bgMusic.id = "bg-music";
    bgMusic.src = "../assets/intro_music.mp3";
    bgMusic.loop = true;
    document.body.appendChild(bgMusic);
  }

  const toggleBtn = document.getElementById("toggle-audio");
  const fx = new Audio("../assets/click_fx.mp3");
  fx.volume = 1;
  const chooseVoice = new Audio("../assets/choose_your_character.mp3");
chooseVoice.volume = 0;


  // Floating sparks anim .


  setInterval(() => {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = window.innerHeight + "px";
    document.getElementById("particle-container").appendChild(particle);
    setTimeout(() => particle.remove(), 5000);
  }, 200);

  bgMusic.volume = 0.6;

  document.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(e => console.warn("Autoplay blocked:", e));
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      fx.currentTime = 0;
      fx.play();
      bgMusic.muted = !bgMusic.muted;
      toggleBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
    });
  }

  const intro = document.getElementById("intro-screen");
  const loginBox = document.getElementById("login-box");

  const startGame = () => {
    fx.play();
    intro.classList.add("hidden");
    loginBox.classList.remove("hidden");
  };

  if (intro) {
    intro.addEventListener("click", startGame);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") startGame();
    });
  }

  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const msg = document.getElementById("message");

      // TODO - CONNECT THIS TO DATABASE, CHANGE BELOW LOGIC
      if (username === username && password === password) {
        msg.textContent = "Login successful!";
        msg.style.color = "#00e676";
        createSparks();
        triggerGlitch();
        chooseVoice.currentTime = 0;
        chooseVoice.play().catch(e => console.warn("Voice line blocked:", e));


        // algorith that will save music time before page switch. 
        localStorage.setItem("bg-music-time", bgMusic.currentTime);

        setTimeout(() => {
          window.location.href = "character_select.html";
        }, 1000);
      } else {
        msg.textContent = "Invalid credentials!";
        msg.style.color = "#ff6e40";
      }
    });
  }

// Sign-Up button: preserve SFX & music time, then go to /signup
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      fx.currentTime = 0;
      fx.play();
      // save music position
      localStorage.setItem("bg-music-time", bgMusic.currentTime);
      // navigate to the signup page
      window.location.href = "/signup";
    });
  }


  function createSparks() {
    const button = document.querySelector("button[type='submit']");
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
      const spark = document.createElement("div");
      spark.classList.add("spark");
      const x = (Math.random() - 0.5) * 200 + "px";
      const y = (Math.random() - 0.5) * 200 + "px";
      spark.style.setProperty("--x", x);
      spark.style.setProperty("--y", y);
      spark.style.left = rect.left + rect.width / 2 + "px";
      spark.style.top = rect.top + rect.height / 2 + "px";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }

  function triggerGlitch() {
    const title = document.querySelector(".title");
    if (title) {
      title.classList.add("glitch-once");
      setTimeout(() => title.classList.remove("glitch-once"), 200);
    }
  }

  // Resume music if page reloaded or continued, needed cuz we cannot start over from 00:00 for each page
  const savedTime = parseFloat(localStorage.getItem("bg-music-time"));
  if (!isNaN(savedTime)) {
    bgMusic.currentTime = savedTime;
  }

  bgMusic.play().catch(e => {});
});

