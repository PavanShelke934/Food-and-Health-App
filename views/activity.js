export const activityView = `
    <header class="top-header">
        <div>
            <h1>Activity Tracker 🏃‍♂️</h1>
            <p class="subtitle">Monitor your steps, workouts, and calories burned.</p>
        </div>
    </header>

    <div class="dashboard-grid fade-in">
        <div class="card glasseffect" style="grid-column: span 2;">
            <div class="card-header">
                <h3>Weekly Steps</h3>
            </div>
            <div class="stat-highlight" style="margin-top: 20px;">
                <h2><span id="stepsCount">8,452</span> <span class="unit">steps</span></h2>
                <span id="trendBadge" class="trend-badge up"><i class="ph ph-trend-up"></i> +12%</span>
            </div>
            <div style="height: 250px; display: flex; align-items: flex-end; gap: 20px; margin-top: 5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">
                <!-- Larger chart purely for Aesthetics -->
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="40%" data-steps="4,800"></div><span>Mon</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="65%" data-steps="6,500"></div><span>Tue</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="50%" data-steps="5,200"></div><span>Wed</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="85%" data-steps="8,800"></div><span>Thu</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect active" style="width: 100%;" data-height="70%" data-steps="8,452"></div><span>Fri</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="30%" data-steps="3,100"></div><span>Sat</span></div>
                <div class="bar-col" style="flex:1"><div class="bar glasseffect" style="width: 100%;" data-height="45%" data-steps="4,500"></div><span>Sun</span></div>
            </div>
        </div>

        <div class="card glasseffect" style="grid-column: span 1;">
            <div class="card-header">
                <h3>Highlights</h3>
            </div>
            <div style="display:flex; flex-direction:column; gap:20px; margin-top: 20px;">
                <div style="background: rgba(176,255,76,0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(176,255,76,0.3)">
                    <h4 style="color: var(--accent-green)">Active Minutes</h4>
                    <h2 style="font-size: 32px">45 <span style="font-size:16px; color:var(--text-muted)">mins</span></h2>
                </div>
                <div style="background: rgba(163,116,255,0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(163,116,255,0.3)">
                    <h4 style="color: var(--accent-purple)">Calories Burned</h4>
                    <h2 style="font-size: 32px">320 <span style="font-size:16px; color:var(--text-muted)">kcal</span></h2>
                </div>
            </div>
        </div>
    </div>
`;
