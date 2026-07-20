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

// Finds the most likely "list of post cards" by looking for groups of
// sibling elements (same tag + first class) repeated roughly as many times
// as the page title says there should be saved posts — e.g. "(25) Saved
// Posts" — rather than relying on hardcoded LinkedIn class names, which
// change often and are why the hardcoded SELECTORS above came up empty.
// Skeleton/loading placeholders and text-free groups (spacers, dividers)
// are excluded so a stuck loading state doesn't masquerade as real content.
const NOISE_PATTERN = /skeleton|loading|placeholder|shimmer|spinner/i;

function findRepeatedGroups(expectedCount, limit = 3) {
  const candidates = [];

  document.querySelectorAll("div, ul, ol").forEach((container) => {
    const children = Array.from(container.children);
    if (children.length < 3) return;

    const groups = new Map();
    for (const child of children) {
      const firstClass = (child.className || "").toString().trim().split(/\s+/)[0] || "";
      const key = `${child.tagName}.${firstClass}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(child);
    }

    for (const [key, group] of groups) {
      if (group.length < 3) continue;
      if (NOISE_PATTERN.test(key)) continue;
      if (!group.some((el) => el.textContent.trim().length > 20)) continue;

      const score = expectedCount ? -Math.abs(group.length - expectedCount) : group.length;
      candidates.push({ key, group, count: group.length, score });
    }
  });

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, limit);
}

function collectDiagnostics() {
  const lines = [];
  lines.push(`URL: ${location.href}`);
  lines.push(`Title: ${document.title}`);

  const expectedMatch = document.title.match(/\((\d+)\)/);
  const expectedCount = expectedMatch ? Number(expectedMatch[1]) : null;
  lines.push(`Expected saved-post count (from title): ${expectedCount ?? "unknown"}`);

  const skeletonCount = document.querySelectorAll('[class*="skeleton" i]').length;
  lines.push(`Skeleton/loading placeholder elements still on page: ${skeletonCount}`);

  const groups = findRepeatedGroups(expectedCount);

  lines.push("--- repeated-group candidates (real content only, loaders excluded) ---");
  if (groups.length === 0) {
    lines.push("None found. The page likely hasn't finished loading real posts yet.");
    const scroll = document.querySelector(".scaffold-finite-scroll__content");
    lines.push("--- fallback: .scaffold-finite-scroll__content ---");
    lines.push(scroll ? scroll.outerHTML.slice(0, 4000) : "not found");
  } else {
    groups.forEach((g, i) => {
      lines.push(`\n[Candidate ${i + 1}] "${g.key}" — ${g.count} siblings`);
      lines.push(g.group[0].outerHTML.slice(0, 2500));
    });
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
