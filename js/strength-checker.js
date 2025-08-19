/**
 * Password Strength Checker
 * Uses zxcvbn library to evaluate password strength
 */
class StrengthChecker {
    constructor() {
        this.passwordInput = document.getElementById('passwordInput');
        this.toggleBtn = document.getElementById('togglePassword');
        this.strengthProgress = document.getElementById('strengthProgress');
        this.strengthFeedback = document.getElementById('strengthFeedback');
        this.strengthDetails = document.getElementById('strengthDetails');
        this.strengthAnalysis = document.getElementById('strengthAnalysis');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Check strength on input
        this.passwordInput.addEventListener('input', () => this.checkStrength());
        
        // Toggle password visibility
        this.toggleBtn.addEventListener('click', () => {
            const type = this.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            this.passwordInput.setAttribute('type', type);
            this.toggleBtn.innerHTML = type === 'password' ? 
                '<i class="bi bi-eye"></i>' : 
                '<i class="bi bi-eye-slash"></i>';
        });
    }
    
    checkStrength() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.resetStrengthIndicator();
            return;
        }
        
        // Use zxcvbn to analyze password
        const result = zxcvbn(password);
        
        // Update UI with results
        this.updateStrengthIndicator(result);
        this.displayFeedback(result);
        this.showDetailedAnalysis(result);
    }
    
    resetStrengthIndicator() {
        this.strengthProgress.className = 'progress-bar';
        this.strengthProgress.style.width = '0%';
        this.strengthFeedback.classList.add('d-none');
        this.strengthDetails.classList.add('d-none');
    }
    
    updateStrengthIndicator(result) {
        // Remove existing classes and add new ones
        this.strengthProgress.className = 'progress-bar';
        this.strengthProgress.classList.add(`strength-${result.score}`);
        
        // Display strength text
        const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
        const strengthLabel = strengthLabels[result.score];
        
        // Update feedback alert
        this.strengthFeedback.textContent = `Password Strength: ${strengthLabel}`;
        this.strengthFeedback.className = 'alert';
        this.strengthFeedback.classList.add(this.getAlertClass(result.score));
        this.strengthFeedback.classList.remove('d-none');
    }
    
    getAlertClass(score) {
        const alertClasses = [
            'alert-danger',    // Very Weak
            'alert-danger',    // Weak
            'alert-warning',   // Fair
            'alert-success',   // Strong
            'alert-success'    // Very Strong
        ];
        return alertClasses[score];
    }
    
    displayFeedback(result) {
        // Show detailed section
        this.strengthDetails.classList.remove('d-none');
    }
    
    showDetailedAnalysis(result) {
        this.strengthAnalysis.innerHTML = '';
        
        // Add estimated crack time
        const crackTimeDisplay = this.formatCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
        
        const crackTimeItem = document.createElement('li');
        crackTimeItem.className = 'list-group-item';
        crackTimeItem.innerHTML = `<strong>Estimated time to crack:</strong> ${crackTimeDisplay}`;
        this.strengthAnalysis.appendChild(crackTimeItem);
        
        // Add feedback suggestions
        if (result.feedback.warning) {
            const warningItem = document.createElement('li');
            warningItem.className = 'list-group-item list-group-item-warning';
            warningItem.innerHTML = `<strong>Warning:</strong> ${result.feedback.warning}`;
            this.strengthAnalysis.appendChild(warningItem);
        }
        
        // Add suggestions
        if (result.feedback.suggestions.length > 0) {
            const suggestionsItem = document.createElement('li');
            suggestionsItem.className = 'list-group-item';
            
            let suggestionsHtml = '<strong>Suggestions:</strong><ul class="mb-0 mt-1">';
            result.feedback.suggestions.forEach(suggestion => {
                suggestionsHtml += `<li>${suggestion}</li>`;
            });
            suggestionsHtml += '</ul>';
            
            suggestionsItem.innerHTML = suggestionsHtml;
            this.strengthAnalysis.appendChild(suggestionsItem);
        }
        
        // Add password length
        const lengthItem = document.createElement('li');
        lengthItem.className = 'list-group-item';
        lengthItem.innerHTML = `<strong>Password length:</strong> ${result.password.length} characters`;
        this.strengthAnalysis.appendChild(lengthItem);
    }
    
    formatCrackTime(timeString) {
        return timeString.charAt(0).toUpperCase() + timeString.slice(1);
    }
}