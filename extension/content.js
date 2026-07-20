// Runs only on linkedin.com/my-items/saved-posts. Manual-trigger only: nothing
// happens until the user clicks the injected "Import to PostVault" button.
//
// LinkedIn's DOM structure changes over time and class names are frequently
// obfuscated/rotated. Selectors below are best-effort, with fallbacks, and
// are written to skip a card it can't parse rather than throw — a partial
// mismatch should fail safe (fewer posts imported) rather than fail loudly.
// If LinkedIn has changed their markup since this was written, open devtools
// on the saved-posts page and adjust the selectors in `SELECTORS` below.

const SELECTORS = {
  postContainer: [
    "div.reusable-search__result-container",
    "div[data-urn].feed-shared-update-v2",
    "div[data-urn]",
  ],
  authorName: [".update-components-actor__name", ".feed-shared-actor__name", ".entity-result__title-text"],
  authorTitle: [".update-components-actor__description", ".feed-shared-actor__description"],
  content: [
    ".update-components-text",
    ".feed-shared-update-v2__description",
    ".feed-shared-text",
    ".entity-result__summary",
  ],
  postLink: ['a.app-aware-link[href*="/feed/update/"]', 'a[href*="/posts/"]'],
  video: ["video"],
  image: [".update-components-image img", ".feed-shared-image img"],
  document: [".document-s-container", ".feed-shared-document"],
};

function firstMatch(root, selectors) {
  for (const sel of selectors) {
    const el = root.querySelector(sel);
    if (el) return el;
  }
  return null;
}

function textOf(el) {
  return el ? el.textContent.trim().replace(/\s+/g, " ") : null;
}

function detectPostType(card) {
  if (firstMatch(card, SELECTORS.video)) return "video";
  if (firstMatch(card, SELECTORS.document)) return "document";
  if (firstMatch(card, SELECTORS.image)) return "image";
  return "text";
}

function scrapeVisiblePosts() {
  const containers = [];
  for (const sel of SELECTORS.postContainer) {
    document.querySelectorAll(sel).forEach((el) => containers.push(el));
    if (containers.length) break; // first selector that matches anything wins
  }

  const seen = new Set();
  const posts = [];
  let skipped = 0;

  for (const card of containers) {
    const linkEl = firstMatch(card, SELECTORS.postLink);
    const sourceUrl = linkEl ? linkEl.href.split("?")[0] : null;
    const content = textOf(firstMatch(card, SELECTORS.content));

    if (!content && !sourceUrl) {
      skipped++;
      continue;
    }
    if (sourceUrl && seen.has(sourceUrl)) continue;
    if (sourceUrl) seen.add(sourceUrl);

    posts.push({
      author_name: textOf(firstMatch(card, SELECTORS.authorName)),
      author_title: textOf(firstMatch(card, SELECTORS.authorTitle)),
      content: content ?? "",
      source_url: sourceUrl,
      post_type: detectPostType(card),
      media_urls: [],
    });
  }

  return { posts, skipped };
}

function collectDiagnostics() {
  const lines = [];
  lines.push(`URL: ${location.href}`);
  lines.push(`Title: ${document.title}`);

  const candidateSelectors = [
    "div[data-urn]",
    "div.reusable-search__result-container",
    "li.reusable-search__result-container",
    "div.feed-shared-update-v2",
    "div.artdeco-card",
    "li.artdeco-list__item",
    "div.scaffold-finite-scroll__content > div",
    "main ul > li",
  ];

  lines.push("--- candidate selector counts ---");
  let best = null;
  for (const sel of candidateSelectors) {
    const count = document.querySelectorAll(sel).length;
    lines.push(`${sel}: ${count}`);
    if (count > 1 && (!best || count > best.count)) best = { sel, count };
  }

  lines.push("--- sample element HTML (this is what I need) ---");
  if (best) {
    const el = document.querySelector(best.sel);
    lines.push(`Best guess container: ${best.sel} (${best.count} matches)`);
    lines.push(el.outerHTML.slice(0, 4000));
  } else {
    const main = document.querySelector("main");
    lines.push("No repeated candidate found. Dumping <main> (truncated):");
    lines.push((main ? main.outerHTML : document.body.outerHTML).slice(0, 4000));
  }

  return lines.join("\n");
}

function injectButton() {
  if (document.getElementById("postvault-import-btn")) return;

  const btn = document.createElement("button");
  btn.id = "postvault-import-btn";
  btn.textContent = "Import to PostVault";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "999999",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "system-ui, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
  });

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Scanning page…";

    const { posts, skipped } = scrapeVisiblePosts();

    if (posts.length === 0) {
      const diagnostics = collectDiagnostics();
      console.log("[PostVault diagnostics]\n" + diagnostics);

      let copied = false;
      try {
        await navigator.clipboard.writeText(diagnostics);
        copied = true;
      } catch {
        copied = false;
      }

      btn.textContent = copied
        ? "No posts found — diagnostics copied, paste to Claude"
        : "No posts found — press F12, copy Console output";
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = "Import to PostVault";
      }, 8000);
      return;
    }

    btn.textContent = `Importing ${posts.length}…`;

    chrome.runtime.sendMessage({ type: "IMPORT_POSTS", posts }, (response) => {
      btn.disabled = false;
      if (chrome.runtime.lastError || !response) {
        btn.textContent = "Import failed — set API key in popup";
      } else if (response.error) {
        btn.textContent = `Error: ${response.error}`.slice(0, 40);
      } else {
        const parts = [`Imported ${response.imported}`];
        if (response.skipped) parts.push(`${response.skipped} skipped`);
        if (skipped) parts.push(`${skipped} unparsed`);
        btn.textContent = parts.join(", ");
      }
      setTimeout(() => {
        btn.textContent = "Import to PostVault";
      }, 5000);
    });
  });

  document.body.appendChild(btn);
}

injectButton();
// LinkedIn is a single-page app; re-inject if the page navigates client-side
// without a full reload and the button gets removed from the DOM.
new MutationObserver(injectButton).observe(document.body, { childList: true, subtree: false });
