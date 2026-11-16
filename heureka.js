/* Heureka "Overené zákazníkmi"
   - Plávajúci odznak (widget) sa načíta až po súhlase s cookies.
     Zatiaľ ukazuje certifikát z Heureka.cz – na Heureka.sk certifikát ešte nemáme.
     Keď ho získame, stačí doplniť SK_KEY a odznak sa prepne na Heureka.sk.
   - V pätičke sú vždy (bez cookies) odkazy na hodnotenia na Heureka.cz aj Heureka.sk. */
(function () {
  var CZ_KEY  = "A29D34F3960940D88C7E3EC70FA29266"; // widget Heureka.cz (Overeno zakazniky)
  var SK_KEY  = "";                                 // <- kľúč widgetu z Heureka.sk, keď získame certifikát
  var CONSENT = "ssk-cookies";
  var REVIEWS = {
    cz: "https://obchody.heureka.cz/smart-switch-cz/recenze/overene",
    sk: "https://obchody.heureka.sk/smart-switch-cz/recenze/overene"
  };

  function hasConsent() {
    try { return localStorage.getItem(CONSENT) === "1"; } catch (e) { return false; }
  }

  function loadWidget() {
    if (window.__heurekaLoaded) return;
    window.__heurekaLoaded = true;
    var key  = SK_KEY || CZ_KEY;
    var host = SK_KEY ? "sk.im9.cz" : "cz.im9.cz";
    window._hwq = window._hwq || [];
    window._hwq.push(["setKey", key]);
    window._hwq.push(["setTopPos", "130"]);
    window._hwq.push(["showWidget", "22"]);
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://" + host + "/direct/i/gjs.php?n=wdgt&sak=" + key;
    document.head.appendChild(s);
  }

  // V pätičke je odznak Heureka.sk (v HTML) – pridáme k nemu rovnaký odznak pre Heureka.cz
  function addFooterLinks() {
    if (document.getElementById("heureka-badge-cz")) return;
    var sk = document.querySelector(".site-footer a.heureka-badge");
    if (!sk) return;
    var cz = sk.cloneNode(true);
    cz.id = "heureka-badge-cz";
    cz.href = REVIEWS.cz;
    var b = cz.querySelector("b");
    if (b) b.textContent = "Recenzie obchodu na Heureka.cz";
    sk.href = REVIEWS.sk;
    sk.style.marginTop = "10px";
    sk.parentNode.insertBefore(cz, sk);
  }

  window.__skLoadHeureka = loadWidget;
  if (hasConsent()) loadWidget();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addFooterLinks);
  else addFooterLinks();
})();
