https://claude.ai/public/artifacts/9d6f02bb-d51e-4aa8-87ff-25035cc78b01
# 🔍 Web Enumeration Tool

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![Status](https://img.shields.io/badge/status-active-success.svg)

**A modern, interactive web-based tool for directory and subdomain enumeration**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tools Guide](#-enumeration-tools-guide) • [Legal](#-legal-disclaimer)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [Enumeration Tools Guide](#-enumeration-tools-guide)
- [Wordlists](#-wordlists)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [Legal Disclaimer](#-legal-disclaimer)
- [License](#-license)

---

## 🎯 About

**Web Enumeration Tool** is an educational, interactive web application designed to demonstrate directory busting and subdomain enumeration techniques used in cybersecurity. Built with React and modern web technologies, it provides a user-friendly interface for learning about web reconnaissance methodologies.

### What is Web Enumeration?

- **Directory Enumeration**: Discovering hidden directories, files, and endpoints on web servers
- **Subdomain Enumeration**: Finding subdomains associated with a target domain

These techniques are crucial in:
- Penetration Testing
- Bug Bounty Hunting
- Security Auditing
- Infrastructure Assessment

---

## ✨ Features

### 🎨 Dual Scanning Modes
- **Directory Enumeration** - Discover hidden paths and files
- **Subdomain Enumeration** - Find subdomains and related domains

### ⚡ Core Capabilities
- ✅ Built-in common wordlists for both modes
- ✅ Custom wordlist support (one entry per line)
- ✅ Real-time progress tracking
- ✅ Color-coded results by HTTP status
- ✅ Statistics dashboard (total, found, not found)
- ✅ Export results to CSV format
- ✅ Stop/Resume functionality
- ✅ Responsive modern UI

### 🎨 Status Code Visualization
- 🟢 **200** - Found (Success)
- 🟡 **403** - Forbidden (Access Denied)
- 🔵 **301/302** - Redirect
- 🔴 **404** - Not Found

### 📊 Analytics
- Real-time scanning statistics
- Response size tracking
- Timestamp logging
- Result filtering

---

## 🎥 Demo

![Web Enumeration Tool Demo](demo.gif)

### Live Demo
🔗 [Try it here](#) *(Add your deployment link)*

### Screenshots

<details>
<summary>Click to view screenshots</summary>

**Directory Enumeration Mode**
![Directory Mode](screenshots/directory-mode.png)

**Subdomain Enumeration Mode**
![Subdomain Mode](screenshots/subdomain-mode.png)

**Results View**
![Results](screenshots/results.png)

</details>

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/web-enumeration-tool.git

# Navigate to project directory
cd web-enumeration-tool

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Serve the build
npx serve -s build
```

### Docker Installation

```bash
# Build Docker image
docker build -t web-enum-tool .

# Run container
docker run -p 3000:3000 web-enum-tool
```

---

## 📖 Usage

### Basic Usage

#### 1. Directory Enumeration

```
1. Select "Directory Enumeration" mode
2. Enter target URL: https://example.com
3. (Optional) Add custom wordlist or use defaults
4. Click "Start Scan"
5. Monitor results in real-time
6. Export results to CSV when complete
```

**Default Directory Wordlist Includes:**
```
admin, login, dashboard, api, uploads, images, css, js, 
backup, config, database, test, dev, staging, wp-admin, 
wp-content, .git, .env, robots.txt, sitemap.xml
```

#### 2. Subdomain Enumeration

```
1. Select "Subdomain Enumeration" mode
2. Enter target domain: example.com
3. (Optional) Add custom wordlist or use defaults
4. Click "Start Scan"
5. Review discovered subdomains
6. Export for further analysis
```

**Default Subdomain Wordlist Includes:**
```
www, mail, ftp, admin, blog, dev, staging, test, api, 
portal, shop, store, forum, support, help, docs, cdn, 
static, assets, media
```

### Custom Wordlists

Create a custom wordlist file with one entry per line:

```text
admin
administrator
login
dashboard
panel
test
dev
staging
```

Then paste it into the custom wordlist field in the tool.

### Exporting Results

1. Complete a scan
2. Click "Export" button
3. Results saved as CSV with format:
```csv
Status,URL,Size
200,https://example.com/admin,15234
403,https://example.com/config,8456
```

---

## 🛠 Enumeration Tools Guide

While this is an educational tool, here are professional tools for real-world enumeration:

### Beginner Tools
- **DNSDumpster** - Web-based subdomain discovery
- **Dirb** - Simple directory scanner
- **Sublist3r** - Passive subdomain enumeration

### Intermediate Tools
- **Gobuster** - Fast directory/DNS bruteforcing
- **ffuf** - Web fuzzer with advanced features
- **Subfinder** - Fast passive subdomain discovery

### Advanced Tools
- **Amass** - Comprehensive reconnaissance framework
- **Recon-ng** - Modular reconnaissance framework
- **Burp Suite** - Professional web security testing

### Comparison

| Tool | Speed | Features | Complexity | Best For |
|------|-------|----------|------------|----------|
| This Tool | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ | Education |
| Gobuster | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Speed |
| ffuf | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Flexibility |
| Amass | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Comprehensive |

---

## 📚 Wordlists

### Recommended Wordlist Resources

1. **SecLists** (Essential)
```bash
git clone https://github.com/danielmiessler/SecLists.git
```

2. **FuzzDB**
```bash
git clone https://github.com/fuzzdb-project/fuzzdb.git
```

3. **PayloadsAllTheThings**
```bash
git clone https://github.com/swisskyrepo/PayloadsAllTheThings.git
```

### Popular Wordlists

- `common.txt` - General purpose
- `big.txt` - Comprehensive directory list
- `subdomains-top1million-5000.txt` - Top subdomains
- `raft-large-directories.txt` - Large directory list

---

## 🎓 Best Practices

### Security Testing Guidelines

1. **Always Get Permission**
   - Only scan systems you own
   - Obtain written authorization for client systems
   - Review terms of service for bug bounty programs

2. **Respect Rate Limits**
   - Don't overwhelm target servers
   - Use delays between requests
   - Consider using proxies for distributed scanning

3. **Be Stealthy**
   - Use realistic user agents
   - Randomize request timing
   - Monitor for detection/blocking

4. **Document Everything**
   - Keep logs of scans
   - Note findings systematically
   - Export results for reporting

### Technical Tips

- **Combine Multiple Tools** - Different tools find different things
- **Use Quality Wordlists** - SecLists is your friend
- **Verify Results** - False positives happen
- **Recursive Scanning** - Found directories may have subdirectories
- **Check robots.txt First** - Quick wins often found here

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the project

### Development Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/yourusername/web-enumeration-tool.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Commit your changes
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

### Code Style

- Follow React best practices
- Use meaningful variable names
- Comment complex logic
- Write clean, readable code
- Test your changes

---

## ⚠️ Legal Disclaimer

### Important Notice

**This tool is for EDUCATIONAL PURPOSES ONLY.**

```
⚖️ LEGAL WARNING

Unauthorized access to computer systems is illegal in most jurisdictions.
This tool should ONLY be used on:

✅ Systems you own
✅ Systems you have explicit written permission to test
✅ Authorized bug bounty programs

❌ DO NOT use this tool on systems without permission
❌ The developers assume NO liability for misuse
❌ Users are responsible for compliance with all applicable laws

Potential Legal Consequences:
- Criminal prosecution under CFAA (US) or equivalent laws
- Civil lawsuits
- Fines and imprisonment
- Permanent criminal record
```

### Ethical Use

This tool is designed to:
- ✅ Teach security concepts
- ✅ Help security professionals learn
- ✅ Assist in authorized testing
- ✅ Support legitimate research

### Responsible Disclosure

If you discover vulnerabilities using this tool:
1. Report to the organization immediately
2. Do not exploit or share publicly
3. Give reasonable time for remediation
4. Follow responsible disclosure guidelines

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full MIT License text...]
```

---

## 🙏 Acknowledgments

- **SecLists** - Daniel Miessler for comprehensive wordlists
- **OWASP** - For security testing resources
- **React Community** - For excellent framework
- **Bug Bounty Platforms** - HackerOne, Bugcrowd, etc.
- **Security Researchers** - For advancing the field

---

## 📞 Contact & Support

### Get Help

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 💬 Discord: [Join our server](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/web-enumeration-tool/issues)

### Stay Updated

- ⭐ Star this repository
- 👁️ Watch for updates
- 🍴 Fork for your own projects

---

## 📈 Roadmap

### Planned Features

- [ ] Advanced filtering options
- [ ] Multiple export formats (JSON, XML)
- [ ] Integration with professional tools
- [ ] API endpoint fuzzing
- [ ] Custom header support
- [ ] Proxy configuration
- [ ] Rate limiting controls
- [ ] Report generation
- [ ] Dark/Light theme toggle
- [ ] Multi-target scanning

### Version History

**v1.0.0** (Current)
- Initial release
- Directory enumeration
- Subdomain enumeration
- CSV export
- Real-time statistics

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/web-enumeration-tool&type=Date)](https://star-history.com/#yourusername/web-enumeration-tool&Date)

---

<div align="center">

**Made with ❤️ for the Security Community**

If you found this tool helpful, please consider:
- ⭐ Starring the repository
- 🐦 Sharing with others
- 💰 [Buying me a coffee](https://buymeacoffee.com/yourhandle)

---

© 2025 Web Enumeration Tool. All Rights Reserved.

</div>
