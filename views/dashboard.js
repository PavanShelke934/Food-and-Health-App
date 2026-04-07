export const dashboardView = `
    <header class="top-header">
        <div>
            <h1>Welcome back, Pavan! 👋</h1>
            <p class="subtitle">Here's your health & nutrition summary for today.</p>
        </div>
        <div class="header-actions">
            <button class="icon-btn glasseffect"><i class="ph ph-bell"></i></button>
            <button class="primary-btn"><i class="ph ph-plus"></i> Add Meal</button>
        </div>
    </header>

    <div class="dashboard-grid fade-in">
        <!-- Macros & Calories summary -->
        <div class="card glasseffect macros-card">
            <h3>Daily Nutrition Goals</h3>
            <div class="macros-container">
                <!-- Circular progress for calories -->
                <div class="calorie-circle">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" class="bg-circle"></circle>
                        <circle cx="50" cy="50" r="45" class="progress-circle calories-progress"></circle>
                    </svg>
                    <div class="circle-content">
                        <h2>1,850</h2>
                        <p>kcal left</p>
                    </div>
                </div>

                <div class="macros-list">
                    <div class="macro-item">
                        <div class="macro-header">
                            <span class="macro-label"><span class="dot carbs-dot"></span> Carbs</span>
                            <span class="macro-value">120g / 250g</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill carbs-fill" data-width="48%"></div></div>
                    </div>
                    <div class="macro-item">
                        <div class="macro-header">
                            <span class="macro-label"><span class="dot protein-dot"></span> Protein</span>
                            <span class="macro-value">95g / 140g</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill protein-fill" data-width="68%"></div></div>
                    </div>
                    <div class="macro-item">
                        <div class="macro-header">
                            <span class="macro-label"><span class="dot fat-dot"></span> Fat</span>
                            <span class="macro-value">45g / 65g</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill fat-fill" data-width="70%"></div></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity graph placeholder -->
        <div class="card glasseffect activity-card">
            <div class="card-header">
                <h3>Activity & Steps</h3>
                <div class="badge">Week</div>
            </div>
            <div class="chart-container">
                <div class="stat-highlight">
                    <h2><span id="stepsCount">8,452</span> <span class="unit">steps</span></h2>
                    <span id="trendBadge" class="trend-badge up"><i class="ph ph-trend-up"></i> +12%</span>
                </div>
                <div class="bar-chart">
                    <!-- Data width used for animation -->
                    <div class="bar-col"><div class="bar glasseffect" data-height="40%" data-steps="4,800"></div><span>M</span></div>
                    <div class="bar-col"><div class="bar glasseffect" data-height="65%" data-steps="6,500"></div><span>T</span></div>
                    <div class="bar-col"><div class="bar glasseffect" data-height="50%" data-steps="5,200"></div><span>W</span></div>
                    <div class="bar-col"><div class="bar glasseffect" data-height="85%" data-steps="8,800"></div><span>T</span></div>
                    <div class="bar-col"><div class="bar glasseffect active" data-height="70%" data-steps="8,452"></div><span>F</span></div>
                    <div class="bar-col"><div class="bar glasseffect" data-height="30%" data-steps="3,100"></div><span>S</span></div>
                    <div class="bar-col"><div class="bar glasseffect" data-height="45%" data-steps="4,500"></div><span>S</span></div>
                </div>
            </div>
        </div>

        <!-- Recent Meals -->
        <div class="card glasseffect meals-card">
            <div class="card-header">
                <h3>Recent Meals</h3>
                <a href="#meals" class="view-all">View All</a>
            </div>
            <div class="meals-list">
                <div class="meal-item">
                    <div class="icon-box glasseffect"><i class="ph ph-coffee"></i></div>
                    <div class="meal-info">
                        <h4>Avocado Toast</h4>
                        <p>Breakfast • 8:30 AM</p>
                    </div>
                    <div class="meal-cals">320 kcal</div>
                </div>
                <div class="meal-item">
                    <div class="icon-box glasseffect"><i class="ph ph-bowl-food"></i></div>
                    <div class="meal-info">
                        <h4>Grilled Chicken Salad</h4>
                        <p>Lunch • 1:15 PM</p>
                    </div>
                    <div class="meal-cals">450 kcal</div>
                </div>
                <div class="meal-item">
                    <div class="icon-box glasseffect"><i class="ph ph-apple-logo"></i></div>
                    <div class="meal-info">
                        <h4>Greek Yogurt & Berries</h4>
                        <p>Snack • 4:00 PM</p>
                    </div>
                    <div class="meal-cals">180 kcal</div>
                </div>
            </div>
        </div>

        <!-- Hydration Widget -->
        <div class="card glasseffect hydration-card">
            <div class="hydro-info">
                <h3>Hydration</h3>
                <h2><span id="water-count">4</span> / 8 <span class="unit">glasses</span></h2>
                <p class="subtitle">1.2L total today</p>
            </div>
            <button class="add-water-btn"><i class="ph ph-plus"></i></button>
            <div class="hydro-wave" id="water-wave"></div>
        </div>
    </div>
`;
