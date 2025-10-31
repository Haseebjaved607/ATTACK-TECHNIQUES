README — Practical: What to put on the phone (one-time physical touch)

Target: Android 11 / 12 (Tecno, Infinix, Oppo, Pixel, etc.)
Goal: After one physical touch, enable remote/live access & analysis capabilities to run a full pentest from your lab host. Provide fallback options for time-limited or restricted environments.

High-level plan (one sentence)

During your one touch: (1) document & image, (2) isolate network, (3) enable/verify Developer Options if allowed, then (4) install a small set of benign, signed apps/files + trust a lab CA so you can remotely mirror the screen, intercept traffic, instrument apps, and — if required — maintain a controlled remote channel; finally document and cleanup.

What to install ON THE PHONE (priority order)

Each item lists: purpose — where to get it / how to set it (UI-level) — what it enables — notes (detection, persistence, when to choose)

1) Trusted lab CA certificate (Burp / mitmproxy)

Purpose: let you intercept app HTTPS traffic with Burp/mitmproxy without certificate warnings.

How (UI-level): Install the lab CA certificate on the device (Settings → Security → Install from storage). If Android prompts for credential storage or lockscreen, follow lab rules.

Enables: full HTTP(S) interception of many apps (except apps using certificate pinning or Android 7+ block for user CAs).

Notes: Modern apps may ignore user CAs; you’ll use Frida or a modified APK where pinning exists. Installing the CA may require a screen lock to be present.

2) A small benign test APK you control (recommended)

Purpose: controlled reverse channel + persistence demonstration.

How: a signed APK you bring on USB (or transfer from your host) that requests minimal required permissions (INTERNET, optionally RECEIVE_BOOT_COMPLETED, and only others you need). Install via UI (tap to install) or via ADB if debugging enabled.

Enables: a safe, auditable network callback so you can reconnect the device remotely and demonstrate persistence (app only communicates with your lab server).

Notes: Do not include exfiltration code. Make it transparent: open a status page showing “lab-control installed”. If Play Protect flags it, show the block as evidence and request whitelist from pro (or use the “install anyway” flow in the test environment if allowed).

3) scrcpy-friendly configuration (no APK needed)

Purpose: live screen mirror & input control.

How: if USB Debugging is allowed/enabled, you don’t install anything on the phone. If debugging is disabled but allowed to be enabled, turn it on in Settings → Developer options → USB debugging.

Enables: real-time screen viewing & control from your host.

Notes: Best demo tool. If Dev Options is off and you cannot toggle it, scrcpy is unavailable.

4) Termux (OPTIONAL) or a lightweight shell app

Purpose: provide a local shell environment and can run simple networking tools (SSH client if you need out-of-band). Useful if ADB not allowed.

How: install Termux APK from F-Droid or your signed copy (or via Play Store if available).

Enables: local scripting, simple listeners, quick file operations — valuable when ADB is not enabled.

Notes: Termux cannot act as a stealth persistence service by default (modern Android restricts background services). Play Protect may flag obscure installs.

5) Frida gadget (embedded) or Frida-server binary (only if allowed)

Purpose: enable runtime instrumentation for apps you want to hook.

How: two variants:

Frida-server binary requires pushing an executable and running it on the device — often needs root or adb shell execution rights.

Frida-gadget is an alternative: embed the gadget into an app (your test APK) and run it — no root required.

Enables: dynamic hooks, bypassing checks, dumping runtime secrets, bypassing pinning (with caution).

Notes: Frida-server on non-root devices may be killed by Play Protect or require workarounds. Prefer Frida-gadget embedded within your signed test app.

6) Burp CA + Proxy configuration (on device)

Purpose: configure device to use your lab proxy (Burp/mitmproxy) IP and port.

How: Settings → Wi-Fi → Modify network → Advanced → Proxy → Manual (enter lab host IP and port).

Enables: route all app web traffic through your proxy for interception and replay.

Notes: system apps and apps using VPNs won't follow proxy. You’ll need the CA installed to intercept HTTPS.

7) Accessibility helper (optional; use only if allowed & documented)

Purpose: in some advanced persistence demos, an Accessibility Service can auto-start and perform actions after boot.

How: included in your test APK; user must enable it in Settings → Accessibility.

Enables: automation and sometimes persistence across reboots (but requires explicit user enable).

Notes: highly visible and often blocked/warned by Play Protect — use only if allowed and documented.

8) Diagnostic apps (optional but handy)

Network Info II, IP Tools, or Ping & Net — to get the phone IP, SSID, and routing info quickly from UI.

How: install simple listed apps from Play Store or your signed copies.

Enables: quick confirmation of connectivity and IP for ADB-over-TCP or proxy setup.

9) Remote support tools (commercial alternatives)

TeamViewer Host (commercial): host installation allows remote control from your account — works without ADB but requires internet and registration.

AirDroid / Vysor: remote control / mirroring services — sometimes blocked by vendor protections.

Use only if the lab permits external services; otherwise prefer self-hosted reverse app.

What to install ON THE HOST (lab server) — minimal list

ADB (Android SDK platform-tools) — to connect and control the device when USB debugging enabled.

scrcpy — to mirror the screen/control once device is accessible.

Burp Suite (or mitmproxy) + prepared CA cert — for HTTP(S) interception.

Frida tools (frida-server or frida-tools + frida-python) — for dynamic instrumentation.

MobSF, jadx, apktool — for APK static analysis.

Wireshark / tcpdump — capture traffic on lab VLAN.

A simple listener (your lab server) — for your test APK reverse connection (e.g., a simple HTTPS server or websocket server you control).

SQLite Browser — read app DBs you pull.

What to put on the phone filesystem (files) — filenames & placements

(These are suggestions you prepare on a USB or microSD to drop onto the phone during touch.)

lab_ca.crt — the Burp CA certificate to install.

lab_control_v1_signed.apk — your benign test APK (signed with your key). Place in Download/ so the user can tap and install.

termux.apk (optional) — for Termux install if needed.

frida-gadget.jar or frida-gadget.so — if using embedded gadget in your test app, include in your build; otherwise keep for documentation.

readme_lab.txt — a short text file on the device home explaining the test app purpose, who installed it, and contact (transparency for graders).

Placement: place files in Download/ or Documents/ for easy access via device UI. Do not attempt to push to system directories unless explicitly allowed.

Configurations to apply on the phone (UI-level only)

Install the lab CA and verify it appears under Settings → Security → Trusted credentials (User).

Configure Wi-Fi proxy (Manual) to point to your lab host (Burp) IP and port.

If allowed, enable Developer Options → USB debugging.

If installing test app, accept installation dialog, and if app requests permissions (INTERNET, RECEIVE_BOOT_COMPLETED), accept only those required and document.

If Accessibility-based persistence is used, enable the accessibility service for that app (UI path: Settings → Accessibility → [app name]).

Persistence & reboot behavior — realistic expectations

ADB / scrcpy sessions: lost on reboot. You must re-enable ADB-over-TCP (if not persisted) or rely on your test APK to re-establish a connection after boot.

Installed test APK with RECEIVE_BOOT_COMPLETED:

Can attempt to start after boot, but may be blocked by modern battery optimizations and Play Protect.

Some data remains encrypted until the user unlocks the device after boot; your app may not access everything unless you use unlocked-state triggers or require user unlock.

Termux / background services: Android aggressively limits background services; recent versions will pause or kill persistent processes unless whitelisted or converted to foreground service (visible notification).

System reboots & keystore: hardware-backed keystore and Direct Boot protect secrets — note this in report.

If device powers off or goes out of network: remote channels will be lost until device reconnects to your lab network / user unlocks it.

If Developer Options is OFF and you cannot enable it (realistic options)

Install the benign test APK via user action: if policy allows installations, ask the pro to allow installation from unknown sources temporarily or use Play Store if available.

Use user-interaction vector: create a demo where a simulated user visit (open an URL or tap an APK) triggers your test app install — show the required social-action for exploitation (in many exams, proving the user action is acceptable).

Network-only route: place the device behind your proxy (lab Wi-Fi) and do API-level testing (intercept, replay, or fuzz), and attempt to trigger a benign OTA or update that installs your test app (if lab allows).

Static & remote analysis: pull the APKs from Play Store (if available) and analyze them offline in MobSF/jadx to find exportable weaknesses you can demonstrate even without local ADB.

Play Protect / Vendor security — handling and expectations

Play Protect often blocks unknown APK installations and will show an alarm. Do not attempt to bypass Play Protect stealthily. Instead:

Document the detection (screenshot of Play Protect alert).

Ask pro to whitelist the APK during lab time (many exams permit this temporarily).

Use Frida-gadget inside your signed app (less likely to be flagged than an unknown binary pushed to /data/local/tmp) if you must instrument apps.

Commercial labs may have Play Protect disabled — check before you travel.

Cleanup steps (what to uninstall / restore before handing device back)

Uninstall your test APK(s) and any other installed apps (Document uninstall screens).

Remove lab CA certificate (Settings → Security → Trusted credentials → User → remove).

If you enabled Developer Options previously off, revert Developer Options state to original (toggle USB debugging off if it was off earlier) — document both states.

Restore from the original device image or perform a factory reset if required by lab policy.

Deliver hashes of backups and the cleanup log. Show evidence (screenshots) that no lab artifacts remain.

Pro-level tips & hard-earned tradecraft (short)

Bring two approaches: ADB/scrcpy (if you can enable Dev Options) and a benign test APK approach (if you cannot). Be ready to pivot fast.

Test everything on emulator first — install your APK, Frida gadget, CA, and proxy flows on emulator with the same Android version so there are no surprises on the live device.

Sign your APK with a recognisable lab key and include a manifest page stating “laboratory test app for [your name / lab]” — transparency reduces friction with Play Protect and graders.

Keep the test app minimal: a small persistent heartbeat to your lab server (HTTPS handshake + status page) is enough to demonstrate remote control/persistence concept.

Log & timestamp aggressively: every install/uninstall, CA install, enabling of settings — examiners grade both technical ability and documentation.

Have recovery ready: if a device behaves oddly after your changes, be ready to restore from the image you took first.

Example minimal packages you should carry on USB

lab_control_v1_signed.apk — your signed benign control APK (primary).

lab_ca.crt — lab proxy CA.

termux.apk — optional.

readme_lab.txt — transparency note visible on desktop.

diagnostic.apk (IP tool) — optional.

Quick 10-step practical checklist to run during your single touch

Photograph device and serial/IMEI.

Check & record Android version & patch.

Check/record Developer Options status.

Capture device IP & connect to lab VLAN/Wi-Fi.

Install lab_ca.crt and configure Wi-Fi proxy to lab host.

Install lab_control_v1_signed.apk (and enable requested permission only).

If allowed, enable USB Debugging; confirm host can see the device.

On host: verify scrcpy, Burp intercept, and that lab_control calls home.

Take screenshots of each important step and compute hashes for any stored images.

Document and hand over evidence copy; leave device in cleanup-ready state or perform cleanup if required.

What to expect in scoring / examiner checks

They will look for: evidence of imaging first, documentation of settings before/after, reproducible demo (screen mirror, network trace), safe behavior (no exfil of private user data not authorized), and proper cleanup. Being transparent and professional often scores better than a “clever but messy” exploit.
