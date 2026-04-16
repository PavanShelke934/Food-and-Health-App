export const onboardingView = `
    <div class="onboarding-container fade-in" style="max-width: 600px; margin: 3rem auto; text-align: center; padding: 0 1rem;">
        <h2 style="margin-bottom: 0.5rem;">Welcome to NutriSync!</h2>
        <p class="subtitle" style="margin-bottom: 2rem;">Let's set up your profile to personalize your experience.</p>
        
        <form id="onboarding-form" class="card glasseffect" style="text-align: left; padding: 2.5rem; transition: all 0.3s ease;">
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="e.g. Jane Doe" required style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: var(--text-main); margin-top: 0.5rem; font-family: inherit;">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="number" id="age" placeholder="25" required min="13" max="120" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: var(--text-main); margin-top: 0.5rem; font-family: inherit;">
                </div>
                <div class="form-group">
                    <label for="weight">Weight (kg)</label>
                    <input type="number" id="weight" placeholder="70" required min="20" max="300" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: var(--text-main); margin-top: 0.5rem; font-family: inherit;">
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="height">Height (cm)</label>
                <input type="number" id="height" placeholder="175" required min="50" max="300" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: var(--text-main); margin-top: 0.5rem; font-family: inherit;">
            </div>

            <div class="form-group" style="margin-bottom: 2.5rem;">
                <label for="goal">Primary Goal</label>
                <select id="goal" required style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(20,20,30,0.8); color: var(--text-main); margin-top: 0.5rem; font-family: inherit;">
                    <option value="weight_loss">Weight Loss</option>
                    <option value="maintenance" selected>Maintenance</option>
                    <option value="muscle_gain">Muscle Gain</option>
                </select>
            </div>

            <button type="submit" id="onboarding-submit-btn" style="width: 100%; padding: 1rem; font-size: 1.1rem; border-radius: 8px; border: none; background: var(--accent-main, #b0ff4c); color: #0a0b10; cursor: pointer; font-weight: 600; font-family: inherit; transition: opacity 0.2s;">
                Complete Setup
            </button>
        </form>
    </div>
`;
