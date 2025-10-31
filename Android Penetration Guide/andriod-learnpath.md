Top resources (what to learn from, and why)

OWASP Mobile Application Security Testing Guide (MASTG) — canonical, comprehensive guide covering OS internals, static/dynamic techniques, and test cases. Learn this as your theoretical foundation. 
mas.owasp.org
+1

MobSF (Mobile Security Framework) — the go-to free tool for automated static + dynamic APK analysis; great for practice and finding low-hanging bugs quickly. 
GitHub
+1

Frida docs — dynamic instrumentation toolkit you’ll use daily for hooking and runtime analysis; learn basic scripts and Frida-gadget workflows. 
frida.re
+1

PortSwigger / Burp (Web Security Academy + Mobile testing docs) — learn HTTP(S) interception, replay, and mobile proxy setup; essential for API testing. Burp’s mobile docs are practical and up-to-date. 
PortSwigger
+1

Hands-on labs: TryHackMe — Mobile Analysis / Android rooms — guided, hands-on rooms to practice acquisition, MobSF, and basic analysis in a safe environment. Many useful free rooms exist. 
TryHackMe
+1

Recommended YouTube teachers / channels (free, practical)

LiveOverflow — excellent explanation videos for reverse engineering and exploitation concepts; good for foundations and CTF-style Android reversing. 
YouTube

John Hammond — lots of hands-on malware/reverse-engineering and Android walkthroughs; practical, step-by-step demos. 
YouTube
+1

(Bonus) TryHackMe YouTube walkthroughs — community walkthroughs for rooms like “Android Analysis” (search TryHackMe Android Analysis). 
YouTube
+1

Short learning roadmap (what to study, in this order — ~8–12 weeks plan)

Week 1 — Foundations

Read OWASP MASTG overview chapters (architecture, permissions, Android components). (MASTG is your syllabus). 
mas.owasp.org

Week 2 — Tool basics & emulator practice

Install Android Studio emulator + ADB and scrcpy.

Practice connecting emulator, pulling logs, and mirroring.

Week 3 — Static analysis

Learn MobSF + jadx + apktool: feed an APK into MobSF, read decompiled code in jadx, inspect AndroidManifest.

Follow a MobSF quickstart and run a sample APK. 
GitHub
+1

Week 4 — Network testing

Learn Burp basics + device proxy setup, install Burp CA on emulator/device, intercept app traffic. Read PortSwigger mobile docs. 
PortSwigger

Week 5–6 — Dynamic instrumentation

Learn Frida basics: run Frida on emulator, write simple hooks (log strings, bypass checks). Use Frida docs tutorials. 
frida.re

Week 7 — Combined labs

Do TryHackMe “Mobile Analysis” room(s): practice acquisition, MobSF, and dynamic testing. 
TryHackMe

Week 8–12 — Capstone & repeat

Build a small test APK (benign) and practice: static analysis → instrument with Frida → proxy API calls → demonstrate persistence options (boot receiver). Test all on emulator, then on a disposable phone.

Record everything and make a short lab-report.

Exact free resources / links to start now (quick list)

OWASP MASTG (guide & demos). 
mas.owasp.org
+1

MobSF GitHub + docs. 
GitHub
+1

Frida official docs (how-to + examples). 
frida.re
+1

PortSwigger Web Security Academy + Mobile testing docs. 
PortSwigger
+1

TryHackMe Mobile/Android rooms (search “Mobile Analysis”, “Android Analysis”). 
TryHackMe
+1

YouTube: LiveOverflow channel and John Hammond channel for practical demos. 
YouTube
+1

What to watch/read first (concrete)

OWASP MASTG: read the “Testing” overview and “Static analysis” sections. 
mas.owasp.org

MobSF quickstart: run an APK and review report fields. 
mobsf.github.io

PortSwigger mobile guide: set up Burp + device proxy and install CA. 
PortSwigger

Frida “getting started”: write a one-line hook that logs a function call. 
frida.re

TryHackMe mobile room: complete at least one lab end-to-end. 
TryHackMe

Quick practice projects (do these to get lab-ready)

Project A (1–2 days): Intercept and modify an API call of a sample app using Burp on an emulator. Document request/response and explain impact.

Project B (2–4 days): Take an APK, run MobSF → jadx → find an exported activity or hardcoded URL → write a Frida script to dump a runtime string.

Project C (1 week): Build a tiny signed “lab-control” APK that sends a heartbeat to your local server (no sensitive data). Install on emulator and show persistence after reboot (simulate boot receiver).

How to learn from YouTube effectively (tips)

Don’t binge — follow a playlist: e.g., start with LiveOverflow’s reverse-engineering videos, then John Hammond’s Android walkthroughs. Practice the steps shown on your emulator immediately. 
YouTube
+1

Pause the video and reproduce each step. Build a “lab notebook” with commands/steps and screenshots.

Short tool-priority checklist (what to master first)

ADB + scrcpy

Burp Suite proxy + CA installation

MobSF + jadx + apktool

Frida / Objection basics

Android emulator & building a test APK

(Most load-bearing claims above are backed by OWASP / MobSF / Frida / PortSwigger docs and TryHackMe labs.) 
TryHackMe
+4
mas.owasp.org
+4
GitHub
+4
