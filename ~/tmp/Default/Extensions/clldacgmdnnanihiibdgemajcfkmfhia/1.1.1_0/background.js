/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
console.log("Loaded..")

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .replace(/[018]/g, (t) => (t ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4))))
      .toString(16));
}

const captureScreenFunc = async () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (screenshot) => {
      resolve(screenshot)
    })
  })
}


const addCanvas = () => {

  chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {

    const tab = tabs[0]


    let SSUrl = await captureScreenFunc()
    chrome.tabs.sendMessage(tab.id, { message: "init", screenshot: SSUrl })
  })

}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)
  if (request.captureScreen) {
    addCanvas()
    sendResponse()
  }
});

chrome.runtime.onInstalled.addListener(function (t) {
  "install" == t.reason ?
    (chrome.storage.sync.set({
      installedOn: Date.now(),
      uid: uuidv4(),
      simplecolorpicker: true
    })) :
    "update" == t.reason &&
    chrome.storage.sync.get("uid", (t) => {
      t.uid ? chrome.storage.sync.set({
        updatedOn: Date.now()
      }) : chrome.storage.sync.set({
        updatedOn: Date.now(),
        uid: uuidv4(),
        simplecolorpicker: true
      });
    });
})

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {


    chrome.tabs.query({ currentWindow: true }, function gotTabs(tabs) {
      for (let index = 0; index < tabs.length; index++) {
        let content_scripts = chrome.runtime.getManifest().content_scripts[0]
        let a = [...content_scripts.js, ...content_scripts.css]
        console.log(a)
        chrome.scripting.insertCSS({
          target: { tabId: tabs[index].id },
          files: [...content_scripts.css]
        });
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[index].id },
            files: [...content_scripts.js],
          },
          () => result => {
            const lastErr = chrome.runtime.lastError;
            if (lastErr) { }
          });


      }
      chrome.tabs.create({ url: ("https://autocolorpicker.com/#how-it-works") }, () => {

      })
    });



  }
});

chrome.runtime.setUninstallURL("https://autocolorpicker.com/feedback/")


/******/ })()
;
//# sourceMappingURL=background.js.map