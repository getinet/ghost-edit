document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("baseUrl");
  const button = document.getElementById("saveBtn");

  // Load existing baseUrl
  chrome.storage.sync.get("baseUrl", (data) => {
    if (data.baseUrl) {
      input.value = data.baseUrl;
    }
  });

  button.addEventListener("click", () => {
    const baseUrl = input.value.trim();
    if (!baseUrl) return;

    // Save to storage
    chrome.storage.sync.set({ baseUrl }, () => {
      // Get current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.runtime.sendMessage({ action: "appendEdit", tab });
      });
    });
  });
});
