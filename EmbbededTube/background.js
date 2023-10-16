chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "refreshTab") {
        chrome.tabs.reload(sender.tab.id);
    }
});