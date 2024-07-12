/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
var browser=chrome||browser,homePageLink=(ColorZilla.BrowserUtils.getExtensionVersion(function(e){document.getElementById("colorzilla-version").innerHTML=e}),ColorZilla.BrowserUtils.i18nReplace("head title, div.heading h1","about_colorzilla"),ColorZilla.BrowserUtils.i18nReplace("#version-label","version"),ColorZilla.BrowserUtils.i18nReplace("#created-by-label","created_by"),ColorZilla.BrowserUtils.i18nReplace("#homepage-label","home_page"),ColorZilla.BrowserUtils.i18nReplace("#licensing-label","licensing"),ColorZilla.BrowserUtils.i18nReplace("#license-link","license"),ColorZilla.BrowserUtils.i18nReplace("#attributions-label","attributions"),$("#colorpicker-attrib").html(browser.i18n.getMessage("color_picker_by",['<a href="http://www.digitalmagicpro.com/jPicker/">Christopher T. Tillman</a>','<a href="http://johndyer.name/photoshop-like-javascript-color-picker/">John Dyer</a>'])),document.getElementById("home-page-link")),browserName=ColorZilla.BrowserUtils.getBrowser();homePageLink.innerHTML=homePageLink.innerHTML+browserName+"/",homePageLink.href=homePageLink.href+browserName+"/";