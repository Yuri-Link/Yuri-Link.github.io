// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Slight delay for the outline for a smooth, jelly feel
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 150, fill: "forwards" });
});

// Cursor hover effects on interactables
const interactables = document.querySelectorAll('a, button, .jelly-hover');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(199, 125, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// --- Loading Screen Fade Out ---
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800); // Gives time to show off the jelly animation
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            
            // Trigger counter animation if it's the stats section
            if (entry.target.id === 'yurilink') {
                runCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

// --- Stat Counters ---
let countersRun = false;
function runCounters() {
    if (countersRun) return;
    countersRun = true;
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Formatting for thousands
                counter.innerText = target > 999 ? (target/1000).toFixed(1) + 'k+' : target + (target === 99 ? '%' : '+');
            }
        };
        updateCounter();
    });
}

// --- Modals (TOS & Privacy) ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// --- Discord OAuth2 Implementation Strategy ---

// [PLACEHOLDERS] - Replace these with your actual details safely in your backend/frontend
const DISCORD_CLIENT_ID = 'YOUR_CLIENT_ID_PLACEHOLDER';
const REDIRECT_URI = encodeURIComponent('https://yuri-link.github.io');
// The endpoint on your Python/PySide/Cogs backend that receives the code
const API_ENDPOINT = 'https://localhost:8080/v1/auth/discord/review';

const loginBtn = document.getElementById('discord-login-btn');

loginBtn.addEventListener('click', () => {
    // 1. Construct the secure OAuth2 URL
    // We request 'identify' to know who they are, and 'guilds' (optional) if you need server data.
    const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
    
    // 2. Redirect the user to Discord
    window.location.href = oauthUrl;
});

// 3. Handle returning from Discord
window.addEventListener('DOMContentLoaded', () => {
    // Check if URL has an authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // UI Update: Hide login button, show loading or success
        document.getElementById('auth-section').classList.add('hidden');
        const successDiv = document.getElementById('auth-success');
        successDiv.classList.remove('hidden');
        
        // Scroll to review section so user sees the success state
        document.getElementById('review').scrollIntoView();

        // 4. Send code to YOUR backend (never validate on frontend)
        /* 
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        })
        .then(res => res.json())
        .then(data => {
            // Backend should respond saying: "Success, bot is DMing user now"
            console.log("Backend authorized user successfully.");
            
            // Clean up the URL so the code isn't sitting in the address bar
            window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => {
            console.error("Failed to authenticate with backend:", err);
            // Handle error UI here
        });
        */
        
        // For visual purposes right now, clean the URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
