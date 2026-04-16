import { auth } from './firebase.js';
import { getUserProfile, getWeeklySteps, getHydrationCount, saveHydrationCount, saveUserProfile } from './firestoreService.js';
import { logoutUser, initAuth } from './auth.js';

import { getDashboardView } from './views/dashboard.js';
import { onboardingView } from './views/onboarding.js';
import { mealsView } from './views/meals.js';
import { activityView } from './views/activity.js';
import { hydrationView } from './views/hydration.js';
import { settingsView } from './views/settings.js';

const routes = {
    '': getDashboardView,
    '#dashboard': getDashboardView,
    '#onboarding': onboardingView,
    '#meals': mealsView,
    '#activity': activityView,
    '#hydration': hydrationView,
    '#settings': settingsView
};

const viewContainer = document.getElementById('view-container');

window.weeklySteps = [];

async function initApp() {
    viewContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: var(--text-muted);">
            <i class="ph ph-spinner-gap ph-spin" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
            <h3>Loading dashboard...</h3>
        </div>
    `;

    const user = await initAuth();
    if (!user) {
        window.location.href = "signin.html";
        return;
    }

    console.log("Logged in as:", user.email);
    try {
        await loadUserProfile();
        window.weeklySteps = await getWeeklySteps();
    } catch (err) {
        console.error("Error loading user data:", err);
    }
    navigate();
}

async function loadUserProfile() {
    const profile = await getUserProfile();
    window.userProfile = profile;
    if (!profile) return;
    
    // Sidebar profile
    const nameEl = document.querySelector('.user-info h4');
    if (nameEl) nameEl.textContent = profile.fullName;
    
    const planEl = document.querySelector('.user-info p');
    if (planEl) planEl.textContent = profile.plan;
    
    // Modal profile
    const modalContent = document.querySelector('.profile-modal');
    if (modalContent) {
        const modalH2 = modalContent.querySelector('h2');
        if (modalH2) modalH2.textContent = profile.fullName;
        
        const modalPlan = modalContent.querySelector('.modal-plan');
        if (modalPlan) modalPlan.textContent = profile.plan;
        
        const modalEmail = modalContent.querySelector('.modal-email');
        if (modalEmail) modalEmail.textContent = profile.email;
        
        const modalJoined = modalContent.querySelector('.modal-joined');
        if (modalJoined && profile.createdAt) {
            modalJoined.textContent = `Joined ${new Date(profile.createdAt).toLocaleDateString()}`;
        }
    }
}

function navigate() {
    if (!auth.currentUser) {
        window.location.href = "signin.html";
        return;
    }

    let hash = window.location.hash || '#dashboard';

    // Route Protection for onboarding
    if (!window.userProfile && hash !== '#onboarding') {
        window.location.hash = '#onboarding';
        return;
    } else if (window.userProfile && hash === '#onboarding') {
        window.location.hash = '#dashboard';
        return;
    }

    let view = routes[hash] || routes['#dashboard'];
    if (typeof view === 'function') {
        view = view(window.userProfile);
    }
    
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
                if (fill && targetWidth) fill.style.width = targetWidth;
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
    } else if (hash === '#onboarding') {
        const form = document.getElementById('onboarding-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('onboarding-submit-btn');
                btn.textContent = 'Saving Context...';
                btn.disabled = true;

                const data = {
                    fullName: document.getElementById('fullName').value,
                    age: parseInt(document.getElementById('age').value),
                    weight: parseFloat(document.getElementById('weight').value),
                    height: parseFloat(document.getElementById('height').value),
                    goal: document.getElementById('goal').value,
                    createdAt: new Date().toISOString()
                };

                await saveUserProfile(data);
                window.userProfile = await getUserProfile(); // Reload global 
                await loadUserProfile(); // Update UI sidebars
                
                window.location.hash = '#dashboard';
            });
        }
    }
}

function getTrend(index) {
  if (index === 0) return { value: "0%", type: "neutral" };
  const current = window.weeklySteps[index]?.steps || 0;
  const previous = window.weeklySteps[index - 1]?.steps || 0;
  
  if(previous === 0) return { value: current > 0 ? "+100%" : "0%", type: current > 0 ? "up" : "neutral" };
  
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
    
    // Find max step to scale the bars dynamically
    const maxSteps = window.weeklySteps.length > 0 ? Math.max(...window.weeklySteps.map(s => s.steps), 10000) : 10000;
    
    bars.forEach((bar, index) => {
        // Animation
        const targetSteps = window.weeklySteps[index] ? window.weeklySteps[index].steps : 0;
        const targetHeight = `${(targetSteps / maxSteps) * 100}%`;
        setTimeout(() => bar.style.height = targetHeight, 100);

        // Click interaction
        bar.addEventListener('click', () => {
            bars.forEach(b => b.classList.remove('active'));
            bar.classList.add('active');
            
            if (stepsCountTarget && trendBadge) {
                if(window.weeklySteps[index]) {
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

async function setupHydrationWidget(isLarge = false) {
    const suffix = isLarge ? '-large' : '';
    const hydroTitle = document.getElementById('water-count' + suffix);
    const hydroWave = document.getElementById('water-wave' + suffix);
    const hydroBtn = document.querySelector('.add-water-btn');
    
    if(!window.waterGlassesLoaded){
         window.waterGlasses = await getHydrationCount();
         window.waterGlassesLoaded = true;
    }
    const maxSecret = document.getElementById('hydro-max-secret');
    const maxGlasses = maxSecret ? parseInt(maxSecret.textContent) : 8;
    
    const updateUI = () => {
        if(hydroTitle) hydroTitle.innerText = window.waterGlasses;
        if(hydroWave) hydroWave.style.height = `calc(${(window.waterGlasses / maxGlasses) * 100}% + 20px)`;
    };
    
    // Set initial
    updateUI();

    if (hydroBtn) {
        // Replace node to avoid multiple listeners across view re-renders
        const newBtn = hydroBtn.cloneNode(true);
        hydroBtn.parentNode.replaceChild(newBtn, hydroBtn);
        
        newBtn.addEventListener('click', async () => {
            if (window.waterGlasses < maxGlasses) {
                window.waterGlasses++;
                updateUI();
                await saveHydrationCount(window.waterGlasses);
                
                // Pop animation
                newBtn.style.transform = 'scale(0.9)';
                setTimeout(() => newBtn.style.transform = 'scale(1)', 150);
            }
        });
    }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
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

    const logoutBtn = document.querySelector('.modal-btn.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutUser();
        });
    }

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

    // Handle Screen Resize
    function handleResize() {
        const isMobile = window.innerWidth <= 900;
        if (!isMobile) {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('show');
        } else {
            sidebar.classList.remove('desktop-collapsed');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); 

    initApp();
});
