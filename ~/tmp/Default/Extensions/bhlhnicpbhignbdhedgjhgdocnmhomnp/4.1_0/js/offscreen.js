/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
var browser=browser||chrome;let isDarkMode=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,darkModeDetectorElem=(browser.runtime.onMessage.addListener(function(e,r,o){"get-localstorage-version"==e.op?o({"prevVersion":localStorage.version}):"get-is-dark-mode"==e.op&&o({"darkMode":isDarkMode})}),document.getElementById("dark-mode-detector")),darkModeDetectorElemStyles=window.getComputedStyle(darkModeDetectorElem);function getDarkModeFromElem(){var e=darkModeDetectorElemStyles.color;return"rgb(0, 0, 0)"==e||"rgb(0,0,0)"==e}function monitorDarkModeChanges(){var e=getDarkModeFromElem();e!=isDarkMode&&(browser.runtime.sendMessage({"op":"is-dark-mode-changed","darkMode":e}),isDarkMode=e)}setInterval(monitorDarkModeChanges,1e3);