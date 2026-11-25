/* ======================================================================
   DATOS DEL EVENTO — para reutilizar con otra clienta, cambiar esto.
   ====================================================================== */
const EVENTO = {
  id: "demo-xv-valentina",
  nombre: "Valentina",
  inicioISO: "2027-03-20T22:00:00-03:00",
  finISO: "2027-03-21T05:00:00-03:00",
  lugar: "Salón Los Aromos",
  direccion: "San Miguel de Tucumán",
  mapsUrl: "",
  mapaBusqueda: "San Miguel de Tucumán",
  // DEMO: las confirmaciones llegan al WhatsApp de Lúmina.
  whatsapp: "5493865690028",
  alias: "valen.xv.demo",
  musica: "", // DEMO sin música: sumar un mp3 con licencia de uso para cada clienta.
  musicaDesde: 0,
  // Extensiones de las imágenes: en una invitación real son fotos .webp
  // (archivo-chica.webp para la miniatura y archivo.webp para el visor).
  fotoChica: ".svg",
  fotoGrande: ".svg",
  programa: [
    ["22:00", "Recepción"],
    ["22:45", "Entrada de la cumpleañera"],
    ["23:15", "Cena"],
    ["00:30", "Vals y brindis"],
    ["01:00", "Fiesta"],
    ["03:00", "Mesa dulce"],
    ["05:00", "Fin de fiesta"],
  ],
  capitulos: [
    { nombre: "Los detalles", fotos: [["detalle-zapatos", 720, 900], ["detalle-ramo", 720, 720], ["detalle-torta", 720, 900]] },
    { nombre: "La noche", fotos: [["noche-luna", 1200, 760], ["noche-copas", 720, 720], ["noche-salon", 1200, 800]] },
    { nombre: "Recuerdos", fotos: [["recuerdo-globos", 720, 900], ["recuerdo-carta", 1080, 860], ["recuerdo-polaroids", 1200, 800]] },
  ],
};

const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Estampillas: un pedacito de cielo pintado ---------- */
function pintarEstampilla(canvas, semilla) {
  Cielo.pintar(canvas, { semilla, estrellas: 2, densidad: 1.6, cerdas: 3, luna: semilla % 2 === 0 });
}
pintarEstampilla($("#estampillaSobre"), 4);

/* ---------- Música ---------- */
const audio = $("#musica");
const botonMusica = $("#botonMusica");
function iniciarMusica() {
  if (!EVENTO.musica) return;
  audio.src = EVENTO.musica;
  audio.addEventListener("loadedmetadata", () => { if (EVENTO.musicaDesde) audio.currentTime = EVENTO.musicaDesde; }, { once: true });
  audio.play().then(() => { botonMusica.hidden = false; })
    .catch(() => { if (!audio.error) { botonMusica.hidden = false; botonMusica.classList.add("pausado"); } });
}
audio.addEventListener("error", () => { botonMusica.hidden = true; }); // sin archivo, sin botón
botonMusica.addEventListener("click", () => {
  if (audio.paused) { audio.play(); botonMusica.classList.remove("pausado"); botonMusica.setAttribute("aria-label", "Pausar música"); }
  else { audio.pause(); botonMusica.classList.add("pausado"); botonMusica.setAttribute("aria-label", "Reproducir música"); }
});

/* ---------- Portada ---------- */
let estelas = null;
function pintarPortada(progresivo) {
  const info = Cielo.pintar($("#cieloPortada"), {
    semilla: 26, estrellas: 9, luna: true, cipres: true, pueblo: true, densidad: 1.05,
    evitar: [0.36, 0.66],
    remolinos: [
      { x: 0.55, y: 0.27, radio: 0.17, fuerza: 1, sentido: 1 },
      { x: 0.3, y: 0.4, radio: 0.12, fuerza: 0.9, sentido: -1 },
      { x: 0.75, y: 0.58, radio: 0.1, fuerza: 0.7, sentido: 1 },
    ],
    progresivo,
    alListo: () => document.body.classList.add("portada-lista"),
  });
  if (estelas) estelas.pausar();
  estelas = reducirMovimiento ? null : Cielo.animarEstelas($("#estelaPortada"), info);
}
new IntersectionObserver(([e]) => {
  if (estelas) e.isIntersecting ? estelas.seguir() : estelas.pausar();
}).observe($("#portada"));

function activarInclinacion() {
  if (reducirMovimiento) return;
  const mov = $("#portadaMov"), rotulo = $("#portadaTexto");
  window.addEventListener("deviceorientation", (ev) => {
    if (ev.gamma == null) return;
    const x = Math.max(-1, Math.min(1, ev.gamma / 30));
    const y = Math.max(-1, Math.min(1, (ev.beta - 45) / 30));
    mov.style.transform = `translate3d(${x * -12}px, ${y * -10}px, 0) scale(1.05)`;
    rotulo.style.translate = `${x * 6}px ${y * 5}px`;
  });
}

/* ---------- Apertura ---------- */
function abrir() {
  const ap = $("#apertura");
  if (ap.classList.contains("abriendo")) return;
  ap.classList.add("abriendo");
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then((r) => { if (r === "granted") activarInclinacion(); }).catch(() => {});
  } else activarInclinacion();
  iniciarMusica();
  // secuencia: lacre (0,45 s) → solapa (0,2–0,95 s) → sale la carta (0,55–1,45 s) → fundido
  setTimeout(() => {
    document.body.classList.remove("cerrada");
    pintarPortada(!reducirMovimiento);
    ap.classList.add("ida");
    setTimeout(() => ap.remove(), 900);
  }, reducirMovimiento ? 150 : 1900);
}
$("#abrirSobre").addEventListener("click", abrir);

if (location.hash && location.hash !== "#portada") {
  $("#apertura").remove();
  document.body.classList.remove("cerrada");
  pintarPortada(false);
}

/* ---------- Cielos de las secciones (se pintan al acercarse) ---------- */
const observarCielo = new IntersectionObserver((entradas) => {
  for (const e of entradas) {
    if (!e.isIntersecting) continue;
    const s = e.target;
    observarCielo.unobserve(s);
    Cielo.pintar($("canvas.cielo", s), {
      semilla: +s.dataset.cielo, estrellas: Math.max(2, Math.round(s.offsetHeight / (+s.dataset.estrellasPor || 220))),
      densidad: 0.9, cerdas: 3, bordes: true, pueblo: !!s.dataset.pueblo, oscuro: 0.15,
    });
  }
}, { rootMargin: "500px 0px" });
$$(".noche[data-cielo]").forEach((s) => observarCielo.observe(s));

let anchoPrevio = window.innerWidth;
window.addEventListener("resize", () => {
  if (Math.abs(window.innerWidth - anchoPrevio) < 40) return; // la barra del navegador no cuenta
  anchoPrevio = window.innerWidth;
  if (!document.body.classList.contains("cerrada")) pintarPortada(false);
  $$(".noche[data-cielo]").forEach((s) => observarCielo.observe(s));
  pintarVestimenta();
});

/* ---------- Aparecer al entrar en pantalla ---------- */
const observarRevelar = new IntersectionObserver((entradas) => {
  for (const e of entradas) if (e.isIntersecting) { e.target.classList.add("visible"); observarRevelar.unobserve(e.target); }
}, { threshold: 0.12 });
$$(".revelar").forEach((el) => observarRevelar.observe(el));

// estampilla de la carta y pincelada azul: se pintan cuando se acercan
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return;
  obs.disconnect();
  pintarEstampilla($("#estampillaCarta"), 9);
}, { rootMargin: "300px 0px" }).observe($("#carta"));
function pintarVestimenta() { Cielo.pincelada($("#muestraAzul"), "#1f3f8f", 7); }
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return;
  obs.disconnect();
  pintarVestimenta();
}, { rootMargin: "300px 0px" }).observe($("#vestimenta"));

/* ---------- Cuenta regresiva ---------- */
(function cuentaRegresiva() {
  const objetivo = new Date(EVENTO.inicioISO).getTime();
  const c = { dias: $('[data-u="dias"]'), horas: $('[data-u="horas"]'), min: $('[data-u="min"]'), seg: $('[data-u="seg"]') };
  const dos = (n) => String(n).padStart(2, "0");
  function tic() {
    let resta = Math.max(0, objetivo - Date.now());
    if (!resta) { $("#contador").innerHTML = '<p class="hoy">¡Es hoy!</p>'; return; }
    const d = Math.floor(resta / 864e5); resta -= d * 864e5;
    const h = Math.floor(resta / 36e5); resta -= h * 36e5;
    const m = Math.floor(resta / 6e4); resta -= m * 6e4;
    c.dias.textContent = dos(d); c.horas.textContent = dos(h);
    c.min.textContent = dos(m); c.seg.textContent = dos(Math.floor(resta / 1e3));
    $("#contadorLector").textContent = `Faltan ${d} días, ${h} horas y ${m} minutos.`;
    setTimeout(tic, 1000 - (Date.now() % 1000));
  }
  tic();
})();

/* ---------- Agendar: siempre Google Calendar ---------- */
(function agendar() {
  const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  $("#botonAgendar").href = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action: "TEMPLATE",
    text: `Mis XV — ${EVENTO.nombre}`,
    dates: `${fmt(EVENTO.inicioISO)}/${fmt(EVENTO.finISO)}`,
    location: `${EVENTO.lugar}, ${EVENTO.direccion}`,
    details: "¡Te espero para festejar mis quince!",
    ctz: "America/Argentina/Tucuman",
  });
})();

/* ---------- Programa ---------- */
$("#programaLista").innerHTML = EVENTO.programa
  .map(([hora, que]) => `<li><time>${hora}</time><span>${que}</span></li>`).join("");
(function estrellaQueBaja() {
  const lista = $("#programaLista"), estrella = $("#lineaEstrella"), items = $$("li", lista);
  let pendiente = false;
  function actualizar() {
    pendiente = false;
    const r = lista.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (window.innerHeight * 0.62 - r.top) / r.height));
    const y = lista.offsetTop + p * r.height;
    estrella.style.transform = `translate3d(0, ${y}px, 0)`;
    items.forEach((li) => li.classList.toggle("encendido", lista.offsetTop + li.offsetTop + 12 <= y));
  }
  window.addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); } }, { passive: true });
  actualizar();
})();

/* ---------- Lugar ---------- */
(function lugar() {
  const q = encodeURIComponent(EVENTO.mapaBusqueda);
  $("#botonComoLlegar").href = EVENTO.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#mapa").src = `https://www.google.com/maps?q=${q}&z=14&output=embed`;
})();

/* ---------- Sala: galería ---------- */
(function galeria() {
  const indice = $("#indiceSala"), cont = $("#capitulos");
  EVENTO.capitulos.forEach((cap, i) => {
    indice.insertAdjacentHTML("beforeend", `<a href="#cap-${i}">${cap.nombre}</a>`);
    const sec = document.createElement("div");
    sec.className = "capitulo";
    sec.id = `cap-${i}`;
    sec.innerHTML = `<div class="capitulo-titulo"><h3>${cap.nombre}</h3><span>${cap.fotos.length} fotos · deslizá</span></div><div class="pared"></div>`;
    const pared = $(".pared", sec);
    cap.fotos.forEach(([archivo, w, h], k) => {
      const b = document.createElement("button");
      b.className = "obra";
      b.setAttribute("aria-label", `${cap.nombre}, foto ${k + 1} de ${cap.fotos.length}`);
      // el marco toma la proporción real de la foto (no se recorta a nadie)
      const ancho = Math.round(232 * (w / h));
      b.innerHTML = `<span class="marco"><span class="marco-lienzo" style="width:${ancho}px"><img src="fotos/${archivo}${EVENTO.fotoChica}" alt="" loading="lazy" decoding="async" width="${ancho}" height="232"></span></span><small>N.º ${k + 1}</small>`;
      b.addEventListener("click", () => abrirVisor(cap.fotos.map((f) => `fotos/${f[0]}${EVENTO.fotoGrande}`), k));
      pared.appendChild(b);
    });
    cont.appendChild(sec);
  });
  $("#fotoRetrato").addEventListener("click", (e) => abrirVisor([e.target.dataset.grande], 0));
})();

/* ---------- Visor ---------- */
const visor = $("#visor"), pista = $("#visorPista"), contador = $("#visorContador");
let totalVisor = 0;
function abrirVisor(srcs, desde) {
  totalVisor = srcs.length;
  pista.innerHTML = srcs.map((s) => `<figure><img src="${s}" alt="" decoding="async"></figure>`).join("");
  visor.showModal();
  pista.scrollLeft = desde * pista.clientWidth;
  actualizarContador();
}
function actualizarContador() {
  contador.textContent = totalVisor > 1 ? `${Math.round(pista.scrollLeft / pista.clientWidth) + 1} de ${totalVisor}` : "";
}
pista.addEventListener("scroll", actualizarContador, { passive: true });
$("#visorCerrar").addEventListener("click", () => visor.close());
visor.addEventListener("click", (e) => { if (e.target === visor || e.target.tagName === "FIGURE") visor.close(); });
(function deslizarParaCerrar() {
  let y0 = null, x0 = 0;
  pista.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; x0 = e.touches[0].clientX; }, { passive: true });
  pista.addEventListener("touchmove", (e) => {
    if (y0 == null) return;
    const dy = e.touches[0].clientY - y0, dx = Math.abs(e.touches[0].clientX - x0);
    if (dy > 0 && dy > dx) pista.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  pista.addEventListener("touchend", (e) => {
    const dy = e.changedTouches[0].clientY - (y0 ?? 0);
    pista.style.transform = "";
    if (dy > 110) visor.close();
    y0 = null;
  });
})();

/* ---------- Confirmación ---------- */
(function confirmacion() {
  const clave = `invite:${EVENTO.id}:rsvp`;
  const inicio = $("#rsvpInicio"), form = $("#rsvpForm"), listo = $("#rsvpListo");
  const leer = () => { try { return JSON.parse(localStorage.getItem(clave) || "null"); } catch { return null; } };
  const guardar = (d) => { try { localStorage.setItem(clave, JSON.stringify(d)); } catch {} };
  const urlWhatsapp = (d) => {
    const cuerpo = d.asiste ? `Confirmo mi asistencia a los XV de ${EVENTO.nombre}.` : `Aviso que no voy a poder ir a los XV de ${EVENTO.nombre}.`;
    return `https://wa.me/${EVENTO.whatsapp}?text=${encodeURIComponent(`¡Hola! Soy ${d.nombre}. ${cuerpo}`)}`;
  };
  function mostrarListo(d) {
    inicio.hidden = true; form.hidden = true; listo.hidden = false;
    $("#rsvpTitulo").textContent = d.asiste ? `¡Gracias, ${d.nombre}!` : `Gracias por avisar, ${d.nombre}`;
    $("#rsvpTexto").textContent = d.asiste ? "Te espero el 26 de diciembre." : "Te vamos a extrañar.";
    $("#rsvpReenviar").href = urlWhatsapp(d);
  }
  function mostrarForm(d) {
    inicio.hidden = true; listo.hidden = true; form.hidden = false;
    if (d) { form.elements.nombre.value = d.nombre; form.elements.asiste.value = d.asiste ? "si" : "no"; }
    form.elements.nombre.focus({ preventScroll: true });
  }
  $("#lacreResponder").addEventListener("click", () => mostrarForm(null));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = { nombre: form.elements.nombre.value.trim(), asiste: form.elements.asiste.value === "si", fecha: new Date().toISOString() };
    if (!d.nombre) return;
    guardar(d);
    window.open(urlWhatsapp(d), "_blank", "noopener");
    mostrarListo(d);
  });
  $("#rsvpEditar").addEventListener("click", () => mostrarForm(leer()));
  const previo = leer();
  if (previo) mostrarListo(previo);
})();

/* ---------- Copiar alias ---------- */
const aviso = $("#aviso");
function avisar(texto) {
  aviso.textContent = texto;
  aviso.classList.add("visible");
  clearTimeout(avisar.t);
  avisar.t = setTimeout(() => aviso.classList.remove("visible"), 2200);
}
$("#copiarAlias").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EVENTO.alias);
    avisar("Alias copiado");
  } catch {
    const r = document.createRange();
    r.selectNodeContents($("#alias"));
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    avisar("Mantené presionado el alias para copiarlo");
  }
});
