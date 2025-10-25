https://claude.ai/public/artifacts/9d6f02bb-d51e-4aa8-87ff-25035cc78b01
# 🔍 Directory & Subdomain Enumeration Tools

<div align="center">

![Security](https://img.shields.io/badge/Category-Security-red.svg)
![Pentesting](https://img.shields.io/badge/Type-Pentesting-blue.svg)
![Updated](https://img.shields.io/badge/Updated-2025-green.svg)

**A comprehensive guide to tools used for directory busting and subdomain enumeration**

[Beginner Tools](#-beginner-tools) • [Intermediate Tools](#-intermediate-tools) • [Advanced Tools](#-advanced-tools) • [Enterprise Tools](#-enterprise-tools)

</div>

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Beginner Tools](#-beginner-tools)
- [Intermediate Tools](#-intermediate-tools)
- [Advanced Tools](#-advanced-tools)
- [Enterprise Tools](#-enterprise-tools)
- [Wordlists](#-wordlists)
- [Comparison Table](#-comparison-table)
- [Legal Notice](#-legal-notice)

---

## 🎯 Introduction

This repository contains detailed information about tools used for **Directory Busting** and **Subdomain Enumeration** - essential techniques in penetration testing and security assessments.

### What is Directory Busting?
Finding hidden directories, files, and endpoints on web servers by testing common paths.

### What is Subdomain Enumeration?
Discovering subdomains associated with a target domain to map the attack surface.

---

## 🟢 Beginner Tools

### 1. DNSDumpster
**Website:** https://dnsdumpster.com

**Type:** Web-based, Subdomain Enumeration

**Description:**
- No installation required - completely online
- Provides DNS information and subdomain discovery
- Visual mapping of domain structure
- Shows DNS records, MX records, TXT records
- 100% beginner-friendly with graphical interface

**Usage:**
```
1. Visit dnsdumpster.com
2. Enter target domain
3. Click "Search"
4. View results and download report
```

**Pros:**
- ✅ No technical knowledge needed
- ✅ Visual domain mapping
- ✅ Fast and free
- ✅ Historical data available

**Cons:**
- ❌ Limited to passive enumeration
- ❌ No directory busting
- ❌ Rate limited

---

### 2. Dirb
**GitHub:** https://github.com/v0re/dirb

**Type:** Command-line, Directory Enumeration

**Description:**
- Classic directory brute-forcing tool
- Pre-installed on Kali Linux
- Comes with built-in wordlists
- Simple and straightforward syntax
- Written in C for decent performance

**Installation:**
```bash
# Kali/Debian/Ubuntu
apt-get install dirb

# From source
git clone https://github.com/v0re/dirb.git
cd dirb
./configure
make
make install
```

**Usage:**
```bash
# Basic scan
dirb http://example.com

# With custom wordlist
dirb http://example.com /path/to/wordlist.txt

# Save output
dirb http://example.com -o results.txt

# Use specific extensions
dirb http://example.com -X .php,.html,.txt
```

**Pros:**
- ✅ Easy to learn
- ✅ Built-in wordlists
- ✅ Available on Kali
- ✅ Simple syntax

**Cons:**
- ❌ Slower than modern tools
- ❌ Limited features
- ❌ No subdomain support

**Speed:** ⭐⭐ (Moderate)

---

### 3. Dirbuster
**Website:** https://www.owasp.org/index.php/Category:OWASP_DirBuster_Project

**Type:** GUI Application, Directory Enumeration

**Description:**
- GUI-based directory brute-forcing tool
- Java-based application
- Part of OWASP project
- Good for users who prefer graphical interfaces
- Includes various wordlists

**Installation:**
```bash
# Download from OWASP website
# Or on Kali
apt-get install dirbuster

# Run
dirbuster
```

**Usage:**
```
1. Launch Dirbuster GUI
2. Enter target URL
3. Select wordlist
4. Configure threads
5. Click "Start"
6. View results in real-time
```

**Pros:**
- ✅ User-friendly GUI
- ✅ Real-time results
- ✅ Good for beginners
- ✅ Built-in wordlists

**Cons:**
- ❌ Slower than CLI tools
- ❌ Java dependency
- ❌ Old/unmaintained
- ❌ Resource heavy

**Speed:** ⭐⭐ (Moderate)

---

## 🟡 Intermediate Tools

### 4. Gobuster
**GitHub:** https://github.com/OJ/gobuster

**Type:** Command-line, Directory & DNS Enumeration

**Description:**
- Modern, fast directory/DNS brute-forcing tool
- Written in Go language
- Multi-threaded for high performance
- Three modes: dir, dns, vhost
- Clean and readable output
- Low memory footprint

**Installation:**
```bash
# Using Go
go install github.com/OJ/gobuster/v3@latest

# Kali/Debian
apt-get install gobuster

# Homebrew (macOS)
brew install gobuster
```

**Usage:**
```bash
# Directory enumeration
gobuster dir -u http://example.com -w /path/to/wordlist.txt

# With threads
gobuster dir -u http://example.com -w wordlist.txt -t 50

# DNS subdomain enumeration
gobuster dns -d example.com -w subdomains.txt

# Vhost enumeration
gobuster vhost -u http://example.com -w vhosts.txt

# With extensions
gobuster dir -u http://example.com -w wordlist.txt -x php,html,txt

# Save output
gobuster dir -u http://example.com -w wordlist.txt -o results.txt
```

**Pros:**
- ✅ Very fast (Go-based)
- ✅ Multi-threaded
- ✅ Multiple modes
- ✅ Clean output
- ✅ Low resource usage

**Cons:**
- ❌ Requires good wordlists
- ❌ Command-line only
- ❌ Less features than ffuf

**Speed:** ⭐⭐⭐⭐⭐ (Very Fast)

---

### 5. ffuf (Fuzz Faster U Fool)
**GitHub:** https://github.com/ffuf/ffuf

**Type:** Command-line, Web Fuzzer

**Description:**
- Extremely fast web fuzzer
- Written in Go
- Highly customizable and flexible
- Can fuzz anything (directories, parameters, headers, etc.)
- Advanced filtering by size, status, regex
- Supports recursion and rate limiting

**Installation:**
```bash
# Using Go
go install github.com/ffuf/ffuf/v2@latest

# Download binary from GitHub releases
# Or on Kali
apt-get install ffuf
```

**Usage:**
```bash
# Directory fuzzing
ffuf -u http://example.com/FUZZ -w wordlist.txt

# Subdomain fuzzing
ffuf -u http://FUZZ.example.com -w subdomains.txt

# Filter by status code
ffuf -u http://example.com/FUZZ -w wordlist.txt -fc 404

# Filter by response size
ffuf -u http://example.com/FUZZ -w wordlist.txt -fs 4242

# Multiple extensions
ffuf -u http://example.com/FUZZ -w wordlist.txt -e .php,.html,.txt

# POST data fuzzing
ffuf -u http://example.com/login -w wordlist.txt -X POST -d "username=admin&password=FUZZ"

# Header fuzzing
ffuf -u http://example.com -w wordlist.txt -H "X-Header: FUZZ"

# Recursive scan
ffuf -u http://example.com/FUZZ -w wordlist.txt -recursion

# Rate limiting
ffuf -u http://example.com/FUZZ -w wordlist.txt -rate 100
```

**Pros:**
- ✅ Extremely fast
- ✅ Highly flexible
- ✅ Advanced filtering
- ✅ Can fuzz anything
- ✅ Recursion support

**Cons:**
- ❌ Steeper learning curve
- ❌ Many options can be overwhelming

**Speed:** ⭐⭐⭐⭐⭐ (Extremely Fast)

---

### 6. Sublist3r
**GitHub:** https://github.com/aboul3la/Sublist3r

**Type:** Command-line, Subdomain Enumeration

**Description:**
- Python-based subdomain enumeration tool
- Uses multiple search engines (Google, Bing, Yahoo, Baidu)
- Aggregates results from various sources
- Fast passive reconnaissance
- No brute-forcing (only passive)

**Installation:**
```bash
# Clone repository
git clone https://github.com/aboul3la/Sublist3r.git
cd Sublist3r

# Install dependencies
pip install -r requirements.txt
```

**Usage:**
```bash
# Basic enumeration
python sublist3r.py -d example.com

# Enable bruteforce
python sublist3r.py -d example.com -b

# Save output
python sublist3r.py -d example.com -o results.txt

# Specify threads
python sublist3r.py -d example.com -t 40

# Verbose output
python sublist3r.py -d example.com -v
```

**Pros:**
- ✅ Fast passive enumeration
- ✅ Uses multiple sources
- ✅ Easy to use
- ✅ Python-based

**Cons:**
- ❌ Passive only (without -b flag)
- ❌ Depends on search engines
- ❌ Can be rate-limited

**Speed:** ⭐⭐⭐⭐ (Fast)

---

### 7. Feroxbuster
**GitHub:** https://github.com/epi052/feroxbuster

**Type:** Command-line, Directory Enumeration

**Description:**
- Modern recursive directory scanner
- Written in Rust for maximum performance
- Automatic recursion
- Beautiful progress bars and output
- Smart filtering and auto-calibration
- Can extract links from responses

**Installation:**
```bash
# Using cargo (Rust)
cargo install feroxbuster

# Download from releases
# Or on Kali
apt-get install feroxbuster
```

**Usage:**
```bash
# Basic scan
feroxbuster -u http://example.com -w wordlist.txt

# Recursive scan (automatic)
feroxbuster -u http://example.com -w wordlist.txt --depth 4

# Multiple extensions
feroxbuster -u http://example.com -w wordlist.txt -x php,html,txt

# Rate limiting
feroxbuster -u http://example.com -w wordlist.txt --rate-limit 50

# Filter by status
feroxbuster -u http://example.com -w wordlist.txt -C 404

# Save output
feroxbuster -u http://example.com -w wordlist.txt -o results.txt
```

**Pros:**
- ✅ Extremely fast (Rust)
- ✅ Automatic recursion
- ✅ Beautiful output
- ✅ Smart filtering
- ✅ Modern and maintained

**Cons:**
- ❌ Newer tool (smaller community)
- ❌ Rust installation required for building

**Speed:** ⭐⭐⭐⭐⭐ (Extremely Fast)

---

## 🟠 Advanced Tools

### 8. Amass
**GitHub:** https://github.com/OWASP/Amass

**Type:** Command-line, Reconnaissance Framework

**Description:**
- Most comprehensive subdomain enumeration tool
- Part of OWASP project
- Uses 55+ data sources
- Active and passive enumeration
- DNS resolution, brute-forcing, web scraping
- Network mapping and visualization
- API integrations (VirusTotal, SecurityTrails, etc.)

**Installation:**
```bash
# Using Go
go install -v github.com/OWASP/Amass/v3/...@master

# Snap
snap install amass

# Homebrew
brew install amass
```

**Usage:**
```bash
# Basic subdomain enum
amass enum -d example.com

# Passive only
amass enum -passive -d example.com

# Active enumeration
amass enum -active -d example.com

# With brute-force
amass enum -brute -d example.com

# Use all sources
amass enum -d example.com -src

# Output to file
amass enum -d example.com -o results.txt

# JSON output
amass enum -d example.com -json results.json

# With API keys (config file)
amass enum -config config.ini -d example.com
```

**Configuration (config.ini):**
```ini
[data_sources]
[data_sources.VirusTotal]
[data_sources.VirusTotal.Credentials]
apikey = YOUR_API_KEY

[data_sources.SecurityTrails]
[data_sources.SecurityTrails.Credentials]
apikey = YOUR_API_KEY
```

**Pros:**
- ✅ Most comprehensive
- ✅ 55+ data sources
- ✅ Active + passive
- ✅ Network mapping
- ✅ API integrations
- ✅ OWASP project

**Cons:**
- ❌ Slow on full scans
- ❌ Complex configuration
- ❌ Requires API keys for best results

**Speed:** ⭐⭐⭐ (Moderate, but comprehensive)
**Power:** ⭐⭐⭐⭐⭐ (Most Powerful)

---

### 9. Subfinder
**GitHub:** https://github.com/projectdiscovery/subfinder

**Type:** Command-line, Subdomain Discovery

**Description:**
- Fast passive subdomain discovery tool
- Written in Go by ProjectDiscovery
- Uses 40+ passive sources
- API integration support
- Clean and simple output
- Part of ProjectDiscovery suite

**Installation:**
```bash
# Using Go
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Download binary from releases
```

**Usage:**
```bash
# Basic scan
subfinder -d example.com

# Save output
subfinder -d example.com -o results.txt

# JSON output
subfinder -d example.com -oJ -o results.json

# Use all sources
subfinder -d example.com -all

# Silent mode
subfinder -d example.com -silent

# Multiple domains
subfinder -dL domains.txt -o results.txt
```

**Pros:**
- ✅ Very fast
- ✅ 40+ sources
- ✅ Simple to use
- ✅ API support
- ✅ Active development

**Cons:**
- ❌ Passive only
- ❌ Requires API keys for best results

**Speed:** ⭐⭐⭐⭐⭐ (Very Fast)

---

### 10. Wfuzz
**GitHub:** https://github.com/xmendez/wfuzz

**Type:** Command-line, Web Fuzzer

**Description:**
- Python-based web application fuzzer
- Can fuzz anything (parameters, headers, URLs)
- Advanced filtering capabilities
- Modular design with plugins
- Support for proxies and authentication

**Installation:**
```bash
# Using pip
pip install wfuzz

# From source
git clone https://github.com/xmendez/wfuzz.git
cd wfuzz
python setup.py install
```

**Usage:**
```bash
# Directory fuzzing
wfuzz -c -z file,wordlist.txt http://example.com/FUZZ

# Parameter fuzzing
wfuzz -c -z file,wordlist.txt http://example.com/page.php?id=FUZZ

# POST data fuzzing
wfuzz -c -z file,wordlist.txt -d "username=admin&password=FUZZ" http://example.com/login

# Filter by status code
wfuzz -c -z file,wordlist.txt --hc 404 http://example.com/FUZZ

# Filter by line count
wfuzz -c -z file,wordlist.txt --hl 20 http://example.com/FUZZ

# Multiple injection points
wfuzz -c -z file,users.txt -z file,pass.txt http://example.com/login?user=FUZZ&pass=FUZ2Z
```

**Pros:**
- ✅ Highly flexible
- ✅ Can fuzz anything
- ✅ Advanced filtering
- ✅ Plugin system

**Cons:**
- ❌ Complex syntax
- ❌ Python-based (slower)
- ❌ Steep learning curve

**Speed:** ⭐⭐⭐ (Moderate)

---

## 🔴 Enterprise Tools

### 11. Recon-ng
**GitHub:** https://github.com/lanmaster53/recon-ng

**Type:** Framework, Full Reconnaissance

**Description:**
- Modular reconnaissance framework
- Similar to Metasploit in design
- 90+ modules for various tasks
- Database-driven results
- API integrations
- Report generation
- Full-featured reconnaissance platform

**Installation:**
```bash
# Clone repository
git clone https://github.com/lanmaster53/recon-ng.git
cd recon-ng

# Install dependencies
pip install -r REQUIREMENTS

# Run
./recon-ng
```

**Usage:**
```bash
# Start recon-ng
recon-ng

# Install all modules
marketplace install all

# Search modules
marketplace search

# Load a module
modules load recon/domains-hosts/brute_hosts

# Set options
options set SOURCE example.com

# Run module
run

# View results
show hosts

# Generate report
modules load reporting/html
options set FILENAME report.html
run
```

**Key Modules:**
- `recon/domains-hosts/brute_hosts` - Subdomain brute-forcing
- `recon/domains-hosts/hackertarget` - Use HackerTarget API
- `recon/domains-hosts/threatcrowd` - ThreatCrowd lookups
- `reporting/html` - Generate HTML reports

**Pros:**
- ✅ Full framework
- ✅ 90+ modules
- ✅ Database integration
- ✅ Report generation
- ✅ API support

**Cons:**
- ❌ Steep learning curve
- ❌ Overkill for simple tasks
- ❌ Requires module knowledge

**Power:** ⭐⭐⭐⭐⭐ (Most Powerful)

---

### 12. Burp Suite Professional
**Website:** https://portswigger.net/burp/pro

**Type:** GUI Application, Web Security Platform

**Description:**
- Industry-standard web security testing platform
- Comprehensive suite of tools
- Content discovery scanner
- Advanced crawling engine
- Integrated proxy and repeater
- Professional commercial tool

**Features:**
- Advanced web crawler
- Content discovery
- Active/passive scanning
- Intruder (fuzzing tool)
- Extensions/plugins
- Collaboration features

**Usage:**
```
1. Launch Burp Suite
2. Configure browser proxy
3. Spider/crawl target
4. Use Content Discovery
5. Analyze results
6. Generate reports
```

**Pros:**
- ✅ Industry standard
- ✅ Comprehensive features
- ✅ Professional support
- ✅ Active development
- ✅ Large community

**Cons:**
- ❌ Expensive ($449/year)
- ❌ Heavy resource usage
- ❌ Overkill for just enumeration
- ❌ Commercial license required

**Power:** ⭐⭐⭐⭐⭐⭐ (Professional Grade)

---

### 13. Nuclei
**GitHub:** https://github.com/projectdiscovery/nuclei

**Type:** Command-line, Vulnerability Scanner

**Description:**
- Template-based vulnerability scanner
- 5000+ community templates
- Fast and customizable
- YAML-based templates
- Not just enumeration - full vulnerability scanning
- Part of ProjectDiscovery suite

**Installation:**
```bash
# Using Go
go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest

# Download templates
nuclei -update-templates
```

**Usage:**
```bash
# Scan with all templates
nuclei -u http://example.com

# Specific templates
nuclei -u http://example.com -t cves/

# Multiple targets
nuclei -list targets.txt

# Severity filter
nuclei -u http://example.com -severity critical,high

# Save output
nuclei -u http://example.com -o results.txt
```

**Pros:**
- ✅ 5000+ templates
- ✅ Very fast
- ✅ Community-driven
- ✅ Vulnerability detection
- ✅ Easy to extend

**Cons:**
- ❌ Requires template knowledge
- ❌ Focused on vulnerabilities, not just enumeration

**Speed:** ⭐⭐⭐⭐⭐ (Very Fast)

---

## 📚 Wordlists

### SecLists (Essential)
**GitHub:** https://github.com/danielmiessler/SecLists

**Description:**
The ultimate collection of wordlists for security testing. Contains lists for:
- Directory/file enumeration
- Subdomain discovery
- Usernames/passwords
- Fuzzing patterns
- Web shells
- And much more

**Installation:**
```bash
git clone https://github.com/danielmiessler/SecLists.git
```

**Popular Lists:**
- `Discovery/Web-Content/common.txt` - Common directories
- `Discovery/Web-Content/big.txt` - Large directory list
- `Discovery/DNS/subdomains-top1million-5000.txt` - Top subdomains
- `Discovery/Web-Content/raft-large-directories.txt` - RAFT directories

---

### FuzzDB
**GitHub:** https://github.com/fuzzdb-project/fuzzdb

**Description:**
Comprehensive database of attack patterns and fuzzing payloads.

---

### Assetnote Wordlists
**GitHub:** https://github.com/assetnote/commonspeak2-wordlists

**Description:**
Content discovery wordlists generated from real-world data.

---

## 📊 Comparison Table

| Tool | Type | Speed | Power | Ease of Use | Best For |
|------|------|-------|-------|-------------|----------|
| **DNSDumpster** | Subdomain | N/A | ⭐⭐ | ⭐⭐⭐⭐⭐ | Beginners |
| **Dirb** | Directory | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | Learning |
| **Dirbuster** | Directory | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | GUI Users |
| **Gobuster** | Both | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Speed |
| **ffuf** | Both | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Flexibility |
| **Sublist3r** | Subdomain | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | Quick Recon |
| **Feroxbuster** | Directory | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Recursion |
| **Amass** | Subdomain | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Comprehensive |
| **Subfinder** | Subdomain | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Fast Passive |
| **Wfuzz** | Both | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Advanced Fuzzing |
| **Recon-ng** | Both | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Full Recon |
| **Burp Suite** | Both | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Professional |
| **Nuclei** | Both | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Vuln Scanning |

---

## 💡 Recommended Tool Combinations

### For Beginners
```bash
Dirbuster + Sublist3r + DNSDumpster
```

### For Speed
```bash
ffuf + Gobuster + Subfinder
```

### For Comprehensive Testing
```bash
Amass + Recon-ng + Nuclei + Burp Suite
```

### For Bug Bounty
```bash
Subfinder + Amass + ffuf + Nuclei
```

---

## ⚠️ Legal Notice

```
⚖️ LEGAL WARNING

This information is provided for EDUCATIONAL PURPOSES ONLY.

Unauthorized access to computer systems is illegal. These tools should ONLY be used on:
✅ Systems you own
✅ Systems with explicit written permission
✅ Authorized bug bounty programs

❌ DO NOT use these tools without proper authorization
❌ Unauthorized testing can result in criminal prosecution
❌ Always respect rate limits and terms of service

The author assumes NO liability for misuse of this information.
```

---

## 📖 Additional Resources

- **OWASP Testing Guide:** https://owasp.org/www-project-web-security-testing-guide/
- **HackerOne Bug Bounty:** https://hackerone.com
- **Bugcrowd:** https://bugcrowd.com
- **PortSwigger Web Security Academy:** https://portswigger.net/web-security

---

## 🤝 Contributing

Found a tool that should be added? Open an issue or submit a pull request!

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ for the Security Community

</div>

