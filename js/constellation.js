/**
 * Constellation Background — Final
 * Canvas z-index: -1, white background.
 * Dark-blue dots & lines — clearly visible on white.
 * Sections are transparent so canvas white shows through.
 */
(function () {
    'use strict';

    /* ─── CONFIG ─────────────────────────────────────────── */
    const CFG = {
        maxParticles   : 60,
        density        : 20000,     // 1 dot per N px² — fewer points
        speedRange     : 0.35,
        dotMinR        : 1.5,
        dotMaxR        : 3.0,
        twinkleSpeed   : 0.018,

        connectDist    : 150,
        lineAlphaMax   : 0.30,

        cursorDist     : 200,
        cursorAlphaMax : 0.75,
        repulseForce   : 0.040,
        maxSpeed       : 1.5,
        cursorDotR     : 4,

        // Brand blue #0269CF
        dotRGB         : [2,  105, 207],   // #0269CF
        lineRGB        : [2,  105, 207],   // #0269CF
        cursorLineRGB  : [2,  105, 207],   // #0269CF
        cursorDotRGB   : [2,  105, 207],
    };

    /* ─── CANVAS ──────────────────────────────────────────── */
    const canvas = document.createElement('canvas');
    canvas.id = 'globalConstellationCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
        position      : 'fixed',
        top           : '0',
        left          : '0',
        width         : '100%',
        height        : '100%',
        zIndex        : '-1',
        pointerEvents : 'none',
        background    : '#ffffff',   // white background — canvas IS the page bg
    });

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, particles = [];
    const mouse = { x: -9999, y: -9999, on: false };
    let rafId, paused = false;

    /* ─── HELPERS ─────────────────────────────────────────── */
    const rnd   = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const rgba  = ([r, g, b], a) => `rgba(${r},${g},${b},${a.toFixed(3)})`;

    /* ─── PARTICLES ───────────────────────────────────────── */
    function targetCount() {
        return clamp(Math.floor(W * H / CFG.density), 50, CFG.maxParticles);
    }

    function build() {
        particles = Array.from({ length: targetCount() }, () => {
            const r = rnd(CFG.dotMinR, CFG.dotMaxR);
            return {
                x: rnd(0, W), y: rnd(0, H),
                vx: rnd(-CFG.speedRange, CFG.speedRange),
                vy: rnd(-CFG.speedRange, CFG.speedRange),
                r, base: r, phase: rnd(0, Math.PI * 2),
            };
        });
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        build();
    }

    /* ─── UPDATE ──────────────────────────────────────────── */
    function update(p) {
        p.phase += CFG.twinkleSpeed;
        p.r = p.base + Math.sin(p.phase) * 0.4;

        p.x += p.vx;  p.y += p.vy;

        if (p.x < 0)  { p.x = 0;  p.vx =  Math.abs(p.vx); }
        if (p.x > W)  { p.x = W;  p.vx = -Math.abs(p.vx); }
        if (p.y < 0)  { p.y = 0;  p.vy =  Math.abs(p.vy); }
        if (p.y > H)  { p.y = H;  p.vy = -Math.abs(p.vy); }

        if (mouse.on) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            const rd2 = CFG.cursorDist * CFG.cursorDist;
            if (d2 < rd2 && d2 > 0.01) {
                const d = Math.sqrt(d2);
                const f = (CFG.cursorDist - d) / CFG.cursorDist * CFG.repulseForce;
                p.vx += (dx / d) * f;
                p.vy += (dy / d) * f;
                const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (spd > CFG.maxSpeed) {
                    p.vx = p.vx / spd * CFG.maxSpeed;
                    p.vy = p.vy / spd * CFG.maxSpeed;
                }
            }
        }
    }

    /* ─── DRAW ────────────────────────────────────────────── */
    function draw() {
        // White fill each frame (canvas CSS bg is white, clearRect = transparent)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const n   = particles.length;
        const cd2 = CFG.connectDist * CFG.connectDist;
        const md2 = CFG.cursorDist  * CFG.cursorDist;

        /* particle ↔ particle lines */
        ctx.lineWidth = 0.9;
        for (let i = 0; i < n; i++) {
            const a = particles[i];
            for (let j = i + 1; j < n; j++) {
                const b  = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < cd2) {
                    const t = 1 - Math.sqrt(d2) / CFG.connectDist;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = rgba(CFG.lineRGB, t * t * CFG.lineAlphaMax);
                    ctx.stroke();
                }
            }
        }

        /* cursor ↔ particle lines */
        if (mouse.on) {
            ctx.lineWidth = 1.2;
            for (let i = 0; i < n; i++) {
                const p  = particles[i];
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < md2) {
                    const t = 1 - Math.sqrt(d2) / CFG.cursorDist;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = rgba(CFG.cursorLineRGB, t * t * CFG.cursorAlphaMax);
                    ctx.stroke();
                }
            }

            /* glowing cursor dot */
            const [cr, cg, cb] = CFG.cursorDotRGB;
            const gr = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, CFG.cursorDotR * 5
            );
            gr.addColorStop(0,   `rgba(${cr},${cg},${cb},0.70)`);
            gr.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.20)`);
            gr.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, CFG.cursorDotR * 5, 0, Math.PI * 2);
            ctx.fillStyle = gr;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, CFG.cursorDotR, 0, Math.PI * 2);
            ctx.fillStyle = rgba(CFG.cursorDotRGB, 0.90);
            ctx.fill();
        }

        /* dots */
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = rgba(CFG.dotRGB, 0.75);
            ctx.fill();
        }
    }

    /* ─── LOOP ────────────────────────────────────────────── */
    function loop() {
        if (paused) return;
        for (const p of particles) update(p);
        draw();
        rafId = requestAnimationFrame(loop);
    }

    /* ─── EVENTS ──────────────────────────────────────────── */
    function bindEvents() {
        window.addEventListener('resize', () => {
            cancelAnimationFrame(rafId);
            resize();
            rafId = requestAnimationFrame(loop);
        }, { passive: true });

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.on = false; mouse.x = -9999; mouse.y = -9999;
        });

        window.addEventListener('touchmove', e => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            mouse.on = true;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            mouse.on = false;
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            paused = document.hidden;
            if (!paused) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop); }
        });
    }

    /* ─── INIT ────────────────────────────────────────────── */
    function init() {
        document.body.insertBefore(canvas, document.body.firstChild);
        resize();
        bindEvents();
        rafId = requestAnimationFrame(loop);
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
}());
