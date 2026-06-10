    (function () {
      // ---- Language toggle (persisted) ----
      var body = document.body;
      var KEY = "site-lang";
      function applyLang(lang) {
        var isKo = lang === "ko";
        body.classList.toggle("lang-ko", isKo);
        body.classList.toggle("lang-en", !isKo);
        document.documentElement.lang = isKo ? "ko" : "en";
      }
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch (e) {}
      applyLang(saved === "ko" ? "ko" : "en");

      var btn = document.getElementById("langToggle");
      btn.addEventListener("click", function () {
        var next = body.classList.contains("lang-ko") ? "en" : "ko";
        applyLang(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });

      // ---- Profile photo with graceful fallback ----
      var img = document.getElementById("avatarImg");
      var fallback = document.getElementById("avatarFallback");
      var candidates = [
        "assets/images/profile.jpg",
        "assets/images/profile.jpeg",
        "assets/images/profile.png",
        "assets/images/profile.webp"
      ];
      var i = 0;
      img.addEventListener("load", function () {
        img.style.display = "block";
        fallback.style.display = "none";
      });
      img.addEventListener("error", function () {
        if (i < candidates.length) { img.src = candidates[i++]; }
        else { img.style.display = "none"; fallback.style.display = "flex"; }
      });
      img.src = candidates[i++];

      // ---- Footer year ----
      document.getElementById("year").textContent = String(new Date().getFullYear());
    })();
