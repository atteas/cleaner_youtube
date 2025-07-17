/***************************

  CYT - Cleaner YouTube | cyt_blockedChannelsManager.html js-file

  programmer: atteas (github)
  version: 0.09

***************************/

document.getElementById("openBlockedChannelsManagerButton").addEventListener("click", function(){
    const url = chrome.runtime.getURL("page/cyt_blockedChannelsManager.html");

    if (typeof browser !== "undefined" && browser.tabs?.create) {
        browser.tabs.create({ url }); // Firefox, Safari (with polyfill), etc.
    } else {
        chrome.tabs.create({ url });  // Chrome, Edge, etc.
    }
});