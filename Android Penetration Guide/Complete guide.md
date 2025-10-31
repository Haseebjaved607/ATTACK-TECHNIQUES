# README — Practical: What to put on the phone (one-time physical touch)

**Target:** Android 11 / 12 (Tecno, Infinix, Oppo, Pixel, etc.)

**Goal:** After one physical touch, enable remote/live access & analysis capabilities to run a full pentest from your lab host. Provide fallback options for time-limited or restricted environments.

---

## High-level plan (one sentence)

During your one touch: (1) document & image, (2) isolate network, (3) enable/verify Developer Options if allowed, then (4) install a small set of benign, signed apps/files + trust a lab CA so you can remotely mirror the screen, intercept traffic, instrument apps, and — if required — maintain a controlled remote channel; finally document and cleanup.

---

## What to install ON THE PHONE (priority order)

Each item: *purpose* — *where to get it / how to set it (UI-level)* — *what it enables* — *notes (detection, persistence, when to choose)*

### 1) Trusted lab CA certificate (Burp / mitmproxy)

* **Purpose:** let you intercept app HTTPS traffic with Burp/mitmproxy without certificate warnings.
* **How (UI-level):** Settings → Security → Install from storage → select `lab_ca.crt`.
* **Enables:** full HTTP(S) interception of many apps (except apps using certificate pinning or Android 7+ block for user CAs).
* **Notes:** Modern apps may ignore user CAs. Installing the CA may require a screen lock to be present.

### 2) A small benign test APK you control (recommended)

* **Purpose:** controlled reverse channel + persistence demonstration.
* **How:** copy `lab_control_v1_signed.apk` to Downloads and install via UI (tap). If USB debugging enabled, install via host.
* **Enables:** a safe, auditable network callback so you can reconnect remotely and demonstrate persistence.
* **Notes:** Do not include exfiltration code. Keep app transparent (status page). If Play Protect flags it, document the block and ask pro to whitelist.

### 3) scrcpy-friendly configuration (no APK needed)

* **Purpose:** live screen mirror & input control.
* **How:** Settings → Developer options → USB debugging (enable if allowed). No phone APK required.
* **Enables:** real-time screen viewing & control from your host.
* **Notes:** If Dev Options is off and you cannot toggle it, scrcpy is unavailable.

### 4) Termux (OPTIONAL)

* **Purpose:** local shell environment to run simple networking tools when ADB not available.
* **How:** install `termux.apk` from F‑Droid or your signed copy.
* **Enables:** local scripting, simple listeners, quick file ops.
* **Notes:** Background restrictions apply; Play Protect may flag unknown installs.

### 5) Frida gadget (embedded) or frida-server binary (only if allowed)

* **Purpose:** runtime instrumentation for apps you want to hook.
* **How:** embed Frida-gadget into your test APK or, if allowed and device supports it, push/run `frida-server` (often requires root/adb shell).
* **Enables:** dynamic hooks, dumping runtime secrets, bypassing pinning (with caution).
* **Notes:** Frida-server may be killed by Play Protect. Prefer Frida-gadget in your signed app.

### 6) Burp CA + Proxy configuration (on device)

* **Purpose:** route device HTTP(S) through your lab proxy.
* **How:** Settings → Wi‑Fi → Modify network → Advanced → Proxy → Manual → enter lab host IP and port.
* **Enables:** intercept/replay app traffic in Burp/mitmproxy.
* **Notes:** System apps or VPNs may not follow proxy. Install lab CA to intercept HTTPS.

### 7) Accessibility helper (optional; use only if allowed & documented)

* **Purpose:** enable automation or actions after boot via Accessibility Service in your test app.
* **How:** Settings → Accessibility → enable your app’s accessibility service.
* **Enables:** advanced automation and some persistence behaviors.
* **Notes:** Highly visible and often flagged; use only with explicit permission.

### 8) Diagnostic apps (optional but handy)

* **Examples:** Network Info II, IP Tools, Ping & Net.
* **Purpose:** quick device network details (IP, SSID, gateway).
* **How:** install from Play Store or your signed copies.
* **Enables:** quick confirmation of connectivity and IP for ADB-over-TCP or proxy setup.

### 9) Remote support tools (commercial alternatives)

* **Examples:** TeamViewer Host, AirDroid, Vysor.
* **Notes:** Use only if lab permits external services; prefer self-hosted reverse app in closed labs.

---

## What to install ON THE HOST (lab server) — minimal list

* **ADB (Android SDK platform-tools)** — connect & control device when USB debugging enabled.
* **scrcpy** — mirror & control when device accessible.
* **Burp Suite or mitmproxy** + prepared CA cert.
* **Frida tools** (frida-server or frida-tools + frida-python).
* **MobSF, jadx, apktool** — static APK analysis.
* **Wireshark / tcpdump** — capture VLAN traffic.
* **Simple listener** (HTTPS/websocket) — for your test APK callback.
* **SQLite Browser** — inspect app DBs.

---

## What to put on the phone filesystem (files) — filenames & placements

* `lab_ca.crt` — Burp CA certificate.
* `lab_control_v1_signed.apk` — your benign signed test APK (place in `Download/`).
* `termux.apk` — optional.
* `frida-gadget.so` or packaged gadget inside your APK build.
* `readme_lab.txt` — short transparency note (who/why/when).

**Placement:** `Download/` or `Documents/` for easy access via UI. Do not push to system dirs unless explicitly allowed.

---

## Configurations to apply on the phone (UI-level only)

* Install lab CA: Settings → Security → Trusted credentials (User).
* Configure Wi‑Fi proxy to point to your lab host.
* If allowed, enable Developer Options → USB debugging.
* If installing test app, accept only required permissions (INTERNET, RECEIVE_BOOT_COMPLETED if needed) and document.
* If Accessibility used, enable the service: Settings → Accessibility → [app name].

---

## Persistence & reboot behavior — realistic expectations

* **ADB / scrcpy sessions**: lost on reboot. Re-enable ADB-over-TCP or rely on test APK to reestablish connection.
* **Test APK with `RECEIVE_BOOT_COMPLETED`**: may start after boot but can be blocked by battery optimizations and Play Protect.
* **Encrypted data & direct-boot**: some data only accessible after user unlock post-boot.
* **Termux / background services**: Android kills background processes aggressively; foreground service may be required.
* **Keystore / hardware-backed keys**: sensitive secrets may be unavailable even if rooted; document limitations.
* **Power-off / network loss**: remote channels are lost until device reconnects and/or user unlocks device.

---

## If Developer Options is OFF and you cannot enable it (realistic options)

* **Install benign test APK via user action:** ask pro to allow unknown installs temporarily or use Play Store.
* **User-interaction vector:** demo that a user action (tap URL/APK) installs the app—acceptable in many exams.
* **Network-only route:** place device behind your proxy and do API-level testing (intercept, replay, fuzz), try to trigger an OTA or update.
* **Static & remote analysis:** download APKs from Play Store and analyze offline with MobSF/jadx for exported components and weaknesses.

---

## Play Protect / Vendor security — handling and expectations

* Play Protect often blocks unknown APKs and warns. Do **not** bypass stealthily.
* **Document** the detection (screenshot). Request whitelist from pro if allowed.
* Use Frida-gadget inside your signed app when instrumentation needed (less likely to be flagged than injected binaries).
* Commercial labs may have Play Protect disabled; verify beforehand.

---

## Cleanup steps (what to uninstall / restore before handing device back)

1. Uninstall test APK(s) and any installed apps (capture uninstall screens).
2. Remove lab CA certificate: Settings → Security → Trusted credentials → User → remove.
3. If you enabled Developer Options, revert to original state (toggle USB debugging off if it was off earlier).
4. Restore from original device image or factory reset if required.
5. Deliver hashes of backups and the cleanup log; show screenshots proving no lab artifacts remain.

---

## Pro-level tips & hard-earned tradecraft

* Bring two approaches: **ADB/scrcpy** and **benign test APK**. Pivot fast.
* Test everything on emulator first: CA, proxy, Frida gadget, and test APK.
* Sign your APK with a recognizable lab key and include a manifest page: “laboratory test app for [your name / lab]”.
* Keep test app minimal: heartbeat (HTTPS) + status page is enough.
* Log & timestamp aggressively (every install/uninstall, CA install, settings change).
* Have recovery ready: restore from the image you took first.

---

## Example minimal packages to carry on USB

* `lab_control_v1_signed.apk`
* `lab_ca.crt`
* `termux.apk` (optional)
* `readme_lab.txt`
* `diagnostic.apk` (IP tool, optional)

---

## Quick 10-step practical checklist to run during your single touch

1. Photograph device and serial/IMEI.
2. Check & record Android version & patch.
3. Check/record Developer Options status.
4. Capture device IP & connect to lab VLAN/Wi‑Fi.
5. Install `lab_ca.crt` and configure Wi‑Fi proxy.
6. Install `lab_control_v1_signed.apk` (enable only required permissions).
7. If allowed, enable USB Debugging; confirm host can see the device.
8. On host: verify scrcpy, Burp intercept, and that `lab_control` calls home.
9. Take screenshots of each important step and compute hashes for stored images.
10. Document and hand over evidence copy; leave device in cleanup-ready state or perform cleanup if required.



