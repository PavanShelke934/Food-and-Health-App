export const hydrationView = `
    <header class="top-header">
        <div>
            <h1>Hydration 💧</h1>
            <p class="subtitle">Track your water intake. Stay refreshed!</p>
        </div>
    </header>

    <div class="dashboard-grid fade-in">
        <div class="card glasseffect hydration-card" style="grid-column: span 3; min-height: 400px;">
            <div class="hydro-info" style="align-items: center; justify-content: center; height: 100%; transform: translateY(-30px);">
                <h3 style="font-size: 24px;">Daily Goal</h3>
                <h2 style="font-size: 64px"><span id="water-count-large">4</span> / 8</h2>
                <p class="subtitle" style="font-size: 18px;">Glasses (approx 2 Liters)</p>
                <div style="display:flex; gap: 20px; margin-top: 30px;">
                    <button class="add-water-btn" id="hydro-minus" style="position:relative; top:0; right:0; width:60px; height:60px;"><i class="ph ph-minus"></i></button>
                    <button class="add-water-btn" style="position:relative; top:0; right:0; width:60px; height:60px; background: var(--accent-blue); color: #000"><i class="ph ph-plus"></i></button>
                </div>
            </div>
            <div class="hydro-wave" id="water-wave-large" style="height: 50%;"></div>
        </div>
    </div>
`;
