class LeakChecker {
    constructor() {
        this.leakCheckInput = document.getElementById('leakCheckInput');
        this.toggleLeakPassword = document.getElementById('toggleLeakPassword');
        this.checkLeakBtn = document.getElementById('checkLeakBtn');
        this.leakResults = document.getElementById('leakResults');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Toggle password visibility
        this.toggleLeakPassword.addEventListener('click', () => {
            const type = this.leakCheckInput.getAttribute('type') === 'password' ? 'text' : 'password';
            this.leakCheckInput.setAttribute('type', type);
            this.toggleLeakPassword.innerHTML = type === 'password' ? 
                '<i class="bi bi-eye"></i>' : 
                '<i class="bi bi-eye-slash"></i>';
        });
        
        // Check for leaks
        this.checkLeakBtn.addEventListener('click', () => this.simulateLeakCheck());
    }
    
    simulateLeakCheck() {
        const password = this.leakCheckInput.value;
        
        if (!password) {
            this.showResult('Please enter a password to check.', 'warning');
            return;
        }
        
        this.checkLeakBtn.disabled = true;
        this.checkLeakBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Checking...';
        
        // Simulate processing time
        setTimeout(() => {
            let result = '';
            let type = 'warning';
            
            // Use zxcvbn to evaluate the password
            const evaluation = zxcvbn(password);
            
            // Simulate breach checking based on password strength and common patterns
            if (evaluation.score <= 1) {
                result = `<p>This password is very weak and likely appears in many data breaches.</p>
                          <p>Passwords like this are among the first to be compromised in dictionary attacks.</p>`;
                type = 'danger';
            } else if (evaluation.score === 2) {
                result = `<p>This password has moderate strength but could still appear in data breaches.</p>
                          <p>Consider using longer passwords with more diverse characters.</p>`;
                type = 'warning';
            } else if (evaluation.score >= 3) {
                result = `<p>This password has good complexity and is less likely to appear in known breaches.</p>
                          <p>However, even complex passwords can be compromised if reused across sites.</p>`;
                type = 'success';
            }
            
            // Add specific warnings for common passwords
            const commonPasswords = [
                'password', '123456', 'qwerty', 'admin', 'welcome', 
                'letmein', 'abc123', '111111', '12345678', 'password1'
            ];
            
            if (commonPasswords.includes(password.toLowerCase())) {
                result = `<p>This password is extremely common and appears in virtually all data breaches!</p>
                         <p>It is among the top 10 most commonly used passwords and should never be used.</p>`;
                type = 'danger';
            }
            
            this.showResult(result, type);
            this.checkLeakBtn.disabled = false;
            this.checkLeakBtn.innerHTML = 'Check for Leaks';
        }, 1500);
    }
    
    showResult(message, type) {
        this.leakResults.innerHTML = `<div class="alert alert-${type}">${message}</div>
                                     <div class="card mt-3">
                                         <div class="card-body">
                                             <h5 class="card-title">Password Security Tips</h5>
                                             <ul>
                                                 <li>Never reuse passwords across different sites</li>
                                                 <li>Use a password manager to generate and store unique passwords</li>
                                                 <li>Enable two-factor authentication when available</li>
                                                 <li>Regularly check for account breaches at haveibeenpwned.com</li>
                                             </ul>
                                         </div>
                                     </div>`;
        this.leakResults.classList.remove('d-none');
    }
}