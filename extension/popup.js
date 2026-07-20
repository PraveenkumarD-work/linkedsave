const apiBaseUrlEl = document.getElementById("apiBaseUrl");
const apiKeyEl = document.getElementById("apiKey");
const statusEl = document.getElementById("status");
const lastResultEl = document.getElementById("lastResult");

function renderLastResult(result) {
  if (!result) {
    lastResultEl.textContent = "No imports yet.";
    return;
  }
  const when = new Date(result.timestamp).toLocaleTimeString();
  lastResultEl.textContent = `Last import (${when}): ${result.imported} imported, ${result.skipped} skipped.`;
}

chrome.storage.local.get(["apiBaseUrl", "apiKey", "lastImportResult"], (data) => {
  apiBaseUrlEl.value = data.apiBaseUrl ?? "https://postvault-clone.netlify.app";
  apiKeyEl.value = data.apiKey ?? "";
  renderLastResult(data.lastImportResult);
});

document.getElementById("save").addEventListener("click", async () => {
  const apiBaseUrl = apiBaseUrlEl.value.trim();
  const apiKey = apiKeyEl.value.trim();

  if (!apiBaseUrl || !apiKey) {
    statusEl.textContent = "Both fields are required.";
    statusEl.style.color = "#dc2626";
    return;
  }

  await chrome.storage.local.set({ apiBaseUrl, apiKey });
  statusEl.textContent = "Saved. Go to your LinkedIn saved posts page.";
  statusEl.style.color = "#059669";
});
