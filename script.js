  // -----------------------------
// ELEMENTS
// -----------------------------
const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const cursorDot = document.getElementById("cursorDot");
const dynamicText = document.getElementById("dynamicText");
const bgMusic = document.getElementById("bgMusic");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

// -----------------------------
// TYPING EFFECT
// -----------------------------
const titles = ['" junior Developer"', '"loves editing "', '"Tech Enthusiast"', '"loves filming"', "'blender lover'", '"Learning React Native"'];
let titleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    dynamicText.textContent = currentTitle.slice(0, charIndex);

    if (!isDeleting && charIndex < currentTitle.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 200);
    }
}
typeEffect();

// -----------------------------
// CURSOR TRAIL
// -----------------------------
startScreen.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";

    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    startScreen.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
});

// -----------------------------
// START SCREEN CLICK
// -----------------------------
startScreen.addEventListener("click", () => {
    startScreen.style.opacity = "0";
    setTimeout(() => startScreen.style.display = "none", 500);
    mainContent.classList.add("show");

    // Play background music automatically
    bgMusic.play().catch(() => {});

    // Show theme and music toggle icons now
    themeToggle.style.display = "inline-block";
    musicToggle.style.display = "inline-block";

    document.body.style.cursor = "auto";
});


// -----------------------------
// BACKGROUND GIF ROTATION
// -----------------------------
const gifs = [
    "https://68.media.tumblr.com/58760e683d6671b12373869993686824/tumblr_ovo8hubc9m1ut1d6co1_540.gif",
    "https://giffiles.alphacoders.com/210/210055.gif",
    "https://giffiles.alphacoders.com/210/210052.gif",
    "https://www.giantfreakinrobot.com/wp-content/uploads/2020/06/hathaway.gif",
    "https://pa1.aminoapps.com/5784/54c1af5074c0c7124fda5b57da078ca6295b8cb6_hq.gif",
    "https://giffiles.alphacoders.com/130/13054.gif",
    "https://i.pinimg.com/originals/55/50/ff/5550ff060e3a882e6fbb9c05abbc9e21.gif",
    "https://pa1.aminoapps.com/5784/54c1af5074c0c7124fda5b57da078ca6295b8cb6_hq.gif",
    "https://i.pinimg.com/originals/4a/39/bd/4a39bdc17609aff6256ce0210927c947.gif"
];
let currentIndex = 0;
function changeBackground() {
    document.body.style.background = `url('${gifs[currentIndex]}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    currentIndex = (currentIndex + 1) % gifs.length;
}
changeBackground();
setInterval(changeBackground, 1100);
 // -----------------------------
  // VIEWS & LIKES — Using CountAPI + Local Fallback
  // -----------------------------
  const NAMESPACE = "manav-portfolio-2025";
  const viewCount = document.getElementById("viewCount");
  const likeCount = document.getElementById("likeCount");
  const likeSection = document.getElementById("likeSection");

  // Ensure keys exist (create if missing)
  async function ensureKey(key) {
    try {
      const res = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${key}`);
      if (res.ok) return true;
      const createRes = await fetch(
        `https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=${key}&value=0`
      );
      return createRes.ok;
    } catch (err) {
      console.warn("ensureKey error", err);
      return false;
    }
  }

  // Views increment
  async function hitViews() {
    try {
      const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/views?time=${Date.now()}`);
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      viewCount.textContent = data.value ?? viewCount.textContent ?? "0";
    } catch (err) {
      console.warn("hitViews failed — fallback", err);
      const fallback = parseInt(localStorage.getItem("views_fallback") || "0", 10) + 1;
      localStorage.setItem("views_fallback", fallback);
      viewCount.textContent = fallback;
    }
  }

  // Load likes
  async function getLikes() {
    try {
      const res = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/likes`);
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      likeCount.textContent = data.value ?? "0";
    } catch (err) {
      console.warn("getLikes failed — fallback", err);
      likeCount.textContent = localStorage.getItem("likes_fallback") || "0";
    }
  }

  // Init counters
  async function initCounters() {
    await ensureKey("views");
    await ensureKey("likes");
    await hitViews();
    await getLikes();

    // Restore liked state from localStorage
    const likeIcon = likeSection.querySelector("i");
    if (localStorage.getItem("userLiked") === "true") {
      likeIcon.classList.remove("fa-regular");
      likeIcon.classList.add("fa-solid", "liked-icon");
    }
  }
  initCounters();

  // Confetti effect
  function launchConfetti() {
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1500);
    }
  }

  // Floating heart effect
  function floatHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤️";
    likeSection.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  // Like button click handler
  likeSection.addEventListener("click", async () => {
    try {
      const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/likes`);
      const data = await res.json();
      likeCount.textContent = data.value ?? parseInt(likeCount.textContent) + 1;
    } catch (err) {
      console.warn("like increment failed — fallback used", err);
      const fallbackLikes =
        parseInt(localStorage.getItem("likes_fallback") || likeCount.textContent || "0", 10) + 1;
      localStorage.setItem("likes_fallback", fallbackLikes);
      likeCount.textContent = fallbackLikes;
    }

    // Fill icon red + save state
    const likeIcon = likeSection.querySelector("i");
    likeIcon.classList.remove("fa-regular");
    likeIcon.classList.add("fa-solid", "liked-icon");
    localStorage.setItem("userLiked", "true");

    // Animation + confetti
    likeSection.classList.add("bounce");
    launchConfetti();
    floatHeart();
    setTimeout(() => likeSection.classList.remove("bounce"), 400);
  });

// -----------------------------
// MESSAGES / GREETING
// -----------------------------
const rotatingMessages = document.getElementById("rotatingMessages");
let messageInterval;

function startRotatingMessages() {
    const messages = [
        "Hey there! My name is Manav 👋",
        "Let's connect and collaborate 🚀",
        "Drop me a message on LinkedIn 📩",
        "Check out my projects below! 💻",
        "Feel free to star my GitHub repos ⭐",
        "Follow me on Instagram for updates 📸",
        "I love making cool stuff! 🎨",
        "Always learning and growing 🌱",
        "Thanks for visiting my profile! 🙏",
        "Let's make a difference together! 🌟"
    ];

    let currentIndex = 0;

    if (messageInterval) clearInterval(messageInterval);

    function showMessage() {
        // Fade out
        rotatingMessages.style.opacity = 0;
        rotatingMessages.style.transform = "translateY(10px)";

        // After fade-out, change text and fade in
        setTimeout(() => {
            rotatingMessages.textContent = messages[currentIndex];
            rotatingMessages.style.opacity = 1;
            rotatingMessages.style.transform = "translateY(0)";
            currentIndex = (currentIndex + 1) % messages.length;
        }, 400); // matches CSS transition
    }

    showMessage();
    messageInterval = setInterval(showMessage, 3500);
}

function updateMessages() {
    if (window.innerWidth <= 768) {
        // Small screens: empty messages
        rotatingMessages.textContent = "";
        rotatingMessages.style.opacity = 0;
        rotatingMessages.style.transform = "translateY(0)";
        if (messageInterval) clearInterval(messageInterval);
    } else {
        startRotatingMessages();
    }
}

// Initial call
updateMessages();

// Update on resize
window.addEventListener("resize", updateMessages);

// -----------------------------
// START SCREEN CLICK
// -----------------------------
startScreen.addEventListener("click", () => {
    startScreen.style.opacity = "0";
    setTimeout(() => startScreen.style.display = "none", 500);
    mainContent.classList.add("show");

    // Play background music automatically
    bgMusic.play().catch(() => {});

    // Show theme and music toggle icons
    themeToggle.style.display = "inline-block";
    musicToggle.style.display = "inline-block";

    // Show messages now
    handleMessages();

    document.body.style.cursor = "auto";
});

// -----------------------------
// UPDATE ON RESIZE
// -----------------------------
window.addEventListener("resize", () => {
    // Only update messages if main content is shown
    if (mainContent.classList.contains("show")) handleMessages();
});


// -----------------------------
// THEME TOGGLE (DARK/ LIGHT)
// -----------------------------
document.body.classList.remove("light-mode"); // default: dark
themeIcon.classList.replace("fa-moon", "fa-sun");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }
});

// -----------------------------
// MUSIC TOGGLE (uses already defined constants)
// -----------------------------
bgMusic.play().catch(() => {}); // play by default
musicOnIcon.style.display = "inline";
musicOffIcon.style.display = "none";

musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicOnIcon.style.display = "inline";   // Show ON icon
        musicOffIcon.style.display = "none";    // Hide OFF icon
    } else {
        bgMusic.pause();
        musicOnIcon.style.display = "none";     // Hide ON icon
        musicOffIcon.style.display = "inline";  // Show OFF icon
    }
});


const titleText = "👨‍💻 Manav | 🌐 Manav-0n-Site";
let index = 0;
let direction = 1; // 1 = forward, -1 = backward

function animateTitle() {
    document.title = titleText.slice(0, index);
    
    index += direction;

    if (index > titleText.length) direction = -1;
    if (index < 0) direction = 1;

    setTimeout(animateTitle, 300); // change speed here
}

animateTitle();


function copyWhatsApp(event) {
    event.preventDefault(); // Prevents page reload
    const number = "+91 9876543210"; // Replace with your actual number
    navigator.clipboard.writeText(number).then(() => {
      alert("WhatsApp number copied: " + number);
    });
  }
