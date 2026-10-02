/* YOUP, comportamento do site (sem dependências). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var D = window.YOUP;
  var page = document.body.getAttribute("data-page");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ARROW = '<svg class="arrow" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';

  var MENU = [
    ["index.html", "Home", "home"],
    ["quem-somos.html", "Quem Somos", "quem-somos"],
    ["nossa-historia.html", "Nossa História", "cronologia"],
    ["cases.html", "Nossos Cases", "cases"],
    ["atletas.html#atletas", "Atletas", "atletas"],
    ["contato.html", "Contato", "contato"]
  ];

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function caseUrl(c) { return "case.html?c=" + encodeURIComponent(c.slug); }

  /* --- Intro de carregamento --------------------------------------------
     O véu já está no HTML, então não existe piscada de conteúdo. Fica no ar
     até a página carregar (com um mínimo, para não ser um flash), completa a
     linha e sai. Da segunda página em diante na mesma visita, só um véu curto. */
  function intro() {
    var el = document.getElementById("intro");
    if (!el) return;
    var visto = false;
    try { visto = sessionStorage.getItem("youp-intro") === "1"; } catch (e) {}
    var rapida = reduce || visto;
    if (rapida) el.classList.add("intro--rapida");
    document.documentElement.classList.add("intro-ativa");

    function sair() {
      el.classList.add("is-fim");
      document.documentElement.classList.remove("intro-ativa");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 800);
      try { sessionStorage.setItem("youp-intro", "1"); } catch (e) {}
    }

    if (rapida) { setTimeout(sair, reduce ? 0 : 260); return; }

    var piso = 620, t0 = Date.now(), fechou = false;
    function pronto() {
      if (fechou) return;
      fechou = true;
      el.classList.add("is-carregado");
      setTimeout(sair, Math.max(0, piso - (Date.now() - t0)) + 780);
    }
    if (document.readyState === "complete") pronto();
    else window.addEventListener("load", pronto);
    setTimeout(pronto, 2600);
  }

  /* --- Cookies -----------------------------------------------------------
     O site em si só guarda duas coisas no aparelho (a abertura já vista e
     esta escolha). O que de fato pede autorização é o vídeo do YouTube, que
     só carrega depois do sim. Por isso o aviso tem consequência real. */
  function cookies() {
    function lembra(v) { try { localStorage.setItem("youp-cookies", v); } catch (e) {} }
    function lido() { try { return localStorage.getItem("youp-cookies"); } catch (e) { return null; } }

    // Libera um vídeo específico ao clique, sem mudar a escolha guardada.
    document.addEventListener("click", function (e) {
      var botao = e.target.closest && e.target.closest(".yt-espera .btn");
      if (!botao) return;
      var caixa = botao.closest(".yt-espera");
      caixa.outerHTML = iframeYoutube(caixa.getAttribute("data-yt"), caixa.getAttribute("data-titulo"));
    });

    var refazer = document.getElementById("refazer-cookies");
    if (refazer) refazer.addEventListener("click", function () { lembra(""); mostra(); });

    function mostra() {
      if (document.querySelector(".cookies")) return;
      var el = document.createElement("div");
      el.className = "cookies";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-label", "Aviso de cookies");
      el.innerHTML =
        '<div class="wrap cookies__caixa">' +
          '<p class="cookies__texto">Este site guarda no seu aparelho só o essencial para funcionar. Os vídeos de case ficam no YouTube e, para tocar, ele guarda informações suas. ' +
          '<a href="privacidade.html">Ler a política</a>.</p>' +
          '<div class="cookies__acoes">' +
            '<button class="btn" type="button" data-escolha="essencial">Só o essencial</button>' +
            '<button class="btn btn--solid" type="button" data-escolha="tudo">Aceitar os vídeos</button>' +
          "</div>" +
        "</div>";
      document.body.appendChild(el);
      requestAnimationFrame(function () { el.classList.add("is-in"); });
      $$("button", el).forEach(function (b) {
        b.addEventListener("click", function () {
          lembra(b.getAttribute("data-escolha"));
          el.classList.remove("is-in");
          setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
        });
      });
    }

    if (!lido()) setTimeout(mostra, 1400);
  }

  /* --- Header e menu --------------------------------------------------- */
  function header() {
    var cur = page === "case" ? "cases" : page;
    var links = MENU.map(function (m) {
      return '<a href="' + m[0] + '"' + (m[2] === cur ? ' aria-current="page"' : "") + ">" + m[1] + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "site-header";
    h.innerHTML =
      '<div class="wrap">' +
        '<a href="index.html" class="wordmark" aria-label="YOUP, página inicial">youp</a>' +
        '<nav class="nav" aria-label="Principal">' + links + "</nav>" +
        '<button class="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>' +
      "</div>";
    var mm = document.createElement("div");
    mm.className = "mobile-menu grad";
    mm.id = "mobile-menu";
    mm.innerHTML = links + '<span class="eyebrow">You imagine. We create.</span>';
    document.body.prepend(mm);
    document.body.prepend(h);
    var skip = document.createElement("a");
    skip.className = "skip"; skip.href = "#conteudo"; skip.textContent = "Pular para o conteúdo";
    document.body.prepend(skip);

    var burger = $(".burger", h);
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) burger.click();
    });

    var last = 0;
    function onScroll() {
      var y = window.scrollY;
      h.classList.toggle("is-solid", y > 40);
      h.classList.toggle("is-hidden", y > 400 && y > last && !document.body.classList.contains("menu-open"));
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function footer() {
    var c = D.contato;
    var destaques = D.cases.filter(function (x) { return x.ano; }).slice(0, 4);
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML =
      '<div class="wrap">' +
        '<div class="site-footer__topo">' +
          '<p class="site-footer__slogan">You imagine.<br>We create.</p>' +
          '<a class="btn" href="contato.html">Vamos criar juntos ' + ARROW + "</a>" +
        "</div>" +
        '<div class="cols">' +
          "<div><h4>Navegue</h4><ul>" + MENU.map(function (m) { return '<li><a href="' + m[0] + '">' + m[1] + "</a></li>"; }).join("") + "</ul></div>" +
          "<div><h4>O que fazemos</h4><ul>" + D.servicos.map(function (s) {
            return '<li><a href="index.html#servicos-sec">' + s.titulo.replace(/<br>/g, " ") + "</a></li>";
          }).join("") + "</ul></div>" +
          "<div><h4>Cases</h4><ul>" + destaques.map(function (x) {
            return '<li><a href="' + caseUrl(x) + '">' + esc(x.nome) + "</a></li>";
          }).join("") + '<li><a href="cases.html">Todos os cases</a></li></ul></div>' +
          '<div><h4>Contato</h4><ul>' +
            '<li><a href="mailto:' + c.email + '">' + c.email + "</a></li>" +
            '<li class="endereco">' + c.endereco + "</li>" +
            '<li class="redes">' + c.redes.map(function (r) {
              return '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.nome + "</a>";
            }).join(" ") + "</li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="base">' +
          '<span class="wordmark">youp</span>' +
          '<span class="base__nota">Making a difference since 2000</span>' +
          '<span class="base__legal"><a href="privacidade.html">Privacidade e cookies</a>' +
            "<small>© " + new Date().getFullYear() + " YOUP. Todos os direitos reservados.</small></span>" +
        "</div>" +
      "</div>";
    document.body.appendChild(f);
  }

  /* --- Animações ------------------------------------------------------- */
  function reveal() {
    var els = $$("[data-reveal], .split-line");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    // Checagem por posição (funciona em qualquer navegador, inclusive abrindo o arquivo direto do disco).
    var ticking = false;
    function check() {
      var limit = window.innerHeight * .92;
      els = els.filter(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) { e.classList.add("is-in"); return false; }
        return true;
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; setTimeout(check, 16); } }, { passive: true });
    window.addEventListener("resize", check);
    check();
    setTimeout(check, 300);
  }

  function countUp() {
    var els = $$("[data-count]");
    if (!els.length) return;
    function run(el) {
      var to = +el.getAttribute("data-count"), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
      if (reduce) { el.textContent = pre + to + suf; return; }
      var t0 = null, dur = 1800;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + Math.round(to * e) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: .5 });
    els.forEach(function (e) { io.observe(e); });
  }

  // Parallax leve em imagens de fundo
  function parallax() {
    var els = $$("[data-parallax]");
    if (!els.length || reduce) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = "translate3d(0," + (p * -60).toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* --- Manifesto: as palavras acendem com a rolagem ----------------------
     A seção prende na tela e o avanço do scroll vira o quanto da frase já
     acendeu. Com movimento reduzido ou sem JS, a frase fica acesa e parada. */
  function manifesto() {
    var sec = $("[data-manifesto]");
    if (!sec) return;
    var alvo = $(".manifesto__texto", sec);
    var track = $(".manifesto__track", sec), stage = $(".manifesto__stage", sec);
    if (!alvo || reduce) return;

    // Quebra a frase em palavras, cada uma com uma cópia acesa por cima.
    alvo.innerHTML = alvo.textContent.trim().split(/\s+/).map(function (p) {
      var seguro = esc(p);
      return '<span class="pal"><i>' + seguro + "</i>" + seguro + "</span>";
    }).join(" ");
    var luzes = $$(".pal > i", alvo);
    if (!luzes.length) return;

    sec.classList.add("manifesto--pinned");

    var pedindo = false;

    function pintar() {
      var total = track.offsetHeight - stage.offsetHeight;
      if (total <= 0) return;
      var p = Math.min(Math.max(-track.getBoundingClientRect().top / total, 0), 1);
      // Folga no começo e no fim: a frase termina de acender antes de soltar.
      var cursor = p * (luzes.length + 5) - 1.5;
      for (var i = 0; i < luzes.length; i++) {
        var local = Math.min(Math.max(cursor - i, 0), 1);
        luzes[i].style.clipPath = "inset(0 " + ((1 - local) * 100).toFixed(2) + "% 0 0)";
      }
    }

    window.addEventListener("scroll", function () {
      if (pedindo) return;
      pedindo = true;
      requestAnimationFrame(function () { pedindo = false; pintar(); });
    }, { passive: true });
    window.addEventListener("resize", pintar);
    pintar();
  }

  /* --- Linha do tempo da home -------------------------------------------
     O eixo e proporcional ao tempo: 2000 e 2026 ficam a mesma distancia em
     pixels de qualquer outro par de anos com a mesma diferenca. O scroll
     vertical corre o eixo por um marcador fixo no centro; o momento mais
     proximo do marcador manda na foto de fundo, no ano gigante e no texto. */
  function linhaDoTempo() {
    var sec = $("[data-tl]");
    if (!sec) return;
    var track = $(".tl2__track", sec), stage = $(".tl2__stage", sec);
    var eixo = $(".tl2__eixo", sec), fita = $(".tl2__fita", sec), fundo = $(".tl2__fundo", sec);
    var elAno = $(".tl2__ano", sec), elNome = $(".tl2__nome", sec), elChamada = $(".tl2__chamada", sec);

    var itens = cronoItens().map(function (it) {
      var c = it.c;
      return {
        ano: it.ano,
        rotulo: it.marco ? it.ano : anoDe(c),
        nome: it.marco ? it.marco.titulo : c.nome,
        chamada: it.marco ? it.marco.destaques[0] : (c.chamada || (c.destaques || [])[0] || ""),
        foto: it.marco ? "" : YOUP.capa(c),
        href: "nossa-historia.html#" + it.id
      };
    });
    if (itens.length < 2) return;

    var anoMin = itens[0].ano, anoMax = itens[itens.length - 1].ano;
    var vao = Math.max(1, anoMax - anoMin);

    // Fundo: uma foto por momento, trocando por fade. Marco herda a foto anterior.
    var ultimaFoto = "";
    itens.forEach(function (m) {
      if (!m.foto) m.foto = ultimaFoto; else ultimaFoto = m.foto;
    });
    for (var k = itens.length - 2; k >= 0; k--) if (!itens[k].foto) itens[k].foto = itens[k + 1].foto;
    var fotos = [];
    itens.forEach(function (m, i) {
      if (!m.foto) { fotos.push(null); return; }
      var img = document.createElement("img");
      img.src = m.foto; img.alt = ""; img.setAttribute("aria-hidden", "true");
      if (i) img.loading = "lazy";
      fundo.appendChild(img);
      fotos.push(img);
    });

    // Fita: um risco por ano, risco alto e rotulo nos anos que tem momento.
    var porAno = {};
    itens.forEach(function (m, i) { if (porAno[m.ano] === undefined) porAno[m.ano] = i; });
    var html = "", paradaDe = {};
    for (var a = anoMin; a <= anoMax; a++) {
      var pos = ((a - anoMin) / vao * 100).toFixed(4);
      if (porAno[a] !== undefined) {
        var m = itens[porAno[a]];
        paradaDe[a] = porAno[a];
        html += '<li style="left:' + pos + '%"><a class="tl2__parada" href="' + m.href + '" data-i="' + porAno[a] + '">' +
          '<span class="tl2__tick"></span><span class="tl2__rotulo">' + esc(m.rotulo) + "</span></a></li>";
      } else {
        html += '<li style="left:' + pos + '%"><span class="tl2__tick"></span></li>';
      }
    }
    fita.innerHTML = html;
    var paradas = $$(".tl2__parada", fita);

    var larguraFita = 0, dist = 0, preso = false, ativo = -1, pedindo = false, troca = 0;

    function pinta(i) {
      if (i === ativo) return;
      ativo = i;
      var m = itens[i];
      sec.classList.add("is-trocando");
      clearTimeout(troca);
      troca = setTimeout(function () {
        elAno.textContent = m.rotulo;
        elNome.textContent = m.nome;
        elChamada.textContent = m.chamada;
        sec.classList.remove("is-trocando");
      }, reduce ? 0 : 230);
      fotos.forEach(function (img, k) { if (img) img.classList.toggle("is-ativa", k === i); });
      paradas.forEach(function (p) { p.classList.toggle("is-ativa", +p.getAttribute("data-i") === i); });
    }

    function maisPerto(anoFlutuante) {
      var i = 0, melhor = Infinity;
      itens.forEach(function (m, k) {
        var d = Math.abs(m.ano - anoFlutuante);
        if (d < melhor) { melhor = d; i = k; }
      });
      return i;
    }

    function medir() {
      preso = !reduce && window.innerWidth >= 700;
      sec.classList.toggle("tl2--pinned", preso);
      var px = parseFloat(getComputedStyle(sec).getPropertyValue("--px-ano")) || 120;
      larguraFita = vao * px;
      fita.style.width = larguraFita + "px";
      if (!preso) {
        track.style.height = "";
        fita.style.transform = "";
        fita.style.left = "0";
        pinta(0);
        return;
      }
      fita.style.left = "50%";
      dist = larguraFita;
      track.style.height = stage.offsetHeight + dist + "px";
      mover();
    }

    function mover() {
      if (!preso || !dist) return;
      var p = Math.min(Math.max(-track.getBoundingClientRect().top / dist, 0), 1);
      fita.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
      pinta(maisPerto(anoMin + p * vao));
    }

    // Teclado: focar uma parada fora da tela rola a pagina ate centraliza-la.
    fita.addEventListener("focusin", function (e) {
      if (!preso || !dist) return;
      var alvo = e.target.closest && e.target.closest(".tl2__parada");
      if (!alvo) return;
      var p = Math.min(Math.max((itens[+alvo.getAttribute("data-i")].ano - anoMin) / vao, 0), 1);
      window.scrollTo({ top: track.getBoundingClientRect().top + window.pageYOffset + p * dist, behavior: "instant" });
    });

    window.addEventListener("scroll", function () {
      if (pedindo) return;
      pedindo = true;
      requestAnimationFrame(function () { pedindo = false; mover(); });
    }, { passive: true });
    window.addEventListener("resize", medir);
    window.addEventListener("orientationchange", medir);
    window.addEventListener("load", medir);
    medir();
    setTimeout(medir, 400);
  }

  /* --- Componentes ----------------------------------------------------- */
  // Rótulo de ano do case: usa o período (ex.: "2015-2024") quando houver
  function anoDe(c) { return c.periodo || c.ano || ""; }

  // Prévia em vídeo do card: montada a partir das fotos do próprio case.
  function previaDe(c) { return c.fotos ? "assets/media/previa/" + c.slug + ".mp4" : ""; }

  function card(c, extra) {
    return '<a class="card ' + (extra || "") + (c.logoSombra ? " card--sombra-topo" : "") + '" href="' + caseUrl(c) + '">' +
      (YOUP.capa(c) ? '<img class="card__img" src="' + YOUP.capa(c) + '" alt="' + esc(c.nome) + '" loading="lazy"' + (c.pos ? ' style="object-position:' + c.pos + '"' : "") + '>' : '<div class="card__img grad"></div>') +
      (previaDe(c) ? '<video class="card__previa" muted loop playsinline preload="none" tabindex="-1" aria-hidden="true" data-previa="' + previaDe(c) + '"></video>' : "") +
      (c.logo ? '<img class="card__logo" src="' + c.logo + '" alt="" loading="lazy">' : "") +
      '<div class="card__body"><div><span class="card__year">' + anoDe(c) + '</span><h3 class="card__name">' + esc(c.nome) + '</h3><p class="card__sub">' + esc(c.chamada) + "</p></div>" +
      '<span class="card__go">' + ARROW + "</span></div></a>";
  }

  /* Um vídeo pode ser um arquivo do próprio site ("assets/.../x.mp4") ou um
     ID de 11 caracteres do YouTube. O código reconhece qual é dos dois. */
  function ehYoutube(v) { return /^[A-Za-z0-9_-]{11}$/.test(v); }

  function consentiuVideo() {
    try { return localStorage.getItem("youp-cookies") === "tudo"; } catch (e) { return false; }
  }

  function iframeYoutube(v, titulo) {
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + v + '?rel=0&autoplay=1" title="' + esc(titulo || "Vídeo") +
      '" loading="lazy" allow="autoplay; accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  }

  function playerDe(v, cartaz, titulo) {
    if (ehYoutube(v)) {
      if (consentiuVideo()) return iframeYoutube(v, titulo);
      // Sem autorização o vídeo não carrega: fica a capa e um botão.
      return '<div class="yt-espera" data-yt="' + v + '" data-titulo="' + esc(titulo || "Vídeo") + '">' +
        (cartaz ? '<img src="' + cartaz + '" alt="" loading="lazy">' : "") +
        '<div class="yt-espera__aviso">' +
          "<p>O vídeo está no YouTube, que guarda informações no seu navegador para tocar.</p>" +
          '<button class="btn" type="button">Carregar o vídeo ' + ARROW + "</button>" +
          '<a class="yt-espera__link" href="privacidade.html">Como tratamos isso</a>' +
        "</div></div>";
    }
    return '<video controls playsinline preload="none"' + (cartaz ? ' poster="' + cartaz + '"' : "") +
      '><source src="' + v + '" type="video/mp4"></video>';
  }

  /* Ao passar o mouse (ou chegar pelo teclado) no card, a foto dá lugar à
     prévia em vídeo daquele case. O arquivo só é baixado no primeiro hover,
     então quem não passa o mouse não paga por ele. No toque não há hover,
     então nada é baixado no celular. */
  function previaDosCards() {
    if (reduce) return;
    function liga(card) {
      var v = $(".card__previa", card);
      if (!v) return;
      if (!v.getAttribute("src")) v.setAttribute("src", v.getAttribute("data-previa"));
      card.classList.add("is-previa");
      v.play().catch(function () { card.classList.remove("is-previa"); });
    }
    function desliga(card) {
      var v = $(".card__previa", card);
      if (!v) return;
      card.classList.remove("is-previa");
      v.pause();
    }
    document.addEventListener("mouseover", function (e) {
      var c = e.target.closest && e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) liga(c);
    });
    document.addEventListener("mouseout", function (e) {
      var c = e.target.closest && e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) desliga(c);
    });
    document.addEventListener("focusin", function (e) {
      var c = e.target.closest && e.target.closest(".card");
      if (c) liga(c);
    });
    document.addEventListener("focusout", function (e) {
      var c = e.target.closest && e.target.closest(".card");
      if (c) desliga(c);
    });
  }

  // Ver. Ouvir. Sentir.: usado na home e em Quem Somos
  // Cada serviço tem um espaço de vídeo (veja o comentário em data.js).
  function espacoDeVideo(s, i) {
    var cartaz = s.videoPoster || "";
    if (!s.video) {
      return '<div class="video-espaco video-espaco--vazio"><span>Vídeo em breve</span></div>';
    }
    if (ehYoutube(s.video)) {
      return '<div class="video-espaco"><iframe src="https://www.youtube-nocookie.com/embed/' + s.video +
        '?rel=0" title="' + esc(s.verbo) + '" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
    }
    return '<div class="video-espaco"><video muted loop playsinline preload="none"' +
      (cartaz ? ' poster="' + cartaz + '"' : "") + '><source src="' + s.video + '" type="video/mp4"></video></div>';
  }

  function servicos() {
    var el = $("#servicos");
    if (!el) return;
    el.innerHTML = D.servicos.map(function (s, i) {
      return '<article class="servico" id="servico-' + i + '" data-reveal>' +
        espacoDeVideo(s, i) +
        '<div class="servico__texto">' +
          '<span class="servico__verbo">' + s.verbo + "</span>" +
          "<h3>" + s.titulo + "</h3>" +
          '<p class="chamada">' + s.chamada + "</p>" +
          '<p class="muted">' + s.texto + "</p>" +
          (s.nota ? '<p class="nota">' + s.nota + "</p>" : "") +
        "</div></article>";
    }).join("");

    // Índice fixo: acompanha qual serviço está na tela e leva até ele.
    var indice = $("#servicos-indice");
    if (!indice) return;
    indice.innerHTML = D.servicos.map(function (s, i) {
      return '<a href="#servico-' + i + '" data-i="' + i + '">' + s.verbo + "</a>";
    }).join("");
    var links = $$("a", indice), blocos = $$(".servico", el);
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          var k = blocos.indexOf(e.target);
          links.forEach(function (a, n) { a.classList.toggle("is-ativo", n === k); });
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      blocos.forEach(function (b) { io.observe(b); });
    }
    // O vídeo só toca quando aparece, e para quando sai.
    if (window.IntersectionObserver) {
      var iov = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) v.play().catch(function () {}); else v.pause();
        });
      }, { threshold: .3 });
      $$("video", el).forEach(function (v) { iov.observe(v); });
    }
  }

  function heroSlideshow() {
    var media = $(".hero__media");
    if (!media) return;
    // Vídeo de fundo: basta preencher heroVideo no data.js. No celular e com
    // movimento reduzido fica a foto, que é mais leve e não gasta dados.
    if (D.heroVideo) {
      var cartaz = D.heroVideoPoster || YOUP.capa(YOUP.destaque());
      if (reduce || window.innerWidth < 700) {
        media.innerHTML = '<img src="' + cartaz + '" alt="">';
        return;
      }
      media.innerHTML = '<video autoplay muted loop playsinline preload="metadata" poster="' + cartaz + '"><source src="' + D.heroVideo + '" type="video/mp4"></video>';
      var vid = $("video", media);
      // Fora da tela ou aba escondida, o vídeo para: não roda à toa.
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) vid.pause(); else vid.play().catch(function () {});
      });
      if (window.IntersectionObserver) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) vid.play().catch(function () {}); else vid.pause(); });
        }, { threshold: .05 }).observe(media);
      }
      return;
    }
    // O case em destaque abre o slideshow; os demais seguem na ordem de data.js
    var dest = YOUP.destaque();
    var slides = [dest].concat(D.cases.filter(function (c) { return c !== dest; })).filter(function (c) { return c.fotos > 0; }).slice(0, 5);
    media.innerHTML = slides.map(function (c, i) {
      return '<div class="hero__slide' + (i === 0 ? " is-active" : "") + '"><img src="' + YOUP.capa(c) + '" alt="' + esc(c.nome) + '"' + (c.posHeroCel ? ' style="--pos-cel:' + c.posHeroCel + '"' : "") + (i ? ' loading="lazy"' : "") + "></div>";
    }).join("");
    var cap = $(".hero__caption");
    var dots = $(".hero__dots");
    dots.innerHTML = slides.map(function (c, i) { return '<button aria-label="' + esc(c.nome) + '"' + (i === 0 ? ' class="is-active"' : "") + "></button>"; }).join("");
    var idx = 0, timer;
    function go(n) {
      var s = $$(".hero__slide", media), d = $$("button", dots);
      s[idx].classList.remove("is-active"); d[idx].classList.remove("is-active");
      idx = (n + s.length) % s.length;
      s[idx].classList.add("is-active"); void d[idx].offsetWidth; d[idx].classList.add("is-active");
      var c = slides[idx];
      cap.innerHTML = '<strong>' + anoDe(c) + " · " + esc(c.nome) + "</strong>" + esc(c.chamada) + ' <a class="link-arrow" href="' + caseUrl(c) + '" style="margin-top:.6rem">Ver case ' + ARROW + "</a>";
      clearTimeout(timer);
      if (!reduce) timer = setTimeout(function () { go(idx + 1); }, 6000);
    }
    $$("button", dots).forEach(function (b, i) { b.addEventListener("click", function () { go(i); }); });
    idx = 0; go(0);
  }

  function railControls() {
    $$("[data-rail]").forEach(function (wrap) {
      var rail = $(".rail", wrap);
      $$("[data-dir]", wrap).forEach(function (b) {
        b.addEventListener("click", function () {
          rail.scrollBy({ left: +b.getAttribute("data-dir") * rail.clientWidth * .8, behavior: reduce ? "auto" : "smooth" });
        });
      });
    });
  }

  function lightbox(imgs, alts) {
    var i = 0, box;
    function show() { var img = $("img", box); img.src = imgs[i]; img.alt = (alts && alts[i]) || ""; }
    function close() { box.remove(); document.removeEventListener("keydown", key); }
    function key(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") { i = (i + 1) % imgs.length; show(); }
      if (e.key === "ArrowLeft") { i = (i - 1 + imgs.length) % imgs.length; show(); }
    }
    return function open(n) {
      i = n;
      box = document.createElement("div");
      box.className = "lightbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
      box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Fechar">✕</button><button class="lb-prev" aria-label="Anterior">←</button><button class="lb-next" aria-label="Próxima">→</button>';
      document.body.appendChild(box);
      show();
      $(".lb-close", box).onclick = close;
      $(".lb-prev", box).onclick = function () { key({ key: "ArrowLeft" }); };
      $(".lb-next", box).onclick = function () { key({ key: "ArrowRight" }); };
      box.addEventListener("click", function (e) { if (e.target === box) close(); });
      // Swipe no celular
      var x0 = null;
      box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      box.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 40) key({ key: dx < 0 ? "ArrowRight" : "ArrowLeft" });
      });
      document.addEventListener("keydown", key);
      $(".lb-close", box).focus();
    };
  }

  // Card de atleta (reutilizável: novos atletas entram em data.js)
  var IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>';
  function athleteCard(a, i) {
    return '<article class="at-card" data-reveal data-reveal-delay="' + (i % 2) + '">' +
      (a.foto
        ? '<img class="at-card__photo" src="' + a.foto + '" alt="' + esc(a.alt || a.nome) + '" loading="lazy"' + (a.pos ? ' style="object-position:' + a.pos + '"' : "") + ">"
        : '<div class="at-card__placeholder grad"><span>Foto em breve</span></div>') +
      '<div class="at-card__body"><span class="at-card__meta">' + esc(a.pais) + " · " + esc(a.modalidade) + "</span>" +
      '<h3 class="at-card__name">' + esc(a.nome) + "</h3>" +
      '<div class="at-card__reveal"><div><p class="at-card__bio">' + (/^\[PREENCHER/.test(a.bio) ? '<span class="at-fill">' + esc(a.bio) + "</span>" : esc(a.bio)) + "</p></div></div>" +
      (a.instagram
        ? '<a class="at-card__ig" href="https://www.instagram.com/' + a.instagram + '/" target="_blank" rel="noopener" aria-label="Instagram de ' + esc(a.nome) + '">' + IG + "@" + esc(a.instagram) + "</a>"
        : '<span class="at-card__ig">' + IG + '<span class="at-fill">[PREENCHER: @instagram]</span></span>') +
      "</div></article>";
  }

  /* Marcos, cases e projetos da história em ordem de ano, com o mesmo id
     usado na página de Nossa História (serve de âncora para a home). */
  function cronoItens() {
    var items = D.marcos.map(function (m) { return { ano: m.ano, marco: m }; })
      .concat(D.cases.filter(function (c) { return c.ano; }).map(function (c) { return { ano: c.ano, c: c }; }))
      // Projetos da história: mesma apresentação, sem link para página de case
      .concat((D.historia || []).map(function (c) { return { ano: c.ano, c: c, semCase: true }; }))
      .sort(function (a, b) { return a.ano - b.ano || (a.marco ? -1 : 1); });
    var usados = {};
    items.forEach(function (it) {
      it.id = "ano-" + it.ano + (usados[it.ano] ? "-" + usados[it.ano] : "");
      usados[it.ano] = (usados[it.ano] || 0) + 1;
    });
    return items;
  }

  /* --- Andaime de produção ------------------------------------------------
     Nada de [PREENCHER], [A CONFIRMAR] ou [NOME DO FOTÓGRAFO] na tela do
     visitante: o bloco inteiro some, junto com o rótulo que o acompanha. O
     texto segue no arquivo, então basta preencher para ele voltar sozinho. */
  function pendencias() {
    var pendente = /\[[A-ZÀ-Ý][A-ZÀ-Ý\s]{2,}/;
    var BLOCOS = "p, h1, h2, h3, h4, li, dd, dt, figcaption, .at-card__ig, .at-credit";

    function esconde(el) {
      if (!el || el === document.body || el.id === "conteudo") return;
      el.hidden = true;
      if (el.tagName === "DD" || el.tagName === "DT") {
        var par = el.tagName === "DD" ? el.previousElementSibling : el.nextElementSibling;
        if (par && (par.tagName === "DT" || par.tagName === "DD")) par.hidden = true;
      }
      somePraCima(el.parentElement);
    }

    function somePraCima(el) {
      if (!el || el === document.body || el.id === "conteudo") return;
      if ($("img, video, svg", el)) return;
      var sobrou = Array.prototype.some.call(el.children, function (f) { return !f.hidden; });
      if (!sobrou && el.textContent.replace(/\s+/g, "") === "") { el.hidden = true; somePraCima(el.parentElement); }
    }

    $$("[class*='fill']").forEach(function (el) {
      if (pendente.test(el.textContent)) esconde(el.closest(BLOCOS) || el);
    });
    $$(BLOCOS).forEach(function (el) {
      if (!el.hidden && pendente.test(el.textContent)) esconde(el);
    });
  }

  /* --- Páginas --------------------------------------------------------- */
  var pages = {
    home: function () {
      heroSlideshow();
      manifesto();
      servicos();
      $("#numeros").classList.toggle("numbers--5", D.numeros.length === 5);
      $("#numeros").innerHTML = D.numeros.map(function (n, i) {
        return '<div data-reveal data-reveal-delay="' + i + '"><span class="n" data-count="' + n.valor + '" data-prefix="' + (n.prefixo || "") + '" data-suffix="' + n.sufixo + '">' + (n.prefixo || "") + n.valor + n.sufixo + '</span><span class="l">' + n.rotulo + "</span></div>";
      }).join("");
      var dest = YOUP.destaque();
      $("#destaque").innerHTML =
        '<div class="feature__media"><img src="' + YOUP.capa(dest) + '" alt="' + esc(dest.nome) + '" loading="lazy"' + (dest.pos ? ' style="object-position:' + dest.pos + '"' : "") + "></div>" +
        '<div class="wrap feature__body">' +
          '<img class="feature__logo" src="' + dest.logo + '" alt="Red Bull Building Drop" loading="lazy" data-reveal>' +
          '<h2 class="display-l feature__titulo" data-reveal data-reveal-delay="1">' + esc(dest.nome) + "</h2>" +
          '<p class="feature__sub" data-reveal data-reveal-delay="1">' + esc(dest.chamada) + "</p>" +
          '<ul class="feature__marcas" data-reveal data-reveal-delay="2">' +
            dest.destaques.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") +
          "</ul>" +
          '<a class="btn" href="' + caseUrl(dest) + '" data-reveal data-reveal-delay="3">Ver o case ' + ARROW + "</a>" +
        "</div>";
      $("#rail").innerHTML = D.cases.map(function (c) { return card(c); }).join("");
      railControls();
      linhaDoTempo();
    },

    cronologia: function () {
      var items = cronoItens();
      $("#timeline").innerHTML = items.map(function (it) {
        if (it.marco) {
          var m = it.marco;
          return '<section class="tl-item tl-item--marco grad--dark" id="' + it.id + '"><div class="wrap">' +
            '<div data-reveal><span class="tl-year">' + m.ano + '</span><h2 class="display-s">' + esc(m.titulo) + "</h2></div>" +
            '<ul class="bullets" data-reveal data-reveal-delay="1">' + m.destaques.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div></section>";
        }
        var c = it.c;
        return '<section class="tl-item' + (YOUP.capa(c) ? "" : " grad") + '" id="' + it.id + '">' + (YOUP.capa(c) ? '<div class="tl-item__bg"><img src="' + YOUP.capa(c) + '" alt="" loading="lazy" data-parallax></div>' : "") + '<div class="wrap">' +
          '<div data-reveal>' + (c.logo ? '<img class="logo-ev" src="' + c.logo + '" alt="' + esc(c.nome) + '" loading="lazy">' : "") +
          '<span class="tl-year">' + c.ano + '</span><h2 class="display-s">' + esc(c.nome) + "</h2></div>" +
          '<div data-reveal data-reveal-delay="1"><ul class="bullets">' + c.destaques.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
          (it.semCase ? "" : '<a class="link-arrow" href="' + caseUrl(c) + '">Ver o case ' + ARROW + "</a>") + "</div></div></section>";
      }).join("");
      var nav = $("#tl-nav");
      nav.innerHTML = items.map(function (it) { return '<a href="#' + it.id + '">' + it.ano + "</a>"; }).join("");
      var links = $$("a", nav);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      $$(".tl-item").forEach(function (s) { io.observe(s); });
      var tl = $("#timeline");
      window.addEventListener("scroll", function () {
        var r = tl.getBoundingClientRect();
        nav.classList.toggle("is-visible", r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2);
      }, { passive: true });
    },

    cases: function () {
      // O case em destaque abre a grade (card grande); os demais seguem na ordem de data.js
      var dest = YOUP.destaque();
      var lista = [dest].concat(D.cases.filter(function (c) { return c !== dest; }));
      $("#cases-grid").innerHTML = lista.map(function (c) { return card(c); }).join("");
      $$("#cases-grid .card").forEach(function (el, i) {
        el.setAttribute("data-reveal", "");
        el.setAttribute("data-reveal-delay", i % 2);
      });
    },

    case: function () {
      var slug = new URLSearchParams(location.search).get("c");
      var i = 0;
      D.cases.forEach(function (c, k) { if (c.slug === slug) i = k; });
      var c = D.cases[i];
      var prev = D.cases[(i - 1 + D.cases.length) % D.cases.length];
      var next = D.cases[(i + 1) % D.cases.length];
      var fotos = YOUP.fotosDo(c);
      document.title = c.nome + (c.ano ? " (" + anoDe(c) + ")" : "") + " · YOUP";
      var desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", c.chamada + " " + c.destaques.join(" · "));
      // Marca visualmente o que ainda precisa de revisão
      function txt(t) { return esc(t).replace(/\[A CONFIRMAR[^\]]*\]/g, function (m) { return '<span class="fill">' + m + "</span>"; }); }
      function bloco(titulo, paragrafos) {
        return '<div class="case-block" data-reveal><h2 class="eyebrow">' + titulo + '</h2><div>' +
          paragrafos.map(function (p) { return "<p>" + txt(p) + "</p>"; }).join("") + "</div></div>";
      }
      function pagerImg(x) { return YOUP.capa(x) ? '<img src="' + YOUP.capa(x) + '" alt="" loading="lazy">' : ""; }

      $("#case").innerHTML =
        '<section class="page-hero page-hero--img' + (fotos.length ? "" : " grad") + '">' +
          (fotos.length ? '<div class="page-hero__bg"><img src="' + fotos[0] + '" alt="' + esc(c.nome) + '"></div>' : "") + '<div class="wrap">' +
          (c.logo ? '<img src="' + c.logo + '" alt="" style="max-width:190px;max-height:130px;width:auto;margin-bottom:2rem" data-reveal>' : "") +
          '<span class="eyebrow" data-reveal>' + (c.ano ? anoDe(c) + " · " : "") + esc(c.subtitulo) + '</span><h1 class="display-l"><span class="split-line"><span>' + esc(c.nome) + "</span></span></h1></div></section>" +
        '<section class="section"><div class="wrap">' +
          '<dl class="meta" data-reveal>' + (c.meta || []).map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + txt(m[1]) + "</dd></div>"; }).join("") + "</dl>" +
          '<div class="case-intro"><div data-reveal><p class="statement">' + esc(c.chamada) + "</p>" +
            (c.texto ? '<p class="lead muted" style="margin-top:2rem">' + txt(c.texto) + "</p>" : "") + "</div>" +
          '<ul class="stat-list" data-reveal data-reveal-delay="1">' + c.destaques.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div>" +
          (c.desafio ? '<div class="case-story">' +
            bloco("O desafio", [c.desafio]) +
            bloco(c.entregaTitulo || "A entrega da YOUP", c.entrega || []) +
            (c.resultado ? bloco("O resultado", [c.resultado]) : "") + "</div>" : "") +
        "</div></section>" +
        (c.citacao ? '<section class="section--tight"><div class="wrap"><figure class="case-quote" data-reveal><blockquote>“' + esc(c.citacao.texto) + '”</blockquote><figcaption>' + esc(c.citacao.autor) + "</figcaption></figure></div></section>" : "") +
        (c.video ? '<section class="section--tight"><div class="wrap"><div class="video-block" data-reveal>' + playerDe(c.video, fotos[0] || "", c.nome) + "</div>" +
          (c.videoCredito ? '<p class="video-credito">Vídeo: ' + esc(c.videoCredito) + "</p>" : "") + "</div></section>" : "") +
        (fotos.length > 1 ? '<section class="section--tight" style="padding-top:0"><div class="wrap"><div class="mosaic">' +
          fotos.slice(1).map(function (f, k) { return '<figure data-reveal data-idx="' + (k + 1) + '"><img src="' + f + '" alt="' + esc(c.nome) + ", foto " + (k + 2) + '" loading="lazy"></figure>'; }).join("") +
        "</div></div></section>" : "") +
        (fotos.length ? "" : '<section class="section--tight" style="padding-top:0"><div class="wrap"><p class="muted" data-reveal>Fotos em breve.</p></div></section>') +
        '<section class="section--tight"><div class="wrap" style="display:flex;justify-content:flex-end"><div class="signature"><span class="eyebrow">Making a difference since 2000</span><span class="wordmark" style="font-size:3.2rem">youp</span></div></div></section>' +
        '<nav class="pager" aria-label="Outros cases">' +
          '<a href="' + caseUrl(prev) + '">' + pagerImg(prev) + '<span class="eyebrow">← Case anterior</span><span class="display-s" style="margin-top:.6rem">' + esc(prev.nome) + "</span></a>" +
          '<a href="' + caseUrl(next) + '">' + pagerImg(next) + '<span class="eyebrow">Próximo case →</span><span class="display-s" style="margin-top:.6rem">' + esc(next.nome) + "</span></a>" +
        "</nav>";
      var open = lightbox(fotos);
      $$(".mosaic figure").forEach(function (f) {
        f.setAttribute("tabindex", "0");
        f.addEventListener("click", function () { open(+f.getAttribute("data-idx")); });
        f.addEventListener("keydown", function (e) { if (e.key === "Enter") open(+f.getAttribute("data-idx")); });
      });
    },

    "quem-somos": function () {
      servicos();
    },

    atletas: function () {
      $("#at-cards").innerHTML = D.atletas.map(athleteCard).join("");
      var figs = $$("#at-galeria figure");
      var open = lightbox(figs.map(function (f) { return $("img", f).src; }), figs.map(function (f) { return $("img", f).alt; }));
      figs.forEach(function (f, k) {
        f.setAttribute("tabindex", "0"); f.setAttribute("role", "button");
        f.addEventListener("click", function () { open(k); });
        f.addEventListener("keydown", function (e) { if (e.key === "Enter") open(k); });
      });
    },

    contato: function () {
      var c = D.contato;
      $("#contato-info").innerHTML =
        "<dt>E-mail</dt><dd><a href=\"mailto:" + c.email + '">' + c.email + "</a></dd>" +
        (c.telefone ? "<dt>Telefone</dt><dd>" + esc(c.telefone) + "</dd>" : "") +
        "<dt>Endereço</dt><dd>" + c.endereco + "</dd>" +
        "<dt>Redes</dt><dd>" + c.redes.map(function (r) { return '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.nome + "</a>"; }).join(" · ") + "</dd>";

      var form = $("#form-contato");
      var status = $(".form-status", form);
      var erro = $(".carta__erro", form);
      var campos = $$("input, textarea", form);

      // As lacunas crescem com o que a pessoa escreve, para a frase não quebrar.
      function ajusta(inp) {
        if (inp.tagName !== "INPUT") return;
        // Vazia, a lacuna tem exatamente a largura da dica; cheia, cresce com o texto.
        var minimo = (inp.placeholder || "").length || 10;
        inp.style.width = Math.max(minimo, inp.value.length + 1) + "ch";
      }
      campos.forEach(function (inp) {
        ajusta(inp);
        inp.addEventListener("input", function () {
          ajusta(inp);
          if (inp.getAttribute("aria-invalid")) { inp.removeAttribute("aria-invalid"); erro.textContent = ""; }
        });
      });

      var NOME = { nome: "seu nome", email: "seu e-mail", mensagem: "sua mensagem" };

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var faltando = [], primeiro = null;
        campos.forEach(function (inp) { inp.removeAttribute("aria-invalid"); });
        campos.forEach(function (inp) {
          var ruim = "";
          if (inp.required && !inp.value.trim()) ruim = NOME[inp.name] || inp.name;
          else if (inp.type === "email" && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) ruim = "um e-mail válido";
          if (!ruim) return;
          inp.setAttribute("aria-invalid", "true");
          inp.setAttribute("aria-describedby", "carta-erro");
          faltando.push(ruim);
          if (!primeiro) primeiro = inp;
        });
        if (faltando.length) {
          erro.textContent = "Falta " + (faltando.length > 1
            ? faltando.slice(0, -1).join(", ") + " e " + faltando[faltando.length - 1]
            : faltando[0]) + ".";
          primeiro.focus();
          return;
        }
        erro.textContent = "";

        var d = new FormData(form);
        var endpoint = form.getAttribute("data-endpoint");
        if (!endpoint) {
          // Sem serviço de envio configurado: abre o e-mail com a mensagem pronta.
          var linhas = [["Nome", d.get("nome")], ["Empresa", d.get("empresa")], ["E-mail", d.get("email")], ["Telefone", d.get("telefone")]]
            .filter(function (l) { return String(l[1] || "").trim(); })
            .map(function (l) { return l[0] + ": " + l[1]; }).join("\n");
          location.href = "mailto:" + c.email + "?subject=" + encodeURIComponent("Contato pelo site: " + d.get("nome")) +
            "&body=" + encodeURIComponent(linhas + "\n\n" + d.get("mensagem"));
          status.textContent = "Se o seu programa de e-mail não abrir, escreva direto para " + c.email + ".";
          return;
        }
        status.textContent = "Enviando…";
        fetch(endpoint, { method: "POST", body: d, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw 0;
            form.reset();
            campos.forEach(ajusta);
            status.textContent = "Mensagem enviada. Obrigado, respondemos em breve.";
          })
          .catch(function () { status.textContent = "Não foi possível enviar agora. Escreva para " + c.email + "."; });
      });
    }
  };

  intro();
  header();
  if (pages[page]) pages[page]();
  pendencias();
  footer();
  cookies();
  previaDosCards();
  reveal();
  countUp();
  parallax();
})();
