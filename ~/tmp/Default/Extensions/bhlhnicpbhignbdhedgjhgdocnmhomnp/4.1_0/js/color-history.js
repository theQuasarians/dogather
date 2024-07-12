/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
var ColorZilla;(ColorZilla=void 0!==ColorZilla&&ColorZilla?ColorZilla:{}).ColorHistory={"_historyColors":[],"_maxLength":65,"addColor":function(o){var r;-1!=(r=cz.ColorHistory._historyColors.indexOf(o))&&cz.ColorHistory._historyColors.splice(r,1),cz.ColorHistory._historyColors.unshift(o),cz.ColorHistory._historyColors=cz.ColorHistory._historyColors.slice(0,cz.ColorHistory._maxLength-1),cz.ColorHistory.persist()},"clear":function(){cz.ColorHistory._historyColors=[],cz.ColorHistory.persist()},"get":function(){return cz.ColorHistory._historyColors},"persist":function(){browser.storage.local.set({"color-history":JSON.stringify(cz.ColorHistory._historyColors)}),browserPromise.runtime.sendMessage({"op":"history-persisted"}).catch(o=>{})},"persistEventListener":function(o,r,s){"history-persisted"==o.op&&(cz.ColorHistory.readFromStorage(),s({"res":!0}))},"readFromStorage":async function(){var o=await browserPromise.storage.local.get("color-history");"color-history"in o&&(cz.ColorHistory._historyColors=JSON.parse(o["color-history"]))},"init":async function(){await cz.ColorHistory.readFromStorage(),browser.runtime.onMessage.hasListener(cz.ColorHistory.persistEventListener)||browser.runtime.onMessage.addListener(cz.ColorHistory.persistEventListener)}};