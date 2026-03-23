/**
 * Beams Collision Background
 * Pure black · thin vertical beams · color #037FFC · smooth 60fps
 * Supports multiple .page-header elements on one page.
 */
(function () {
    'use strict';

    /* ── #037FFC helpers ──────────────────────────────── */
    function c(a)  { return 'rgba(3,127,252,' + a + ')'; }
    function cW(a) { return 'rgba(180,220,255,' + a + ')'; }

    function initBeamsOn(header) {
        /* ── Canvas ─────────────────────────────────────── */
        var canvas = document.createElement('canvas');
        Object.assign(canvas.style, {
            position: 'absolute', top: '0', left: '0',
            width: '100%', height: '100%',
            zIndex: '1', pointerEvents: 'none', display: 'block',
        });

        header.style.position   = 'relative';
        header.style.overflow   = 'hidden';
        header.style.background = '#000';

        /* Text containers must sit above canvas; images go behind */
        var kids = header.children;
        for (var k = 0; k < kids.length; k++) {
            var kid = kids[k];
            if (kid === canvas) continue;
            kid.style.position = 'relative';
            kid.style.zIndex = (kid.tagName === 'IMG' || kid.tagName === 'PICTURE') ? '0' : '2';
        }
        var cont = header.querySelector('.container');
        if (cont) { cont.style.position = 'relative'; cont.style.zIndex = '2'; }

        header.insertBefore(canvas, header.firstChild);

        var ctx = canvas.getContext('2d');
        var W = 0, H = 0;
        var beams = [], sparks = [], rafId;

        /* ── Sizing ──────────────────────────────────────── */
        function resize() {
            var w = header.offsetWidth  || window.innerWidth;
            var h = header.offsetHeight || 280;
            if (w === W && h === H) return;
            W = canvas.width  = w;
            H = canvas.height = h;
        }

        /* ── Beams ───────────────────────────────────────── */
        function makeBeam(init) {
            var len = 100 + Math.random() * 200;
            return {
                x    : 80 + Math.random() * Math.max(W - 160, 200),
                w    : 0.3 + Math.random() * 0.4,
                len  : len,
                speed: 0.5 + Math.random() * 1.2,
                y    : init ? Math.random() * (H + len) - len : -len,
                hit  : false,
            };
        }

        function initBeams() {
            beams = [];
            for (var i = 0; i < 6; i++) beams.push(makeBeam(true));
        }

        /* ── Draw one beam (3 passes: wide glow / mid / core) */
        function drawBeam(b) {
            var top = b.y - b.len, bot = b.y;
            ctx.save();

            var g1 = ctx.createLinearGradient(0, top, 0, bot);
            g1.addColorStop(0,   c(0));
            g1.addColorStop(0.3, c(0.08));
            g1.addColorStop(1,   c(0.18));
            ctx.lineWidth = b.w * 20; ctx.strokeStyle = g1;
            ctx.beginPath(); ctx.moveTo(b.x, top); ctx.lineTo(b.x, bot); ctx.stroke();

            var g2 = ctx.createLinearGradient(0, top, 0, bot);
            g2.addColorStop(0,   c(0));
            g2.addColorStop(0.3, c(0.35));
            g2.addColorStop(1,   c(0.65));
            ctx.lineWidth = b.w * 5; ctx.strokeStyle = g2;
            ctx.beginPath(); ctx.moveTo(b.x, top); ctx.lineTo(b.x, bot); ctx.stroke();

            var g3 = ctx.createLinearGradient(0, top, 0, bot);
            g3.addColorStop(0,    c(0));
            g3.addColorStop(0.15, cW(0.4));
            g3.addColorStop(0.6,  cW(0.95));
            g3.addColorStop(1,    cW(1));
            ctx.lineWidth = b.w; ctx.strokeStyle = g3;
            ctx.beginPath(); ctx.moveTo(b.x, top); ctx.lineTo(b.x, bot); ctx.stroke();

            ctx.restore();
        }

        /* ── Sparks ──────────────────────────────────────── */
        function spawnSparks(x) {
            for (var k = 0, n = 3 + (Math.random() * 5 | 0); k < n; k++) {
                var ang = Math.PI + Math.random() * Math.PI;
                var spd = 0.4 + Math.random() * 2.5;
                sparks.push({ x:x, y:H, vx:Math.cos(ang)*spd, vy:Math.sin(ang)*spd - 1.2,
                    life:1, decay:0.022+Math.random()*0.028, r:0.5+Math.random()*1.3 });
            }
        }

        /* ── Main render loop ────────────────────────────── */
        function loop() {
            resize();

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, W, H);

            for (var i = 0; i < beams.length; i++) {
                var b = beams[i];
                b.y += b.speed;
                if (!b.hit && b.y >= H) { spawnSparks(b.x); b.hit = true; }
                if (b.y - b.len > H)    { beams[i] = makeBeam(false); }
                else                    { drawBeam(b); }
            }

            for (var j = sparks.length - 1; j >= 0; j--) {
                var s = sparks[j];
                s.x += s.vx; s.y += s.vy; s.vy += 0.07; s.life -= s.decay;
                if (s.life <= 0) { sparks.splice(j, 1); continue; }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = c(s.life * 0.85);
                ctx.fill();
            }

            rafId = requestAnimationFrame(loop);
        }

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) { cancelAnimationFrame(rafId); }
            else { rafId = requestAnimationFrame(loop); }
        });

        /* Start after first paint so offsetHeight is available */
        requestAnimationFrame(function () {
            resize();
            initBeams();
            rafId = requestAnimationFrame(loop);
        });
    }

    /* ── Init on all .page-header elements ───────────────── */
    var headers = document.querySelectorAll('.page-header');
    for (var i = 0; i < headers.length; i++) {
        initBeamsOn(headers[i]);
    }
}());
