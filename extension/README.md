# PostVault Importer (Chrome extension)

Imports your LinkedIn saved posts into PostVault with one click. **Manual trigger only** — it
does nothing until you click the button on the saved-posts page, and only reads what's already
rendered on that page in your own logged-in session.

## Read this before using it

Automating access to `linkedin.com` — including scraping your own saved posts with a browser
extension — is against LinkedIn's User Agreement. This isn't scraping other people's data or
running at scale, but LinkedIn's automation detection doesn't distinguish intent from mechanism:
using this carries a real risk of a warning or temporary restriction on your account. Use it
knowingly, at your own pace (don't hammer it repeatedly), and stop if you see any account warnings.

This extension is not published to the Chrome Web Store and isn't intended to be — load it
unpacked, for your own personal use only.

## Setup

1. In PostVault, go to **Developer API** (`/app/developer`) and create an API key. Copy it —
   it's shown once.
2. In Chrome, go to `chrome://extensions`, enable **Developer mode** (top right), click
   **Load unpacked**, and select this `extension/` folder.
3. Click the extension icon in your toolbar, paste your **API base URL**
   (e.g. `https://postvault-clone.netlify.app`) and the **API key** you just created, click Save.
4. Go to `https://www.linkedin.com/my-items/saved-posts/`. A purple **Import to PostVault**
   button appears bottom-right. Click it to import whatever's currently loaded on the page.
5. Scroll to load more saved posts, click Import again — already-imported posts (matched by URL)
   get updated in place rather than duplicated.

## If nothing gets imported

LinkedIn's page markup changes over time and often uses obfuscated class names, so the scraper's
selectors (in `content.js`, the `SELECTORS` object near the top) may need a small update to match
whatever LinkedIn is currently shipping. Open devtools on the saved-posts page, inspect a saved
post card, and adjust the selectors to match. The button reports "N unparsed" when it finds post
containers it couldn't read — that's the signal something changed.
