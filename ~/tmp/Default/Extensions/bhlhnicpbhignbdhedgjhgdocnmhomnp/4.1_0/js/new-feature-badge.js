/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
const NewFeaturesBadgeConf={"features":[{"id":"system-eyedropper-menuitem","container":"#system-eyedropper-menuitem","expirationDate":"2023-12-15","maxShowCount":50}]},NewFeaturesBadge={"showAll":async function(){for(var e of NewFeaturesBadgeConf.features){var a=new Date,r=new Date(e.expirationDate);if(!(a.getTime()>r.getTime())){let t=e.id+"-engaged";var o,a=e.id+"-shown-count",r={},r=(r[t]=!1,r[a]=0,await browserPromise.storage.local.get(r));r[t]||r[a]>=e.maxShowCount||(e=document.querySelector(e.container))&&((o=document.createElement("span")).className="new-feature",o.innerText=browser.i18n.getMessage("new_feature_label"),e.appendChild(o),(o={})[a]=r[a]+1,browserPromise.storage.local.set(o),e.addEventListener("click",()=>{var e={};e[t]=!0,browserPromise.storage.local.set(e)}))}}}};