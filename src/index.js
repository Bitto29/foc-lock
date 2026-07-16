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
    desc:"Foc Lock is an all-in-one study and focus tracker, built as a web app so it works on any phone or computer with nothing to install from an app store. It brings your timer, your subjects, your friends, and your progress into one screen — so you can actually sit down and study without juggling five separate apps." },
  { fnum:'Chapter 2', title:'Starting a Focus Session',
    desc:"From the Home page you can start a new focus session in seconds. Pick a subject to study — like Mathematics — or add sub-subjects under it, and use the plus button to stack multiple subjects into a single session. Set how long you want to study, hit start, and a counter begins running for that exact duration." },
  { fnum:'Chapter 3', title:'Your Day at a Glance',
    desc:"The Home page also shows today's numbers at a glance — how long you've studied, your total XP, your total sessions, and how close you are to hitting today's daily goal. If you studied something offline, an Add Session option lets you log it after the fact so your stats stay accurate." },
  { fnum:'Chapter 4', title:'Inside a Session',
    desc:"Once a session starts, it opens in a distraction-free full-screen lock — your screen won't fall asleep, and the timer keeps running the whole time. You can minimize it if you need to step into another view, and it stays alive in the background." },
  { fnum:'Chapter 5', title:'Staying Honest Mid-Session',
    desc:"To make sure you're actually studying and not just leaving the timer running, Foc Lock checks in with a notification every 5 minutes if it hasn't heard from you. If you pause a session, a countdown starts and shows exactly how long you've been paused, with notifications nudging you to come back." },
  { fnum:'Chapter 6', title:'No Easy Way Out',
    desc:"If you try to end a session before its time is up, Foc Lock won't just let you quit — you have to solve a quick math problem first. That small bit of friction makes you pause and actually think before giving up on a session early." },
  { fnum:'Chapter 7', title:'Ambient Sound While You Study',
    desc:"During a session, you can turn on ambient sound or music to study alongside — whatever helps you stay in the zone without leaving the app or breaking focus." },
  { fnum:'Chapter 8', title:'Progress & History',
    desc:"The Progress page shows a full picture of everything you've studied — your daily activity and every recent session. If a session was logged wrong, you can edit or delete it directly from here." },
  { fnum:'Chapter 9', title:'Foc Space — Your Study Tools',
    desc:"Foc Space is your study toolkit. It includes a full advanced scientific calculator for working through problems mid-session, plus a Notes feature where you can save notes by subject — all synced online, so they're there whenever you come back." },
   { fnum:'Chapter 10', title:'Foco — Your AI Study Buddy',
    desc:"Foco is a built-in AI assistant, powered by Gemini, that lives right inside your focus flow. Talk to it by voice or by text, attach a file for it to read, or ask it to generate an image when you need a visual explanation. It's less a separate chatbot and more a study partner who's always in the room." },
  { fnum:'Chapter 11', title:'Friends & Achievements',
    desc:"The Friends tab shows your total XP and achievements at a glance, and lets you compete with your friends directly — turning quiet, solo studying into something a little more motivating." },
  { fnum:'Chapter 12', title:'Synced Across Every Device',
    desc:"Your account, sessions, and chat history are all synced to the cloud, so signing in on your phone shows the exact same progress as your laptop. Start a session on one device, check your stats on another — nothing gets left behind." },
  { fnum:'Chapter 13', title:'Made for Every Screen',
    desc:"The whole app is designed mobile-first, then centered and scaled for desktop — so whether you're studying from a phone between classes or a laptop at a desk, the experience feels the same and just as focused." },
  { fnum:'Chapter 14', title:'More — Profile & Settings',
    desc:"The More tab is where you edit your profile, adjust settings, and see personalized suggestions. You can also set your study goals and customize your theme from here." },
  { fnum:'Chapter 15', title:'Ready to Lock In?',
    desc:"That's Foc Lock, start to finish — one app for timing your sessions, tracking every subject, staying honest with yourself, and staying accountable to your friends and your own history. Head to the install section below to get it on your device." },
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
 (function () {
  const modeApk = document.getElementById("modeApk"),
      modeMobile = document.getElementById("modeMobile"),
      modeDesktop = document.getElementById("modeDesktop"),
      installWrap = document.getElementById("installWrap"),
      apkPanel = document.getElementById("apkPanel"),
      btns = [modeMobile, modeDesktop, modeApk];
  function showApk() {
      btns.forEach((b) => b.classList.remove("active"));
      modeApk.classList.add("active");
      installWrap.style.display = "none";
      apkPanel.style.display = "block";
  }
  function showWeb(btn) {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      installWrap.style.display = "";
      apkPanel.style.display = "none";
  }
  modeApk.addEventListener("click", showApk);
  modeMobile.addEventListener("click", () => {
      showWeb(modeMobile);
      if (window.setInstallMode) window.setInstallMode("mobile");
  });
  modeDesktop.addEventListener("click", () => {
      showWeb(modeDesktop);
      if (window.setInstallMode) window.setInstallMode("desktop");
  });
})();
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
