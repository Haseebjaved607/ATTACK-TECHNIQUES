# 🎯 Practice Labs - Directory Busting & Subdomain Enumeration

A curated list of legal practice environments for learning directory busting and subdomain enumeration techniques.

---

## 🌐 Online Platforms

### TryHackMe
**Website:** https://tryhackme.com

**Specific Labs:**
- https://tryhackme.com/room/contentdiscovery
- https://tryhackme.com/room/ccpentesting
- https://tryhackme.com/room/webappsec101
- https://tryhackme.com/room/webenumerationv2
- https://tryhackme.com/room/picklerick
- https://tryhackme.com/room/basicpentestingjt

**Cost:** Free tier + Premium ($10/month)

---

### PortSwigger Web Security Academy
**Website:** https://portswigger.net/web-security

**All Labs:** https://portswigger.net/web-security/all-labs

**Relevant Topics:**
- Directory Traversal (13 labs)
- Information Disclosure
- Access Control
- Authentication

**Cost:** 100% Free

---

### Hack The Box
**Website:** https://hackthebox.com

**Machine List:** https://app.hackthebox.com/machines

**Recommended Machines for Directory Enum:**
- https://app.hackthebox.com/machines/Lame
- https://app.hackthebox.com/machines/Beep
- https://app.hackthebox.com/machines/Shocker

**Cost:** Free tier + VIP ($14/month)

---

### HackThisSite
**Website:** https://hackthissite.org

**Cost:** Free

---

### OverTheWire
**Website:** https://overthewire.org

**Cost:** Free

---

### Google Gruyere
**Website:** https://google-gruyere.appspot.com

**Cost:** Free

---

### PicoCTF
**Website:** https://picoctf.org

**Cost:** Free

---

### Game of Hacks
**Website:** http://www.gameofhacks.com

**Cost:** Free

---

## 🧪 Live Vulnerable Test Sites

**Acunetix Test Sites (Immediate Practice):**
```
http://testphp.vulnweb.com
http://testhtml5.vulnweb.com
http://testasp.vulnweb.com
http://testaspnet.vulnweb.com
```

**Cost:** Free, No Registration

---

## 💻 Downloadable Vulnerable Applications

### DVWA (Damn Vulnerable Web Application)
**GitHub:** https://github.com/digininja/DVWA

**Installation:** Requires XAMPP/LAMP

---

### bWAPP (Buggy Web Application)
**Website:** http://www.itsecgames.com

**Installation:** Requires XAMPP/LAMP

---

### Mutillidae II
**GitHub:** https://github.com/webpwnized/mutillidae

**Installation:** Includes XAMPP

---

### WebGoat
**Website:** https://owasp.org/www-project-webgoat/

**Installation:** Java-based

---

### OWASP Juice Shop
**Website:** https://owasp.org/www-project-juice-shop/

**Installation:** Node.js based

---

## 🖥️ Virtual Machines

### Metasploitable 2/3
**Download:** https://sourceforge.net/projects/metasploitable/

**Type:** Pre-configured vulnerable VM

---

### VulnHub
**Website:** https://vulnhub.com

**Description:** 600+ downloadable vulnerable VMs

---

## 📍 How to Find Specific Labs

### TryHackMe
1. Go to https://tryhackme.com
2. Use search bar
3. Search terms: "Content Discovery", "Web Enumeration", "Directory"

### PortSwigger
1. Go to https://portswigger.net/web-security/all-labs
2. Filter by topic: "Directory traversal", "Information disclosure"
3. Click "Access the lab" on any lab

### Hack The Box
1. Go to https://app.hackthebox.com/machines
2. Filter: Difficulty = Easy, Tag = Web
3. Recommended: Lame, Beep, Shocker, Nibbles

### VulnHub
1. Go to https://vulnhub.com
2. Search: "DVWA", "bWAPP", "Kioptrix", "Mr-Robot"
3. Download and import to VirtualBox/VMware

---

## 🚀 Quick Start Examples

### Directory Busting Practice
```bash
# Using Gobuster on Acunetix test site
gobuster dir -u http://testphp.vulnweb.com -w /path/to/wordlist.txt

# Using ffuf
ffuf -u http://testphp.vulnweb.com/FUZZ -w wordlist.txt

# Using dirb
dirb http://testphp.vulnweb.com
```

### Subdomain Enumeration Practice
```bash
# Using subfinder (requires target domain)
subfinder -d example.com

# Using amass
amass enum -d example.com

# Using sublist3r
sublist3r -d example.com
```

---

## 💡 Recommended Learning Path

### Beginner
1. Google Gruyere - https://google-gruyere.appspot.com
2. TryHackMe Content Discovery - https://tryhackme.com/room/contentdiscovery
3. DVWA (Low Security) - https://github.com/digininja/DVWA

### Intermediate
1. PortSwigger Labs - https://portswigger.net/web-security/all-labs
2. OWASP Juice Shop - https://owasp.org/www-project-juice-shop/
3. HackThisSite - https://hackthissite.org

### Advanced
1. Hack The Box - https://hackthebox.com
2. VulnHub VMs - https://vulnhub.com
3. OverTheWire - https://overthewire.org

---

## 📊 Platform Comparison

| Platform | Cost | Setup Required | Difficulty | Best For |
|----------|------|----------------|------------|----------|
| Acunetix Test Sites | Free | No | All Levels | Immediate Practice |
| PortSwigger | Free | No | All Levels | Professional Labs |
| TryHackMe | Freemium | No | Beginner-Int | Guided Learning |
| Hack The Box | Freemium | No | Int-Advanced | Real-world Scenarios |
| DVWA | Free | Yes | Beginner | Local Testing |
| VulnHub | Free | Yes | All Levels | Offline Practice |

---

## ⚠️ Legal Notice

**All platforms and sites listed here are intentionally vulnerable and designed for security practice.**

- ✅ Legal to attack
- ✅ Designed for learning
- ✅ Safe environments
- ❌ Never test on live sites without permission

**Remember:** Unauthorized access to computer systems is illegal. Only practice on designated platforms.

---

## 🛠️ Required Tools

Before starting, install these tools:

```bash
# Directory Busting
- Gobuster
- ffuf
- Dirb
- Feroxbuster

# Subdomain Enumeration
- Subfinder
- Amass
- Sublist3r
- Assetfinder

# Wordlists
- SecLists: https://github.com/danielmiessler/SecLists
```

---

## 📚 Additional Resources

- **OWASP Testing Guide:** https://owasp.org/www-project-web-security-testing-guide/
- **SecLists Wordlists:** https://github.com/danielmiessler/SecLists
- **Bug Bounty Platforms:** https://hackerone.com | https://bugcrowd.com

---

## 🤝 Contributing

Found a new practice platform? Submit a pull request or open an issue!

---

<div align="center">

**⭐ Star this repo if helpful!**

**Practice legally. Learn responsibly.**

</div>
