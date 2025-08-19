/**
 * Main application file
 * Initializes all components when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    const strengthChecker = new StrengthChecker();
    const passwordGenerator = new PasswordGenerator();
    const leakChecker = new LeakChecker();
    
    // Handle tab changes to update password analysis if needed
    const passwordTabs = document.getElementById('passwordTabs');
    const tabEls = passwordTabs.querySelectorAll('button[data-bs-toggle="tab"]');
    
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', event => {
            // If switching to strength checker tab and there's a generated password,
            // copy it to the strength checker input for immediate analysis
            if (event.target.id === 'strength-tab') {
                const generatedPwd = document.getElementById('generatedPassword').value;
                if (generatedPwd && !document.getElementById('passwordInput').value) {
                    document.getElementById('passwordInput').value = generatedPwd;
                    strengthChecker.checkStrength();
                }
            }
        });
    });
});