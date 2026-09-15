// ==========================================
// 1. TELEGRAM BOT SETTINGS
// (သင့် Telegram Bot Token နှင့် Chat ID တို့ကို ဒီနေရာမှာ ထည့်ပေးပါ)
// ==========================================
const BOT_TOKEN = "8734400059:AAEG65eRIgOa69qyk5X2a2sOn29lCc-99Us"; // BotFather မှ ရရှိသော Token
const CHAT_ID = "8856197770";     // userinfobot မှ ရရှိသော ID

// ==========================================
// 2. PAGE NAVIGATION (စာမျက်နှာ ပြောင်းလဲခြင်း)
// ==========================================
let currentPage = 0;
const pages = document.querySelectorAll('.page');

function showPage(index) {
    pages.forEach((page, i) => {
        if (i === index) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    currentPage = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function goToPage(index) {
    showPage(index);
}

// ==========================================
// 3. DAYS COUNTER (စတင်ချစ်ခဲ့သည့် ရက်စွဲ)
// Anniversary Date: 2024-01-11, 00:48:00
// ==========================================
const startDate = new Date('2024-01-11T00:48:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (document.getElementById('days')) document.getElementById('days').innerText = days;
    if (document.getElementById('hours')) document.getElementById('hours').innerText = hours;
    if (document.getElementById('minutes')) document.getElementById('minutes').innerText = minutes;
    if (document.getElementById('seconds')) document.getElementById('seconds').innerText = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// ==========================================
// 4. REASON GENERATOR (ချစ်ရသည့် အကြောင်းအရင်းများ)
// ==========================================
const reasons = [
    "မမရဲ့ ချစ်စရာကောင်းတဲ့ အပြုံးလေးတွေကြောင့် ❤️",
    "စိတ်ဆိုး စိတ်ကောက်ရင်တောင် အမြဲတမ်း ချစ်စရာကောင်းနေလို့ 🥰",
    "မောင် စိတ်ညစ်နေရင် အမြဲ နားလည်ပေးပြီး အားပေးလို့ 🌸",
    "မမနဲ့ ရှိနေရင် ဘဝက အရမ်းအဓိပ္ပါယ်ရှိလို့ ✨",
    "မမရဲ့ နွေးထွေးတဲ့ ဂရုစိုက်မှုလေးတွေကြောင့် 💖"
];

function showReason() {
    const reasonText = document.getElementById('reason-text');
    const randomIndex = Math.floor(Math.random() * reasons.length);
    if (reasonText) {
        reasonText.innerText = reasons[randomIndex];
    }
}

// ==========================================
// 5. INTERACTIVE BUTTONS ("မချစ်ပါဘူး" ခလုတ် ပြေးခိုင်းခြင်း)
// ==========================================
function moveButton(btn) {
    const container = document.getElementById('interactive-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - btn.offsetWidth;
    const maxY = containerRect.height - btn.offsetHeight;

    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    btn.style.position = 'absolute';
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
}

function acceptedLove() {
    alert('မမလည်း ချစ်တယ်ဆိုတာ သိပါတယ်နော်! 🥰💖');
    for (let i = 0; i < 20; i++) {
        setTimeout(createFloatingHeart, i * 100);
    }
}

// ==========================================
// 6. SPECIAL PERMIT CARDS (အခွင့်အရေး လက်မှတ်များ + TELEGRAM BOT)
// ==========================================
function useCoupon(btn, cardTitle) {
    btn.innerText = "ထုတ်ယူပြီးပါပြီ ❤️";
    btn.classList.add("used");
    btn.disabled = true;

    // အသည်းပုံ Effect ပျံတက်မည်
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingHeart, i * 80);
    }

    // Telegram မက်ဆေ့ချ် ပို့ခြင်း
    const message = `🎉 မမ က "${cardTitle}" အခွင့်အရေးကို ထုတ်ယူလိုက်ပါပြီ! ❤️`;

    if (BOT_TOKEN !== "YOUR_TELEGRAM_BOT_TOKEN" && CHAT_ID !== "YOUR_TELEGRAM_CHAT_ID") {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        })
        .then(res => res.json())
        .then(data => console.log("Telegram Message Sent:", data))
        .catch(err => console.log("Telegram Error:", err));
    }
}

// ==========================================
// 7. FLOATING HEART ANIMATION (အသည်းပုံ ပျံတက်သည့် Effect)
// ==========================================
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// ==========================================
// 8. BACKGROUND MUSIC CONTROLS (သီချင်း ဖွင့်/ပိတ်)
// ==========================================
let musicStarted = false;

function startMusicOnFirstClick() {
    if (!musicStarted) {
        const music = document.getElementById('bg-music');
        if (music) {
            music.play().catch(e => console.log("Audio play error:", e));
            musicStarted = true;
        }
    }
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    if (!music) return;

    if (music.paused) {
        music.play();
        if (icon) icon.className = "fas fa-music";
    } else {
        music.pause();
        if (icon) icon.className = "fas fa-volume-mute";
    }
}
