/* ======================================================================
   CIELO — pinta con código un cielo al óleo "a lo Van Gogh". No usa ninguna
   imagen del cuadro. Cada pincelada se dibuja como un manojo de cerdas
   (varias líneas finas paralelas, cada una con su tono y su largo), que es
   lo que hace que se lea como pintura y no como un filtro.

   Cielo.pintar(canvas, opciones)  → {campo, W, H, escala}
   Cielo.animarEstelas(canvas, info)
   Cielo.pincelada(canvas, colores) → una sola pincelada gruesa (vestimenta)
   ====================================================================== */
(function () {
  "use strict";

  function azarCon(semilla) {
    let a = semilla >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Paletas mezcladas "en la paleta del pintor": no son colores planos de UI.
  const PROFUNDOS = ["#0c1b3f", "#12265c", "#182f6b", "#1c3778", "#10234f", "#1a2c5e"];
  const MEDIOS = ["#23469a", "#2b55ab", "#335fae", "#3d6cb8", "#2a4f9c", "#4673b4"];
  const CLAROS = ["#6e97cf", "#87abd6", "#a7c3dd", "#c9dbdf", "#9cc0c9", "#7fa7c4"];
  const AMARILLOS = ["#f0c02e", "#f5d35a", "#efe0a6", "#e7a937", "#f7e7a0", "#d99a2b"];
  const CIPRES = ["#0e1b12", "#162818", "#21361d", "#2d4523", "#3a5527", "#4b3a1f", "#1d2d2a"];

  const elegir = (l, azar) => l[Math.floor(azar() * l.length)];

  // aclara/oscurece un color #rrggbb
  function matiz(hex, k) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    if (k > 0) { r += (255 - r) * k; g += (255 - g) * k; b += (255 - b) * k; }
    else { r *= 1 + k; g *= 1 + k; b *= 1 + k; }
    return `rgb(${r | 0},${g | 0},${b | 0})`;
  }

  /* Campo de flujo: corriente horizontal ondulada + remolinos. */
  function crearCampo(remolinos, aspecto) {
    return function (x, y) {
      let vx = 1, vy = 0.35 * Math.sin(y * 9 + x * 4) + 0.22 * Math.sin(x * 13 + y * 2);
      for (const r of remolinos) {
        const dx = (x - r.x) * aspecto, dy = y - r.y;
        const peso = r.fuerza * Math.exp(-(dx * dx + dy * dy) / (r.radio * r.radio));
        vx += -dy * peso * r.sentido * 14;
        vy += dx * peso * r.sentido * 14;
      }
      return Math.atan2(vy, vx);
    };
  }

  /* Pincelada de cerdas sobre una lista de puntos. */
  function cerdas(ctx, azar, pts, ancho, color, n) {
    n = n || 4;
    const paso = ancho / n;
    for (let j = 0; j < n; j++) {
      const off = (j - (n - 1) / 2) * paso + (azar() - 0.5) * paso * 0.6;
      // la cerda de un borde un poco más oscura (sombra), la del otro más clara (luz)
      const k = j === 0 ? -0.22 : j === n - 1 ? 0.2 : (azar() - 0.5) * 0.24;
      ctx.strokeStyle = matiz(color, k);
      ctx.lineWidth = paso * (1.05 + azar() * 0.5);
      // cada cerda arranca y termina en un lugar distinto: puntas irregulares
      const ini = azar() < 0.5 ? 0 : 1;
      const fin = pts.length - (azar() < 0.5 ? 0 : 1);
      if (fin - ini < 2) continue;
      ctx.beginPath();
      for (let i = ini; i < fin; i++) {
        const p = pts[i];
        const x = p[0] + p[2] * off, y = p[1] + p[3] * off;
        i === ini ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  /* Puntos a lo largo del campo, con la normal en cada uno (para las cerdas). */
  function recorrido(campo, W, H, x, y, pasos, paso, giro) {
    const pts = [];
    for (let i = 0; i <= pasos; i++) {
      const a = campo(x / W, y / H) + (giro || 0);
      pts.push([x, y, -Math.sin(a), Math.cos(a)]);
      x += Math.cos(a) * paso;
      y += Math.sin(a) * paso;
    }
    return pts;
  }

  /* Recorrido recto en una dirección dada. */
  function recta(x, y, a, largo, pasos) {
    const pts = [];
    for (let i = 0; i <= pasos; i++) {
      const t = (i / pasos) * largo;
      pts.push([x + Math.cos(a) * t, y + Math.sin(a) * t, -Math.sin(a), Math.cos(a)]);
    }
    return pts;
  }

  /* Arco alrededor de un centro (para estrellas y luna). */
  function arco(cx, cy, r, a0, largo, pasos) {
    const pts = [];
    for (let i = 0; i <= pasos; i++) {
      const t = a0 + (i / pasos) * (largo / r);
      pts.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r, Math.cos(t), Math.sin(t)]);
    }
    return pts;
  }

  /* Estrella: núcleo de empaste y una espiral de toques alrededor. */
  function pintarEstrella(ctx, azar, cx, cy, r, escala) {
    const vueltas = 2.6, toques = Math.floor(26 + r / escala * 1.6);
    const sentido = azar() > 0.5 ? 1 : -1;
    for (let i = toques; i >= 0; i--) {
      const t = i / toques;
      const ang = sentido * t * vueltas * Math.PI * 2 + azar() * 0.5;
      const radio = r * (0.5 + t * 2.1) + (azar() - 0.5) * r * 0.25;
      const paleta = t > 0.72 ? CLAROS : t > 0.4 ? ["#efe0a6", "#c9dbdf", "#f5d35a", "#a7c3dd"] : AMARILLOS;
      const pts = arco(cx, cy, radio, ang, (7 + azar() * 8) * escala, 3);
      cerdas(ctx, azar, pts, (3.4 + azar() * 2.4) * escala, elegir(paleta, azar), 3);
    }
    // núcleo: varios toques cortos encimados, no un círculo perfecto
    for (let i = 0; i < 16; i++) {
      const t = azar() * Math.PI * 2, d = azar() * r * 0.55;
      const pts = recta(cx + Math.cos(t) * d, cy + Math.sin(t) * d, azar() * 6.3, (4 + azar() * 4) * escala, 2);
      cerdas(ctx, azar, pts, (3.5 + azar() * 2) * escala, elegir(["#f7e7a0", "#f5d35a", "#fff3c4", "#f0c02e"], azar), 3);
    }
  }

  /* Luna creciente: halo en espiral + creciente hecho de toques curvos. */
  function pintarLuna(ctx, azar, cx, cy, r, escala) {
    for (let i = 90; i >= 0; i--) {
      const t = i / 90;
      const radio = r * (1.1 + t * 1.5) + (azar() - 0.5) * r * 0.2;
      const pts = arco(cx, cy, radio, azar() * Math.PI * 2, (8 + azar() * 9) * escala, 3);
      cerdas(ctx, azar, pts, (3.6 + azar() * 2.2) * escala, elegir(t > 0.6 ? ["#e7a937", "#f0c02e", "#87abd6", "#d99a2b"] : ["#f5d35a", "#efe0a6", "#e7a937"], azar), 3);
    }
    // creciente: arcos concéntricos desde el borde hacia adentro, solo del lado izquierdo-abajo
    for (let i = 0; i < 70; i++) {
      const radio = r * (0.35 + azar() * 0.65);
      const a0 = Math.PI * (0.35 + azar() * 0.9);
      const pts = arco(cx, cy, radio, a0, (6 + azar() * 9) * escala, 3);
      cerdas(ctx, azar, pts, (3.4 + azar() * 2) * escala, elegir(["#f2b63a", "#f5d35a", "#e8902a", "#f7c95a"], azar), 3);
    }
  }

  /* Ciprés: llama oscura que sube desde abajo. */
  function pintarCipres(ctx, azar, x0, base, alto, ancho, escala) {
    const n = Math.floor((alto * ancho) / (30 * escala * escala));
    for (let i = 0; i < n; i++) {
      const v = Math.pow(azar(), 0.8);
      const mitad = ancho * (1 - Math.pow(v, 1.5)) * (0.5 + 0.5 * Math.sin(v * 3.1 + 0.6));
      const x = x0 + Math.sin(v * 17) * ancho * 0.14 + (azar() * 2 - 1) * mitad;
      const y = base - v * alto;
      const a = -Math.PI / 2 + 0.75 * Math.sin(v * 21 + x * 0.025) + (azar() - 0.5) * 0.5;
      const pts = recta(x, y, a, (10 + azar() * 14) * escala, 3);
      cerdas(ctx, azar, pts, (4 + azar() * 3) * escala, elegir(CIPRES, azar), 3);
    }
  }

  /* Pueblo: lomas, casas con ventanas encendidas y la torre de la iglesia. */
  function pintarPueblo(ctx, azar, W, H, escala) {
    const suelo = H * 0.87;
    for (let i = 0; i < W / escala * 0.8; i++) {
      const x = azar() * W, y = suelo - H * 0.05 + azar() * H * 0.2;
      const pts = recta(x, y, 0.15 * Math.sin((x / W) * 8) + (azar() - 0.5) * 0.25, (12 + azar() * 16) * escala, 3);
      cerdas(ctx, azar, pts, (4 + azar() * 3) * escala, elegir(["#16295a", "#1d3570", "#24407e", "#2b3f5e", "#1f3550"], azar), 3);
    }
    const casas = Math.round(W / (30 * escala));
    for (let i = 0; i < casas; i++) {
      const cw = (16 + azar() * 16) * escala, ch = (12 + azar() * 12) * escala;
      const x = (i / casas) * W + azar() * 10 * escala, y = suelo + azar() * 0.06 * H;
      ctx.fillStyle = elegir(["#1b2747", "#202e52", "#162140"], azar);
      ctx.fillRect(x, y - ch, cw, ch);
      ctx.strokeStyle = "#0b1328"; ctx.lineWidth = 1.4 * escala; ctx.strokeRect(x, y - ch, cw, ch);
      ctx.fillStyle = elegir(["#2b3a5e", "#34466c", "#1a2440", "#3b3a52"], azar);
      ctx.beginPath(); ctx.moveTo(x - 2 * escala, y - ch); ctx.lineTo(x + cw / 2, y - ch - cw * 0.45); ctx.lineTo(x + cw + 2 * escala, y - ch); ctx.closePath(); ctx.fill(); ctx.stroke();
      for (let k = 0; k < 4; k++) {
        const vertical = azar() > 0.5;
        const pts = recta(x + azar() * cw * 0.8, y - azar() * ch, vertical ? -Math.PI / 2 : 0, (vertical ? ch : cw) * 0.6, 2);
        cerdas(ctx, azar, pts, 3 * escala, elegir(["#24345c", "#2e3f68", "#1a2547", "#3a4a70"], azar), 3);
      }
      if (azar() > 0.25) {
        ctx.fillStyle = elegir(AMARILLOS, azar);
        const vw = 3.4 * escala;
        ctx.fillRect(x + cw * 0.25, y - ch * 0.65, vw, vw * 1.2);
        if (cw > 22 * escala) ctx.fillRect(x + cw * 0.62, y - ch * 0.65, vw, vw * 1.2);
      }
    }
    const ix = W * 0.62, iy = suelo + H * 0.02;
    ctx.fillStyle = "#16203c"; ctx.strokeStyle = "#0b1328";
    ctx.fillRect(ix, iy - 26 * escala, 34 * escala, 26 * escala);
    ctx.fillRect(ix + 4 * escala, iy - 46 * escala, 9 * escala, 22 * escala);
    ctx.beginPath(); ctx.moveTo(ix + 3 * escala, iy - 46 * escala); ctx.lineTo(ix + 8.5 * escala, iy - 86 * escala); ctx.lineTo(ix + 14 * escala, iy - 46 * escala); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#f0c02e";
    ctx.fillRect(ix + 20 * escala, iy - 18 * escala, 3.4 * escala, 5 * escala);
  }

  /* ---------- API ---------- */
  function pintar(canvas, op) {
    op = Object.assign({
      semilla: 1, densidad: 1, estrellas: 9, luna: false, cipres: false, pueblo: false,
      remolinos: null, oscuro: 0, progresivo: false, alListo: null, evitar: null, bordes: false, cerdas: 4,
    }, op || {});

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const H = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    const azar = azarCon(op.semilla);
    const escala = dpr * Math.min(1.25, Math.max(0.85, canvas.clientWidth / 420));
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    const aspecto = W / H;

    const remolinos = op.remolinos || [
      { x: 0.3 + azar() * 0.4, y: 0.25 + azar() * 0.3, radio: 0.16, fuerza: 1, sentido: azar() > 0.5 ? 1 : -1 },
      { x: 0.15 + azar() * 0.7, y: 0.55 + azar() * 0.3, radio: 0.11, fuerza: 0.8, sentido: azar() > 0.5 ? 1 : -1 },
    ];
    const campo = crearCampo(remolinos, aspecto);

    // imprimación: el lienzo no arranca blanco, arranca con una capa azul irregular
    ctx.fillStyle = "#132a63"; ctx.fillRect(0, 0, W, H);

    const estrellas = [];
    let intentos = 0;
    while (estrellas.length < op.estrellas && intentos++ < 400) {
      const e = { x: 0.06 + azar() * 0.9, y: 0.05 + azar() * (op.pueblo ? 0.62 : 0.88), r: (5 + azar() * 6) * escala };
      if (op.bordes && e.x < 0.84) continue; // solo sobre el margen derecho: el texto va a la izquierda
      if (op.evitar && e.y > op.evitar[0] && e.y < op.evitar[1] && e.x > 0.1 && e.x < 0.9) continue;
      if (estrellas.some((o) => Math.hypot((o.x - e.x) * aspecto, o.y - e.y) < 0.1)) continue;
      estrellas.push(e);
    }

    const total = Math.floor((W * H) / (78 * escala * escala) * op.densidad);
    const pinceladas = [];
    for (let i = 0; i < total; i++) {
      const x = azar() * W, y = azar() * H;
      let enRemolino = 0;
      for (const r of remolinos) {
        const dx = (x / W - r.x) * aspecto, dy = y / H - r.y;
        enRemolino = Math.max(enRemolino, Math.exp(-(dx * dx + dy * dy) / (r.radio * r.radio * 1.4)));
      }
      const tono = azar() * 0.6 + enRemolino * 0.9 - (y / H) * 0.1;
      const paleta = tono > 0.95 ? CLAROS : tono > 0.45 ? MEDIOS : PROFUNDOS;
      pinceladas.push([x, y, 3 + Math.floor(azar() * 4), (3.4 + azar() * 2.8) * escala, (4.5 + azar() * 4) * escala, elegir(paleta, azar)]);
    }

    function terminar() {
      for (const e of estrellas) pintarEstrella(ctx, azar, e.x * W, e.y * H, e.r, escala);
      if (op.luna) pintarLuna(ctx, azar, W * 0.77, H * 0.12, 24 * escala, escala);
      if (op.pueblo) pintarPueblo(ctx, azar, W, H, escala);
      if (op.cipres) pintarCipres(ctx, azar, W * 0.13, H * 1.02, H * 0.78, 46 * escala, escala);
      if (op.oscuro) { ctx.fillStyle = `rgba(8,16,38,${op.oscuro})`; ctx.fillRect(0, 0, W, H); }
      if (op.alListo) op.alListo();
    }

    const dibujar = (desde, hasta) => {
      for (let i = desde; i < hasta; i++) {
        const p = pinceladas[i];
        cerdas(ctx, azar, recorrido(campo, W, H, p[0], p[1], p[2], p[3]), p[4], p[5], op.cerdas);
      }
    };

    if (!op.progresivo) { dibujar(0, pinceladas.length); terminar(); }
    else {
      pinceladas.sort((a, b) => a[1] - b[1] + (Math.random() - 0.5) * H * 0.5);
      // por tiempo, no por cuadros: en un celular lento termina igual a tiempo
      const n = pinceladas.length, inicio = performance.now(), duracion = 1600;
      let i = 0;
      (function cuadro() {
        const hasta = Math.min(n, Math.ceil(n * (performance.now() - inicio) / duracion));
        dibujar(i, hasta);
        i = hasta;
        if (i < n) requestAnimationFrame(cuadro); else terminar();
      })();
    }
    return { campo, estrellas, remolinos, W, H, escala };
  }

  /* Estelas: el cielo "se mueve" — pocas, lentas y del color del cuadro. */
  function animarEstelas(canvas, info) {
    const W = info.W, H = info.H;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    const N = Math.round(Math.min(140, (W * H) / (5200 * info.escala * info.escala)));
    const colores = ["rgba(201,219,223,.38)", "rgba(135,171,214,.34)", "rgba(239,224,166,.3)"];
    const parts = [];
    const nueva = (p) => {
      p.x = Math.random() * W; p.y = Math.random() * H * 0.8;
      p.vida = 80 + Math.random() * 160; p.c = colores[(Math.random() * colores.length) | 0];
      p.w = (1.6 + Math.random() * 2.2) * info.escala;
      return p;
    };
    for (let i = 0; i < N; i++) nueva(parts[i] = {});
    let activo = true, id = 0, previo = performance.now();
    function cuadro(ahora) {
      if (!activo) return;
      const dt = Math.min(3, (ahora - previo) / 16.7); previo = ahora;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${0.05 * dt})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      const vel = 0.7 * info.escala * dt;
      for (const p of parts) {
        const a = info.campo(p.x / W, p.y / H);
        const nx = p.x + Math.cos(a) * vel, ny = p.y + Math.sin(a) * vel;
        ctx.strokeStyle = p.c; ctx.lineWidth = p.w;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny;
        if ((p.vida -= dt) < 0 || p.x < 0 || p.x > W || p.y < 0 || p.y > H) nueva(p);
      }
      id = requestAnimationFrame(cuadro);
    }
    id = requestAnimationFrame(cuadro);
    return {
      pausar() { activo = false; cancelAnimationFrame(id); },
      seguir() { if (!activo) { activo = true; previo = performance.now(); id = requestAnimationFrame(cuadro); } },
    };
  }

  /* Una pincelada gruesa de un solo color (la muestra del azul reservado). */
  function pincelada(canvas, base, semilla) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(canvas.clientWidth * dpr), H = Math.round(canvas.clientHeight * dpr);
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    const azar = azarCon(semilla || 3);
    ctx.lineCap = "round";
    const grosor = H * 0.5, pasos = 40;
    // 30 cerdas a lo largo de una curva suave, cada una con su carga de pintura
    for (let j = 0; j < 30; j++) {
      const off = (j / 29 - 0.5) * grosor;
      const k = (azar() - 0.5) * 0.5 + (j < 4 ? -0.25 : j > 25 ? 0.25 : 0);
      ctx.strokeStyle = matiz(base, k);
      ctx.lineWidth = (grosor / 30) * (1.4 + azar());
      const carga = 0.72 + azar() * 0.28; // la cerda se queda sin pintura antes del final
      ctx.beginPath();
      for (let i = 0; i <= pasos * carga; i++) {
        const t = i / pasos;
        const x = W * (0.04 + t * 0.92);
        const y = H * 0.5 + Math.sin(t * 5.2 + 0.4) * H * 0.14 + off * (1 - Math.pow(Math.abs(t - 0.45) * 1.5, 3) * 0.6) + (azar() - 0.5) * 0.8;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x + azar() * 6, y);
      }
      ctx.stroke();
    }
  }

  window.Cielo = { pintar, animarEstelas, pincelada, azarCon };
})();
