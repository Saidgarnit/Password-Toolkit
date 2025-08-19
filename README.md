# 🔒 Password Toolkit

A comprehensive web-based tool for password security that includes:

- 📊 **Password Strength Evaluator**: Check how strong your passwords are
- 🔑 **Secure Password Generator**: Create strong, customized passwords
- 🔍 **Password Leak Checker**: Verify if your password has been exposed in data breaches

## Features

### Password Strength Evaluator
- Uses the zxcvbn library for advanced password analysis
- Provides detailed feedback on password weaknesses
- Shows estimated time to crack based on modern computing power

### Password Generator
- Generates cryptographically strong random passwords
- Customizable length and character sets
- Copy to clipboard functionality
- Ensures diversity of character types

### Password Leak Checker
- Checks passwords against the Have I Been Pwned database
- Implements k-anonymity for secure checking (only sends partial hash)
- No passwords are stored or transmitted in plain text

## Security

- **100% Client-Side**: All processing happens in your browser
- **No Server**: No data is sent to any server except for the anonymized leak check
- **No Storage**: No passwords are stored anywhere
- **Open Source**: All code is available for review

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5 for responsive design
- zxcvbn for password strength analysis
- Web Crypto API for secure hashing
- Have I Been Pwned API (with k-anonymity) for breach checking

## How to Use

1. Visit the [Password Toolkit](https://saidgarnit.github.io/password-toolkit/) page
2. Choose the tab for the function you need
3. Follow the on-screen instructions

## Local Development

1. Clone this repository
```
git clone https://github.com/Saidgarnit/password-toolkit.git
```

2. Open the project folder
```
cd password-toolkit
```

3. Open `index.html` in your browser or use a local server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [zxcvbn](https://github.com/dropbox/zxcvbn) by Dropbox for password strength estimation
- [Have I Been Pwned](https://haveibeenpwned.com/) by Troy Hunt for the password breach API
- [Bootstrap](https://getbootstrap.com/) for the responsive UI framework