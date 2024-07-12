/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
!function(){var n=chrome||n;document&&document.body&&(document.body.hasAttribute("cz-shortcut-listen")||(document.body.setAttribute("cz-shortcut-listen","true"),document.body.addEventListener("keydown",function(e){var t=-1<navigator.userAgent.toLowerCase().indexOf("mac"),o=e.keyCode;(e.ctrlKey&&e.altKey&&!t||e.metaKey&&e.altKey&&t)&&64<o&&o<91&&n.runtime.sendMessage({"op":"hotkey-pressed","keyCode":o})},!1)))}();