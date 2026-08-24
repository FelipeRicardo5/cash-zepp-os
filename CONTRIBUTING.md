# Contributing to Cash

Thanks for your interest in contributing! This document covers everything you need to work on **Cash**, a personal finance (cash balance) tracker for Zepp OS smartwatches.

## Tech Stack

| Tool | Purpose |
|---|---|
| [Zepp OS 4.0 SDK](https://docs.zepp.com/) | Watch runtime (`@zos/*` APIs) |
| `@zeppos/zml` | Zepp OS mini program framework |
| [@silver-zepp/autogui](https://github.com/silver-zepp/zeppos-autogui) | Rapid GUI with auto-positioning |
| Zeus CLI (`@zeppos/zeus-cli`) | Build / simulate / deploy |

## Prerequisites

- Node.js 14+
- Zepp OS CLI: `npm install -g @zeppos/zeus-cli`
- [Zepp App](https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager) on your phone (for real-device preview)

## Getting Started

```bash
git clone <repo-url>
cd cash-zepp-os
npm install

zeus dev        # build with watch mode
zeus preview    # QR code simulator / real device preview
zeus build      # production build (.zab file in dist/)
```

## Project Structure

```
├── app.js                  # App entry (minimal, global state bootstrap)
├── app.json                # App config: pages, permissions, targets
├── page/
│   ├── home/index.page.js             # Balance display, reset, navigation
│   ├── new_transaction/index.page.js  # Amount entry keypad
│   ├── historic/index.page.js         # Transaction history list
│   └── i18n/*.po                      # Page translations
├── core/
│   ├── state.js            # Pub/sub reactive store
│   ├── storage.js          # LocalStorage wrapper (persistence)
│   ├── constants.js        # Storage keys, defaults
│   └── format.js           # Currency/date formatting helpers
├── assets/
│   ├── gt.r/               # Round screen assets
│   └── gt.s/               # Square screen assets
├── app-side/index.js       # Companion side service
└── setting/index.js        # Settings page
```

### Architecture Rules

1. **UI via AutoGUI only.** Do not use raw `hmUI.createWidget` with manual x/y coordinates or hand-written layout files. Use the `AutoGUI` flow builder (`gui.text()`, `gui.button()`, `gui.newRow()`, `gui.render()`). Single documented exception: `hmUI.widget.SCROLL_LIST` on data lists (AutoGUI has no scrolling container).
2. **All state flows through the store** (`core/state.js`). Pages never read/write shared data directly; they subscribe via `appState.on(key, cb)` and mutate via `appState.set(key, value)`.
3. **Persistence only through `core/storage.js`.** Never import `LocalStorage` directly inside pages.
4. **One directory per page.** Logic lives in `index.page.js`. Keep pages thin — business logic belongs in `core/`.
5. **No dead code.** Commented-out blocks and unused imports are removed before commit.

## Internationalization (i18n)

The app is i18n-first. **Hardcoded UI strings are not allowed** in page code.

- Default locale: `en-US` (see `app.json → defaultLanguage`)
- Translation files: gettext `.po` format under `page/i18n/` (and `setting/i18n/`)
- Usage in code:

```js
import { getText } from '@zos/i18n'

// .po file must contain:
// msgid "Current Balance"
// msgstr "Saldo Atual"
hmUI.createWidget(hmUI.widget.TEXT, {
  ...textStyle,
  text: getText('Current Balance')
})
```

### Adding a new string

1. Use a clear English `msgid` directly in code via `getText('...')`.
2. Add the entry to **every** `.po` file under `page/i18n/`.
3. Never concatenate translated fragments — full sentences make translation viable.

### Adding a new language

1. Create `page/i18n/<locale>.po` (e.g. `pt-BR.po`) copying the `msgid` keys from `en-US.po`.
2. Register the locale in `app.json → i18n`.

## Code Style

Formatting is enforced by Prettier (see `.prettierrc.js`):

- No semicolons
- Single quotes
- 100 char line width
- No trailing commas
- 2-space indentation

```bash
npx prettier --write .
```

## Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(historic): add scrollable transaction list
fix(home): prevent crash on balance reset
refactor(core): extract storage wrapper
docs: update CONTRIBUTING.md
```

Scope names: `home`, `new_transaction`, `historic`, `core`, `i18n`, `assets`, `deps`.

## Testing on Devices

This project targets two screen shapes (see `app.json → targets.gt.platforms`):

- Round displays (480px) — `st: "r"`
- Square displays (390px) — `st: "s"`

Always verify layouts on both shapes with `zeus preview` before opening a PR.

## Questions?

Open an issue or reach out to the maintainers.
