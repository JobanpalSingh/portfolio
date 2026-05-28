import { useEffect, useRef } from 'react';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function buildParticles() {
      const area = w * h;
      const count = Math.min(88, Math.max(32, Math.floor(area / 20000)));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.5, 0.5),
        vy: rand(-0.38, 0.38),
        r: rand(0.45, 2.2),
        phase: rand(0, Math.PI * 2),
        phaseSpeed: reduced ? 0 : rand(0.014, 0.036),
        hue: rand(265, 285),
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
      if (reduced) drawFrame();
    }

    function wrap(p) {
      const m = 24;
      if (p.x < -m) p.x = w + m;
      if (p.x > w + m) p.x = -m;
      if (p.y < -m) p.y = h + m;
      if (p.y > h + m) p.y = -m;
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.phaseSpeed;
          wrap(p);
        }

        const twinkle = 0.42 + Math.sin(p.phase) * 0.38;
        const alpha = 0.12 + twinkle * 0.5;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `hsla(${p.hue}, 92%, 76%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${p.hue}, 80%, 58%, ${alpha * 0.35})`);
        g.addColorStop(1, `hsla(${p.hue}, 70%, 40%, 0)`);
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
      drawFrame();
      raf = requestAnimationFrame(tick);
    }

    resize();

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      reduced = mq.matches;
      buildParticles();
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduced) {
        drawFrame();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    mq.addEventListener('change', onMotion);

    if (!reduced) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
