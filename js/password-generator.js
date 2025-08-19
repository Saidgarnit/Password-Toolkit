/**
 * Password Generator
 * Generates secure random passwords with customizable options
 */
class PasswordGenerator {
    constructor() {
        this.generatedPassword = document.getElementById('generatedPassword');
        this.passwordLength = document.getElementById('passwordLength');
        this.lengthValue = document.getElementById('lengthValue');
        this.useUppercase = document.getElementById('useUppercase');
        this.useLowercase = document.getElementById('useLowercase');
        this.useNumbers = document.getElementById('useNumbers');
        this.useSymbols = document.getElementById('useSymbols');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyPassword = document.getElementById('copyPassword');
        
        this.initEventListeners();
        this.generatePassword(); // Generate initial password
    }
    
    initEventListeners() {
        // Update length display when slider moves
        this.passwordLength.addEventListener('input', () => {
            this.lengthValue.textContent = this.passwordLength.value;
        });
        
        // Generate password when button clicked
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        
        // Generate new password when options change
        this.useUppercase.addEventListener('change', () => this.validateOptionsAndGenerate());
        this.useLowercase.addEventListener('change', () => this.validateOptionsAndGenerate());
        this.useNumbers.addEventListener('change', () => this.validateOptionsAndGenerate());
        this.useSymbols.addEventListener('change', () => this.validateOptionsAndGenerate());
        
        // Copy password to clipboard
        this.copyPassword.addEventListener('click', () => this.copyToClipboard());
    }
    
    validateOptionsAndGenerate() {
        // Ensure at least one character set is selected
        if (!this.useUppercase.checked && 
            !this.useLowercase.checked && 
            !this.useNumbers.checked && 
            !this.useSymbols.checked) {
            // If none selected, force lowercase to be checked
            this.useLowercase.checked = true;
        }
        
        this.generatePassword();
    }
    
    generatePassword() {
        const length = parseInt(this.passwordLength.value);
        
        // Define character sets
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Build character pool based on selected options
        let charPool = '';
        if (this.useUppercase.checked) charPool += uppercase;
        if (this.useLowercase.checked) charPool += lowercase;
        if (this.useNumbers.checked) charPool += numbers;
        if (this.useSymbols.checked) charPool += symbols;
        
        // Generate password
        let password = '';
        
        // Ensure at least one character from each selected set
        if (this.useUppercase.checked) 
            password += this.getRandomChar(uppercase);
        if (this.useLowercase.checked) 
            password += this.getRandomChar(lowercase);
        if (this.useNumbers.checked) 
            password += this.getRandomChar(numbers);
        if (this.useSymbols.checked) 
            password += this.getRandomChar(symbols);
        
        // Fill remaining length with random characters from the pool
        for (let i = password.length; i < length; i++) {
            password += this.getRandomChar(charPool);
        }
        
        // Shuffle the password to avoid predictable patterns
        password = this.shuffleString(password);
        
        // Display the generated password
        this.generatedPassword.value = password;

            // Add this at the end of the method:
    this.generatedPassword.classList.add('highlight-animation');
    setTimeout(() => {
        this.generatedPassword.classList.remove('highlight-animation');
    }, 1500);
    }
    
    getRandomChar(characters) {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    shuffleString(string) {
        const array = string.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }
    
    copyToClipboard() {
        this.generatedPassword.select();
        document.execCommand('copy');
        
        // Show feedback
        const alert = document.createElement('div');
        alert.className = 'alert alert-success copy-alert';
        alert.textContent = 'Password copied to clipboard!';
        document.body.appendChild(alert);
        
        // Remove the alert after animation completes
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 2000);
    }
}