/* ============ THEME TOGGLE ============ */
const body = document.body;
const themeBtn = document.getElementById('themeToggle');
function setTheme(t){
  body.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('foclock-landing-theme', t);
}
const savedTheme = localStorage.getItem('foclock-landing-theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  setTheme(body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ============ HERO PROGRESS RING (live demo loop, matches app's session ring) ============ */
(function () {
  const ring = document.querySelector('.index-card .ring-fill');
  const timeEl = document.querySelector('.index-card .ring-time');
  const elapsedEl = document.querySelector('.index-card .ring-sub');
  const xpEl = document.querySelector('.index-card .xp');

  if (!ring || !timeEl || !elapsedEl || !xpEl) return;

  const circumference = 2 * Math.PI * 100; // r = 100
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;

  // Your current session state:
  // 29 minutes elapsed + 17 minutes remaining = 46 minutes total.
  const initialElapsed = 29 * 60;
  const initialRemaining = 17 * 60;
  const sessionLength = initialElapsed + initialRemaining;

  // Start the ring at ~75% and let it finish smoothly to 100% by the end of the 17 minutes.
  const visualStart = 0.75;

  let remaining = initialRemaining;
  let elapsed = initialElapsed;
  let xp = 29;

  function render() {
    const safeRemaining = Math.max(0, remaining);
    const m = String(Math.floor(safeRemaining / 60)).padStart(2, '0');
    const s = String(safeRemaining % 60).padStart(2, '0');
    timeEl.textContent = `${m}:${s}`;

    const em = Math.floor(elapsed / 60);
    const es = elapsed % 60;
    elapsedEl.textContent = `Elapsed: ${em}m ${es}s`;

    const completed = initialRemaining - safeRemaining;
    const progress = visualStart + (completed / initialRemaining) * (1 - visualStart);
    ring.style.strokeDashoffset = String(circumference * (1 - progress));

    xpEl.textContent = `+${xp} XP`;
  }

  render();

  setInterval(() => {
    if (remaining <= 0) {
      remaining = initialRemaining;
      elapsed = initialElapsed;
      xp = 29;
      render();
      return;
    }

    remaining -= 1;
    elapsed += 1;

    if ((sessionLength - remaining) % 60 === 0 && remaining > 0) {
      xp += 1;
    }

    render();
  }, 1000);
})();

/* ============ FEATURE BOOK ============ */
const features = [
  { fnum:'Chapter 1', title:'Welcome to Foc Lock',
    desc:"Foc Lock is an all-in-one study and focus tracker, built as a web app so it works on any phone or computer with nothing to install from an app store. It brings your timer, an AI study assistant, your friends, and your progress history into one screen — so you can actually sit down and study without juggling five separate apps." },
  { fnum:'Chapter 2', title:'The Home Page',
    desc:"On the Home page, you'll find today's stats at a glance — your current streak, XP earned, and total study time — along with a quick-start button that drops you straight into a new focus session. It's built to be the first thing you see and the fastest way to get moving." },
  { fnum:'Chapter 3', title:'Starting a Session',
    desc:"You can start a session with a few taps: pick your subject, set a duration (or go custom), and choose an ambient sound to study alongside — rain, white noise, or silence, whatever helps you lock in. Once it starts, a distraction-free lock screen keeps the timer front and center until you're done." },
  { fnum:'Chapter 4', title:'Foc Space — Your Study Tools',
    desc:"Foc Space is where the utility tools live. You can use tools like Foc Calc, a full scientific calculator, right there mid-session — no need to close your timer or switch apps just to work through a problem. More tools live here as the app grows." },
  { fnum:'Chapter 5', title:'Foco — Your AI Study Buddy',
    desc:"Foco is a built-in AI assistant, powered by Gemini, that lives right inside your focus flow. Talk to it by voice or by text, attach a file for it to read, or ask it to generate an image when you need a visual explanation. It's less a separate chatbot and more a study partner who's always in the room." },
  { fnum:'Chapter 6', title:'Foco Remembers the Conversation',
    desc:"Your chats with Foco are saved, so you can pick up a conversation later instead of starting over each time. Whether it's a half-finished explanation or a question from yesterday, it stays right where you left it." },
  { fnum:'Chapter 7', title:'Friends & Leaderboard',
    desc:"Add friends instantly with a 6-character invite code — no searching, no waiting on approval. Once you're connected, you'll see each other's study time on a live leaderboard, which turns quiet, solo studying into something a little competitive and a lot more motivating." },
  { fnum:'Chapter 8', title:'Your Profile & Avatar',
    desc:"Every account gets a personalized avatar, generated to match your profile, so friends can recognize you at a glance on the leaderboard. It's a small touch, but it makes the social side of the app feel a little more like you." },
  { fnum:'Chapter 9', title:'Progress & History',
    desc:"Every session you complete gets logged automatically with its subject and duration. You can filter your history by subject or by a custom date range, and edit or delete any entry if something needs correcting. Watching the totals climb week over week becomes its own kind of motivation." },
  { fnum:'Chapter 10', title:'Streaks, XP & Achievements',
    desc:"Finishing sessions earns you XP and keeps your daily streak alive, turning consistency into something you can see and track instead of just something you hope you're doing. It's a small layer of game feel on top of real study time." },
  { fnum:'Chapter 11', title:'Notifications That Actually Arrive',
    desc:"Session and reminder alerts are engineered to actually deliver — even on Android Chrome, where web notifications are notoriously unreliable. When your session ends or a reminder is due, you'll know, without needing the app open in the foreground." },
  { fnum:'Chapter 12', title:'Mini Player Mode',
    desc:"Need to work in other tabs mid-session? The timer can pop out into Picture-in-Picture mode, staying visible in a small floating window no matter where else you're browsing on your device." },
  { fnum:'Chapter 13', title:'Synced Across Every Device',
    desc:"Your account, sessions, and chat history are all synced to the cloud, so signing in on your phone shows the exact same progress as your laptop. Start a session on one device, check your stats on another — nothing gets left behind." },
  { fnum:'Chapter 14', title:'Made for Every Screen',
    desc:"The whole app is designed mobile-first, then centered and scaled for desktop — so whether you're studying from a phone between classes or a laptop at a desk, the experience feels the same and just as focused." },
  { fnum:'Chapter 15', title:'Ready to Lock In?',
    desc:"That's Foc Lock, start to finish — one app for timing your sessions, thinking through problems, studying with an AI at your side, and staying accountable to your friends and your own history. Turn the page back around whenever you like, or head to the install section below to get it on your device." },
];

const book = document.getElementById('book');
const dotsWrap = document.getElementById('bookDots');
const pageLabel = document.getElementById('bookPageLabel');
let current = 0;
const totalPages = features.length;

features.forEach((f, i) => {
  const page = document.createElement('div');
  page.className = 'book-page';
  page.innerHTML = `
    <div class="spine"></div>
    <div class="fnum">${f.fnum}</div>
    <div class="rule"></div>
    <h3>${f.title}</h3>
    <p>${f.desc}</p>
    <div class="pagenum">Page ${i+1} of ${totalPages}</div>
  `;
  book.appendChild(page);

  const dot = document.createElement('span');
  dotsWrap.appendChild(dot);
});

const allPages = book.querySelectorAll('.book-page');

function renderBook(){
  allPages.forEach((p, i) => {
    p.classList.remove('current', 'past');
    p.style.zIndex = '';
    if(i === current){
      p.classList.add('current');
    } else if(i < current){
      p.classList.add('past');
    } else {
      // future pages: flat, stacked beneath current, nearer pages on top
      p.style.zIndex = String(totalPages - i);
    }
  });
  document.querySelectorAll('#bookDots span').forEach((d,i) => {
    d.classList.toggle('active', i === current);
  });
  pageLabel.textContent = `Page ${current+1} of ${totalPages}`;
}
renderBook();

// Looping navigation: Next past the last page snaps back to page 1 (no jarring multi-flip),
// Prev before the first page snaps to the last page.
function snapTo(targetIndex){
  allPages.forEach(p => { p.style.transition = 'none'; });
  current = targetIndex;
  renderBook();
  // force reflow so the transition:none actually applies before we restore it
  void book.offsetHeight;
  allPages.forEach(p => { p.style.transition = ''; });
}

document.getElementById('bookNext').addEventListener('click', () => {
  if(current < totalPages - 1){
    current++;
    renderBook();
  } else {
    snapTo(0);
  }
});
document.getElementById('bookPrev').addEventListener('click', () => {
  if(current > 0){
    current--;
    renderBook();
  } else {
    snapTo(totalPages - 1);
  }
});

// Swipe to change page on touch devices
(function(){
  let touchStartX = 0;
  let touchStartY = 0;
  book.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive:true });
  book.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if(Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return; // ignore small/vertical swipes
    if(dx < 0){
      if(current < totalPages - 1){ current++; renderBook(); } else { snapTo(0); }
    } else {
      if(current > 0){ current--; renderBook(); } else { snapTo(totalPages - 1); }
    }
  }, { passive:true });
})();

/* ============ INSTALL STEPS ============ */
const stepsByMode = {
  mobile: [
    { title:'Open the browser menu', desc:'Tap the three-dot menu in the top-right corner of Chrome.', img:'https://i.postimg.cc/8zCr2nJ5/Screenshot-20260711-123809-com-android-chrome-Chrome-Tabbed-Activity-edit-366312154070294.jpg' },
    { title:'Find Install and create shortcut', desc:'Scroll down and tap on Install and Shortcuts', img:'https://i.postimg.cc/NjPrB7mx/Screenshot-20260711-123817-com-android-chrome-Chrome-Tabbed-Activity-edit-366370713406913.jpg' },
    { title:'Click Install', desc:'Tap on the install option and install the app', img:'https://i.postimg.cc/52kFbqLS/Screenshot-20260711-123927-com-android-chrome-Chrome-Tabbed-Activity-edit-366418821451454.jpg' },
  ],
  desktop: [
    { title:'Open the browser menu', desc:'Tap the three-dot menu in the top-right corner of Chrome.', img:'https://i.postimg.cc/7Lgtp6JF/Screenshot-2026-07-11-123142.png' },
    { title:'Find Install page as app', desc:'Locate the Cast, Save and Share then Install page as app', img:'https://i.postimg.cc/653SytF2/image.png' },
    { title:'Confirm install', desc:'Click "Install" — Foc Lock now opens as its own desktop app.', img:'https://i.postimg.cc/9fGgvMwK/Screenshot-2026-07-11-123458.png' },
  ],
};

let installMode = 'mobile';
let steps = stepsByMode[installMode];

const stepsTrack = document.getElementById('stepsTrack');
const phoneframeEl = document.getElementById('phoneframe');
const deskframeEl = document.getElementById('deskframe');
let stepCurrent = 0;

function buildStepsTrack(){
  stepsTrack.innerHTML = '';
  steps.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'step-item';
    el.dataset.index = i;
    el.innerHTML = `
      <div class="step-badge">${i+1}</div>
      <div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `;
    el.addEventListener('click', () => { stepCurrent = i; renderSteps(); });
    stepsTrack.appendChild(el);
  });
}
buildStepsTrack();

function renderSteps(){
  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.toggle('active', i === stepCurrent);
  });

  const isMobile = installMode === 'mobile';
  const imgId = isMobile ? 'stepImg' : 'deskImg';
  const fallbackId = isMobile ? 'stepImgFallback' : 'deskImgFallback';
  const labelId = isMobile ? 'stepImgLabel' : 'deskImgLabel';

  const img = document.getElementById(imgId);
  const fallback = document.getElementById(fallbackId);
  img.style.display = 'block';
  fallback.style.display = 'none';
  img.src = steps[stepCurrent].img;
  document.getElementById(labelId).textContent = steps[stepCurrent].title;

  document.getElementById('stepPrev').disabled = stepCurrent === 0;
  document.getElementById('stepNext').disabled = stepCurrent === steps.length - 1;
}
renderSteps();

document.getElementById('stepNext').addEventListener('click', () => {
  if(stepCurrent < steps.length - 1){ stepCurrent++; renderSteps(); }
});
document.getElementById('stepPrev').addEventListener('click', () => {
  if(stepCurrent > 0){ stepCurrent--; renderSteps(); }
});

// Mobile / Desktop mode toggle
document.getElementById('modeMobile').addEventListener('click', () => setInstallMode('mobile'));
document.getElementById('modeDesktop').addEventListener('click', () => setInstallMode('desktop'));

function setInstallMode(mode){
  if(mode === installMode) return;
  installMode = mode;
  steps = stepsByMode[installMode];
  stepCurrent = 0;

  document.getElementById('modeMobile').classList.toggle('active', mode === 'mobile');
  document.getElementById('modeDesktop').classList.toggle('active', mode === 'desktop');
  phoneframeEl.style.display = mode === 'mobile' ? 'block' : 'none';
  deskframeEl.style.display = mode === 'desktop' ? 'block' : 'none';

  buildStepsTrack();
  renderSteps();
}

/* ============ DEVELOPER AVATAR — fallback to initial if image.jpg missing ============ */
(function () {
  const avatar = document.getElementById("devAvatar");
  const fallback = document.getElementById("devAvatarFallback");

  const img = new Image();
  img.onload = () => {
    fallback.style.display = "none";
  };
  img.onerror = () => {
    avatar.style.backgroundImage = "none";
    fallback.style.display = "block";
  };

  img.src = "https://bitto.pages.dev/profile%20pic.jpg";
})();

/* ============ SUPPORT BUTTON — expands to bKash + SupportKori ============ */
const supportDefault = document.getElementById('supportDefault');
const supportOptions = document.getElementById('supportOptions');

document.getElementById('supportBtn').addEventListener('click', () => {
  supportDefault.style.display = 'none';
  supportOptions.classList.add('show');
});
document.getElementById('supportBack').addEventListener('click', () => {
  supportOptions.classList.remove('show');
  supportDefault.style.display = 'block';
});

// bKash — copy number to clipboard
const REAL_BKASH_NUMBER = "01932887397"; // <-- Replace with your real number

const bkashAction = document.getElementById('bkashAction');

document.getElementById('bkashOpt').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(REAL_BKASH_NUMBER);

    bkashAction.textContent = "Copied ✓";
    setTimeout(() => {
      bkashAction.textContent = "Copy";
    }, 1800);

  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = REAL_BKASH_NUMBER;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);

    bkashAction.textContent = "Copied ✓";
    setTimeout(() => {
      bkashAction.textContent = "Copy";
    }, 1800);
  }
});
