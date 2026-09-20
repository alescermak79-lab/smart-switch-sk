/* Heureka "Overené zákazníkmi" – načíta sa až po súhlase s cookies.
   Po doplnení kľúča z účtu Heureka.sk (Overené zákazníkmi → widget) sa
   automaticky zobrazí plávajúci odznak s hodnotením obchodu. */
(function () {
  var KEY = "";                     // <- sem patrí kľúč widgetu z Heureka.sk
  var COUNTRY = "sk";               // sk = heureka.sk, cz = heureka.cz
  var CONSENT = "ssk-cookies";

  function hasConsent() {
    try { return localStorage.getItem(CONSENT) === "1"; } catch (e) { return false; }
  }

  function loadWidget() {
    if (!KEY || window.__heurekaLoaded) return;
    window.__heurekaLoaded = true;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://www.heureka." + COUNTRY + "/direct/i/gjs.php?n=wdgt&sak=" + KEY;
    document.head.appendChild(s);
  }

  window.__skLoadHeureka = loadWidget;
  if (hasConsent()) loadWidget();
})();
