import { dashboardView } from './views/dashboard.js';
import { mealsView } from './views/meals.js';
import { activityView } from './views/activity.js';
import { hydrationView } from './views/hydration.js';
import { settingsView } from './views/settings.js';

const routes = {
    '': dashboardView,
    '#dashboard': dashboardView,
    '#meals': mealsView,
    '#activity': activityView,
    '#hydration': hydrationView,
    '#settings': settingsView
};

const viewContainer = document.getElementById('view-container');

function navigate() {
    const hash = window.location.hash || '#dashboard';
    const view = routes[hash] || dashboardView;
    
    // Inject the HTML template
    viewContainer.innerHTML = view;

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    // Re-initialize scripts specific to each mounted view
    initViewScripts(hash);
}

function initViewScripts(hash) {
    if (hash === '#dashboard' || hash === '') {
        // Dashboard animations
        setTimeout(() => {
            const circle = document.querySelector('.progress-circle');
            if (circle) circle.style.strokeDashoffset = '73.5';

            const fills = document.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const targetWidth = fill.getAttribute('data-width');
                fill.style.width = targetWidth;
            });
            
            initActivityBars();
        }, 100);
        setupHydrationWidget();
    } else if (hash === '#activity') {
        setTimeout(() => {
             initActivityBars();
        }, 100);
    } else if (hash === '#hydration') {
        setupHydrationWidget(true);
    }
}

const weeklySteps = [
  { day: "Mon", steps: 4800 },
  { day: "Tue", steps: 6500 },
  { day: "Wed", steps: 5200 },
  { day: "Thu", steps: 8800 },
  { day: "Fri", steps: 8452 },
  { day: "Sat", steps: 3100 },
  { day: "Sun", steps: 4500 }
];

function getTrend(index) {
  if (index === 0) return { value: "0%", type: "neutral" };
  const current = weeklySteps[index].steps;
  const previous = weeklySteps[index - 1].steps;
  const percent = Math.round(((current - previous) / previous) * 100);

  if (percent > 0) return { value: `+${percent}%`, type: "up" };
  if (percent < 0) return { value: `${percent}%`, type: "down" };
  return { value: "0%", type: "neutral" };
}

function animateNumber(element, targetValue) {
    let startTimestamp = null;
    const duration = 400; // ms
    const startStr = element.textContent.replace(/,/g, '');
    const startValue = parseInt(startStr) || 0;
    const diff = targetValue - startValue;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        
        element.textContent = Math.floor(startValue + diff * easeProgress).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    };
    window.requestAnimationFrame(step);
}

function initActivityBars() {
    const bars = document.querySelectorAll('.bar');
    const stepsCountTarget = document.getElementById('stepsCount');
    const trendBadge = document.getElementById('trendBadge');
    
    bars.forEach((bar, index) => {
        // Animation
        const targetHeight = bar.getAttribute('data-height');
        setTimeout(() => bar.style.height = targetHeight, 100);

        // Click interaction
        bar.addEventListener('click', () => {
            bars.forEach(b => b.classList.remove('active'));
            bar.classList.add('active');
            
            if (stepsCountTarget && trendBadge) {
                const targetSteps = weeklySteps[index] ? weeklySteps[index].steps : parseInt((bar.getAttribute('data-steps') || "0").replace(/,/g, ''));
                if(weeklySteps[index]) {
                    animateNumber(stepsCountTarget, targetSteps);
                    
                    const trend = getTrend(index);
                    let iconHtml = '';
                    if (trend.type === 'up') iconHtml = '<i class="ph ph-trend-up"></i> ';
                    else if (trend.type === 'down') iconHtml = '<i class="ph ph-trend-down"></i> ';
                    
                    trendBadge.innerHTML = `${iconHtml}${trend.value}`;
                    trendBadge.className = `trend-badge ${trend.type}`;
                }
            }
        });
    });
}

function setupHydrationWidget(isLarge = false) {
    const suffix = isLarge ? '-large' : '';
    const hydroTitle = document.getElementById('water-count' + suffix);
    const hydroWave = document.getElementById('water-wave' + suffix);
    const hydroBtn = document.querySelector('.add-water-btn');
    
    // We can use a global state to persist across views, but for UI demo local variables serve perfectly
    window.waterGlasses = window.waterGlasses || 4; 
    const maxGlasses = 8;
    
    const updateUI = () => {
        if(hydroTitle) hydroTitle.innerText = window.waterGlasses;
        if(hydroWave) hydroWave.style.height = `calc(${(window.waterGlasses / maxGlasses) * 100}% + 20px)`;
    };
    
    // Set initial
    updateUI();

    if (hydroBtn) {
        hydroBtn.addEventListener('click', () => {
            if (window.waterGlasses < maxGlasses) {
                window.waterGlasses++;
                updateUI();
                
                // Pop animation
                hydroBtn.style.transform = 'scale(0.9)';
                setTimeout(() => hydroBtn.style.transform = 'scale(1)', 150);
            }
        });
    }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
    navigate();

    // Theme Setup & Persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    const updateThemeIcons = () => {
        const isLight = document.body.classList.contains('light-mode');
        themeBtns.forEach(btn => {
            btn.innerHTML = isLight ? '<i class="ph-fill ph-sun"></i>' : '<i class="ph-fill ph-moon"></i>';
        });
    };
    updateThemeIcons();

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeIcons();
        });
    });

    // Profile Modal Logic
    const profileTrigger = document.querySelector('.user-profile');
    const profileModalOverlay = document.getElementById('profile-modal-overlay');
    const profileModalCloseBtn = document.querySelector('.modal-close-btn');

    const openProfile = () => { if(profileModalOverlay) profileModalOverlay.classList.add('show'); };
    const closeProfile = () => { if(profileModalOverlay) profileModalOverlay.classList.remove('show'); };

    if (profileTrigger) profileTrigger.addEventListener('click', openProfile);
    if (profileModalCloseBtn) profileModalCloseBtn.addEventListener('click', closeProfile);
    if (profileModalOverlay) {
        profileModalOverlay.addEventListener('click', (e) => {
            if (e.target === profileModalOverlay) closeProfile();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProfile();
    });

    // Sidebar Responsiveness Setup
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const collapseBtn = document.getElementById('collapse-btn');

    // Mobile Hamburger Open
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('show');
        });
    }

    // Mobile Overlay Close
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }

    // Desktop Collapse Toggle
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('desktop-collapsed');
        });
    }

    // Handle Screen Resize Correctly
    function handleResize() {
        const isMobile = window.innerWidth <= 900;
        
        if (!isMobile) {
            // Desktop: remove mobile states
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('show');
        } else {
            // Mobile: remove desktop states
            sidebar.classList.remove('desktop-collapsed');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // initialize correct state depending on run size
});
