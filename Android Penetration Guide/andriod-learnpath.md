# Android Pentesting Learning Roadmap & Free Resources

> A focused README listing the best free resources, teachers, and an 8–12 week learning roadmap to go from zero → lab-ready in Android pentesting.

---

## 🔗 Top resources (what to learn from + why)

* **OWASP Mobile Application Security Testing Guide (MASTG)** — Canonical, comprehensive guide covering OS internals, static/dynamic techniques, and test cases. Use as your theoretical foundation. (mas.owasp.org)
* **MobSF (Mobile Security Framework)** — Free tool for automated static + dynamic APK analysis; great for practice and finding low-hanging bugs quickly. (GitHub)
* **Frida docs** — Dynamic instrumentation toolkit for hooking and runtime analysis; learn Frida-gadget workflows. (frida.re)
* **PortSwigger / Burp (Web Security Academy + Mobile docs)** — Learn interception, replay, and mobile proxy setup; essential for API testing. (PortSwigger)
* **Hands-on labs: TryHackMe** — Mobile Analysis / Android rooms: guided, hands-on labs for acquisition, MobSF, and dynamic analysis.

---

## ▶ Recommended YouTube teachers / channels (free & practical)

* **LiveOverflow** — Reverse engineering & exploitation concepts; CTF-style Android reversing demos.
* **John Hammond** — Hands-on malware/reverse-engineering and Android walkthroughs.
* **TryHackMe community walkthroughs** — Search for “Android Analysis” rooms and walkthroughs.

---

## 🗓 Short learning roadmap (8–12 weeks)

**Week 1 — Foundations**

* Read OWASP MASTG overview chapters (architecture, permissions, Android components).

**Week 2 — Tool basics & emulator practice**

* Install Android Studio emulator + ADB + scrcpy. Practice connecting, pulling logs, and mirroring.

**Week 3 — Static analysis**

* Learn MobSF + jadx + apktool: feed an APK into MobSF, inspect decompiled code in jadx, and review AndroidManifest.

**Week 4 — Network testing**

* Learn Burp basics + device proxy setup; install Burp CA on emulator/device and intercept app traffic.

**Weeks 5–6 — Dynamic instrumentation**

* Learn Frida basics: run Frida on emulator, write simple hooks (log strings, bypass checks). Use Frida docs and tutorials.

**Week 7 — Combined labs**

* Do TryHackMe “Mobile Analysis” room(s): practice acquisition, MobSF findings, and dynamic testing.

**Weeks 8–12 — Capstone & repeat**

* Build a small benign test APK and practice: static analysis → Frida instrumentation → proxy API calls → demonstrate persistence options (boot receiver). Test on emulator, then on disposable phone. Record and report.

---

## 🔍 Exact free resources / quick-start links

* **OWASP MASTG** — mas.owasp.org
* **MobSF** — MobSF GitHub & docs
* **Frida** — frida.re
* **PortSwigger Web Security Academy** — PortSwigger
* **TryHackMe Mobile/Android rooms** — TryHackMe
* **YouTube: LiveOverflow & John Hammond** — search channels on YouTube

---

## 📚 What to watch/read first (concrete sequence)

1. OWASP MASTG — read the “Testing” overview and “Static analysis” sections.
2. MobSF quickstart — run an APK and review report fields.
3. PortSwigger mobile guide — set up Burp + device proxy and install CA.
4. Frida “getting started” — write a simple hook that logs a function call.
5. TryHackMe mobile room — complete one lab end-to-end.

---

## 🧪 Quick practice projects (get lab-ready)

* **Project A (1–2 days):** Intercept & modify an API call of a sample app using Burp on an emulator. Document the impact.
* **Project B (2–4 days):** Take an APK, run MobSF → jadx → find an exported activity or hardcoded URL → write a Frida script to dump a runtime string.
* **Project C (1 week):** Build a tiny signed “lab-control” APK that sends a heartbeat to your local server (no sensitive data). Install on emulator and show persistence after reboot (simulate BOOT_RECEIVER).

---

## ▶ How to learn from YouTube effectively (tips)

* Don’t binge — follow a playlist (e.g., LiveOverflow → John Hammond). Reproduce every step on an emulator immediately.
* Pause and practice: build a lab notebook with commands, screenshots, and notes.

---

## ✅ Short tool-priority checklist (what to master first)

* **ADB + scrcpy**
* **Burp Suite proxy + CA installation**
* **MobSF + jadx + apktool**
* **Frida / Objection basics**
* **Android emulator** & building a test APK

---

## 🎯 Final notes

This roadmap and resource list gives you a practical path from fundamentals to lab-capable skills. Follow the week-by-week plan, practice the mini-projects, and you’ll be ready to perform Android pentest tasks in supervised labs.

