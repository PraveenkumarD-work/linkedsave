chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "IMPORT_POSTS") return false;

  (async () => {
    const { apiBaseUrl, apiKey } = await chrome.storage.local.get(["apiBaseUrl", "apiKey"]);

    if (!apiKey || !apiBaseUrl) {
      sendResponse({ error: "not configured" });
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/v1/posts/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts: message.posts }),
      });

      const data = await res.json();

      if (!res.ok) {
        sendResponse({ error: data.error ?? `HTTP ${res.status}` });
        return;
      }

      await chrome.storage.local.set({
        lastImportResult: { ...data, timestamp: Date.now() },
      });

      sendResponse(data);
    } catch (err) {
      sendResponse({ error: err instanceof Error ? err.message : "network error" });
    }
  })();

  return true; // keep the message channel open for the async sendResponse
});
