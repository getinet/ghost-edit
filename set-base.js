document.getElementById("save").addEventListener("click", () => {
  const baseUrl = document.getElementById("baseUrl").value.trim();
  if (baseUrl) {
    chrome.storage.sync.set({ baseUrl }, () => {
      window.close(); // Done
    });
  }
});
