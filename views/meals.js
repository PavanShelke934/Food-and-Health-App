export const mealsView = `
    <header class="top-header">
        <div>
            <h1>Meals & Recipes 🥗</h1>
            <p class="subtitle">Track your daily intake and discover new healthy options.</p>
        </div>
        <div class="header-actions">
            <button class="primary-btn"><i class="ph ph-plus"></i> Add Custom Meal</button>
        </div>
    </header>

    <div class="dashboard-grid fade-in">
        <!-- Meal Overview -->
        <div class="card glasseffect" style="grid-column: span 3;">
            <div class="card-header">
                <h3>Today's Log</h3>
            </div>
            <div class="meals-list" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; margin-top: 15px;">
                <div class="card glasseffect" style="background: rgba(255,255,255,0.02)">
                    <h4 style="color: var(--accent-blue); margin-bottom: 10px;">Breakfast</h4>
                    <div class="meal-item" style="padding:0;">
                        <div class="icon-box glasseffect"><i class="ph ph-coffee"></i></div>
                        <div class="meal-info">
                            <h4>Avocado Toast</h4>
                            <p>320 kcal</p>
                        </div>
                    </div>
                </div>
                <div class="card glasseffect" style="background: rgba(255,255,255,0.02)">
                    <h4 style="color: var(--accent-green); margin-bottom: 10px;">Lunch</h4>
                    <div class="meal-item" style="padding:0;">
                        <div class="icon-box glasseffect"><i class="ph ph-bowl-food"></i></div>
                        <div class="meal-info">
                            <h4>Grilled Chicken Salad</h4>
                            <p>450 kcal</p>
                        </div>
                    </div>
                </div>
                <div class="card glasseffect" style="background: rgba(255,255,255,0.02); border: 1px dashed var(--glass-border); justify-content: center; align-items: center; cursor:pointer;" class="add-meal-empty">
                    <h4 style="color: var(--text-muted);"><i class="ph ph-plus"></i> Log Dinner</h4>
                </div>
            </div>
        </div>
    </div>
`;
