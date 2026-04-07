export const settingsView = `
    <header class="top-header">
        <div>
            <h1>Settings ⚙️</h1>
            <p class="subtitle">Manage your profile and app preferences.</p>
        </div>
    </header>

    <div class="dashboard-grid fade-in">
        <div class="card glasseffect" style="grid-column: span 3;">
            <div class="card-header" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; margin-bottom: 20px;">
                <h3>Preferences</h3>
            </div>
            
            <div style="display:flex; justify-content: space-between; align-items: center; padding: 15px 0;">
                <div>
                    <h4 style="font-size: 18px">Push Notifications</h4>
                    <p style="color: var(--text-muted); font-size: 14px;">Receive reminders to log meals and water.</p>
                </div>
                <label style="position: relative; display: inline-block; width: 50px; height: 28px;">
                    <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--accent-green); border-radius: 34px;">
                        <span style="position: absolute; content: ''; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transform: translateX(22px); border-radius: 50%;"></span>
                    </span>
                </label>
            </div>

            <div style="display:flex; justify-content: space-between; align-items: center; padding: 15px 0;">
                <div>
                    <h4 style="font-size: 18px">Light Theme</h4>
                    <p style="color: var(--text-muted); font-size: 14px;">Turn off dark mode (UI Placeholder).</p>
                </div>
                <label style="position: relative; display: inline-block; width: 50px; height: 28px;">
                    <input type="checkbox" style="opacity: 0; width: 0; height: 0;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); border-radius: 34px;">
                        <span style="position: absolute; content: ''; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: rgba(255,255,255,0.5); border-radius: 50%;"></span>
                    </span>
                </label>
            </div>
            
            <div class="card-header" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; margin-top: 40px; margin-bottom: 20px;">
                <h3>Account</h3>
            </div>
             <div style="display:flex; justify-content: space-between; align-items: center; padding: 15px 0;">
                <div>
                    <h4 style="font-size: 18px">My Plan</h4>
                    <p style="color: var(--text-muted); font-size: 14px;">You are currently on the Free Plan.</p>
                </div>
                <button class="primary-btn" style="height: 38px; padding: 0 16px;">Upgrade</button>
            </div>
        </div>
    </div>
`;
