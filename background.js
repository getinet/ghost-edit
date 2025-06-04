// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "resetBaseUrl",
    title: "Reset Base URL",
    contexts: ["action"]
  });
});

// Handle icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("baseUrl", (data) => {
    const base = data.baseUrl;

    if (!base) {
      // Show config popup window if base is not set
      chrome.windows.create({
        url: chrome.runtime.getURL("set-base.html"),
        type: "popup",
        width: 400,
        height: 600
      });
    } else if (tab.url.startsWith(base) && !tab.url.endsWith("/edit")) {
      const newUrl = tab.url.endsWith("/") ? tab.url + "edit" : tab.url + "/edit";
      chrome.windows.create({
        url: newUrl,
        type: "popup",
        width: 1200,
        height: 800
      });
    }
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "resetBaseUrl") {
    chrome.storage.sync.remove("baseUrl", () => {
      chrome.windows.create({
        url: chrome.runtime.getURL("set-base.html"),
        type: "popup",
        width: 400,
        height: 600
      });
    });
  }
});
