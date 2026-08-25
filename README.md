# 🐶 Desktop Pet

A tiny cross-platform desktop companion that chases your cursor — inspired by the classic Neko cat. Pick a dog, cat, fox, or rabbit from the tray menu and it happily follows your mouse around the screen, sits down when it catches up, and falls asleep if you leave it alone.

**It never gets in your way.** The pet lives in a fully transparent, click-through overlay: every click, drag, scroll, and keystroke passes straight through to whatever you're working on. It can't steal focus, can't be clicked, and doesn't appear in the taskbar.

## Quick start (dev)

```bash
git clone <your-repo-url>
cd desktop-pet
npm install
npm start
```

A paw icon appears in your system tray / menu bar — right-click it to switch pets or quit.

## Build installers

```bash
npm run dist
```

Produces a `.dmg` (macOS), NSIS installer (Windows), or AppImage (Linux) in `dist/`.

## Installation notes

Prebuilt installers for every tagged release are on the
[Releases page](../../releases): a `.dmg` for macOS, an `.exe` installer for
Windows, and an `.AppImage` for Linux.

These builds are **not code-signed** (signing certificates cost money and this
is a free hobby project), so macOS and Windows will warn you the first time you
open the app. Nothing is wrong — you just need to tell the OS you trust it once:

- **macOS (Gatekeeper)** — you'll see *"Desktop Pet can't be opened because it
  is from an unidentified developer"* (or *"Apple could not verify…"* on newer
  versions). Don't double-click it. Instead, **right-click (or Control-click)
  `Desktop Pet.app` → Open**, then click **Open** in the dialog. macOS remembers
  the choice and opens it normally after that. If that option doesn't appear,
  go to **System Settings → Privacy & Security**, scroll down, and click
  **Open Anyway** next to the Desktop Pet message.

- **Windows (SmartScreen)** — you'll see a blue *"Windows protected your PC"*
  dialog when running the installer. Click **More info**, then **Run anyway**.
  Some antivirus products may also flag an unsigned installer; if you'd rather
  not trust the download, build it yourself from source with `npm run dist`.

- **Linux (AppImage)** — no warning, but you need to make the file executable
  first: `chmod +x Desktop-Pet-*.AppImage`, then run it.

The whole app is a handful of small source files (`main.js`, `preload.js`,
`pet.js`, `pet.html`), so auditing it before you build is a five-minute read.

## How it works

- `main.js` creates a frameless, transparent `BrowserWindow` covering the primary display with `setIgnoreMouseEvents(true)` — the OS routes all input past it. It polls the global cursor position (~60 fps) via `screen.getCursorScreenPoint()` and streams it to the renderer over IPC.
- `pet.js` runs a small behavior loop: chase with capped speed, stop at a comfortable distance, flip to face the direction of travel, bob while running, breathe while idle, and sleep (💤) after 12 s of stillness.
- No network access, no data collection, ~zero CPU when the cursor is still.

## Platform notes

- **macOS**: on first run, macOS may ask for Screen Recording or Accessibility permission depending on version — the app only reads the cursor position, nothing else.
- **Multi-monitor**: v0.1 covers the primary display. Multi-display support = one overlay window per display (PRs welcome).

## Roadmap ideas

- Pixel-art sprite sheets (classic Neko frames) instead of emoji
- Multiple pets at once
- Multi-monitor support
- Settings: speed, size, sleep timeout
- "Do not disturb" schedule

## License

MIT — do whatever you like, attribution appreciated.
